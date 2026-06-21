import { json, error } from "@sveltejs/kit"
import { selectTable, insertIn } from "$lib/server/supabase"
import { getUser } from "$lib/server/auth/getUser"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const {
      clientName,
      clientPhone,
      clientAddress,
      items,
      total,
      status
    } = body

    console.log(clientAddress)

    // Get user from locals (set by auth middleware)
    const {user} = await getUser(cookies)
    if (!user) {
      return error(401, "Non authentifié")
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return error(400, "La commande doit contenir au moins un article")
    }

    // Create or get buyer
    let { data: buyers } = await selectTable("Buyers")
      .eq("phone", clientPhone)
      .single()

    let buyer = buyers
    if (!buyer) {
      const { data: newBuyer, error: buyerError } = await insertIn("Buyers", {
        name: clientName,
        phone: clientPhone
      }).select().single()


      if (buyerError) {
        console.error("Error creating buyer:", buyerError)
        return error(400, "Erreur lors de la création du client")
      }
      buyer = newBuyer
    }

    // Create order
    const { data: order, error: orderError } = await insertIn("Orders", ({
      seller_id: user.id,
      buyer_id: buyer.id,
      address: clientAddress || "",
      address_info: "",
      status: status || "En attente"
    })).select().single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return error(400, "Erreur lors de la création de la commande")
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price_at_the_time: item.price
    }))

    const { error: itemsError } = await insertIn("Order_Items", (orderItems))

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      return error(400, "Erreur lors de l'ajout des articles")
    }

    return json({
      success: true,
      orderId: order.id,
      message: "Commande créée avec succès"
    })
  } catch (err) {
    console.error("Error in POST /api/orders/add:", err)
    return error(500, err instanceof Error ? err.message : "Erreur serveur")
  }
}
