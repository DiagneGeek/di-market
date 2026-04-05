import { getUser } from "$lib/server/getUser";
import { updateRow } from "$lib/server/supabase";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { name, password } = await request.json();

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
