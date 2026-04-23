import { getUser } from "$lib/server/auth/getUser";
import { updateRow, insertIn } from "$lib/server/supabase";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { name, password, products } = await request.json();

    // Get current user from session
    const { user, error: userError } = await getUser(cookies);

    if (!user) {
      return json(
        { error: "Non autorisé - Veuillez vous enregistrer d'abord" },
        { status: 401 }
      );
    }

    // Validate inputs
    if (!name || name.trim().length < 3) {
      return json(
        { error: "Le nom doit contenir au moins 3 caractères" },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    // Update user's name and password
    const { data: updated, error } = await updateRow("Sellers", {
      where: ["id", user.id],
      value: {
        name: name.trim(),
        password
      }
    });
    const {data: fakeOrder } = await insertIn("Orders", [{
     address: "",
     address_info: "",
     status: "En attente",
     seller_id: user.id,
     buyer_id: 10
    }]).select().single()
    await insertIn("Order_Items", [{
      product_id: products[0].id,
      price_at_the_time: products[0].price,
      order_id: fakeOrder.id,
      quantity: 2
    }, {
      product_id: products[2].id,
      price_at_the_time: products[2].price,
      order_id: fakeOrder.id,
      quantity: 1
    }])


    if (error) {
      console.error("Update error:", error);
      return json(
        { error: "Erreur lors de la sauvegarde" },
        { status: 500 }
      );
    }

    return json({ 
      success: true, 
      user: updated[0] 
    });
  } catch (error) {
    console.error("Setup error:", error);
    return json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
};
