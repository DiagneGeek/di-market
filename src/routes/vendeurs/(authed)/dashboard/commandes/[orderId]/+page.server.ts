import { selectTable } from "$lib/server/supabase"
import { error } from "@sveltejs/kit"
import type { Actions } from './$types';


export const load = async ({ params, parent }: { params: any; parent: any }) => {
  const parentData = await parent()
  const { orderId } = params

  // Find the order from parent data (handle both string and number IDs)
  let order = parentData.orders?.find((o: any) => String(o.id) === orderId)
  
  if (!order) {
    console.error("Order not found in parent data. OrderId:", orderId)
    throw error(404, "Commande non trouvée")
  }

  // Enrich Order_Items with product details
  const orderItemsWithProducts = await Promise.all(
    (order.Order_Items || []).map(async (item: any) => {
      try {
        const { data: product } = await selectTable("Products")
          .eq("id", item.product_id)
          .single()

        return {
          ...item,
          product
        }
      } catch (err) {
        console.error("Error fetching product:", item.product_id, err)
        return item
      }
    })
  )

  return {
    order: {
      ...order,
      Order_Items: orderItemsWithProducts
    }
  }
}


export const actions = {

} satisfies Actions