import { selectTable } from "$lib/server/supabase"
import { error } from "@sveltejs/kit"
import type { Product, Event } from "$lib/types/index.js"

export const load = async ({ params, parent }: { params: any, parent: any }) => {
  const { slug } = params
  const parentData = await parent()
  const { products, isPremium, events, orders } = parentData

  // Find the product by slug
  const product = products.find((p: Product) => p.slug === slug)
  if (!product) {
    throw error(404, "Produit non trouvé")
  }

  const productOrders = orders.filter((order: any) => order.Order_Items.some((item: any) => item.product_id === product.id))
  console.log("Product Orders:", productOrders)
  // Filter events for this product
  const productEvents = events.filter((e: Event) => e.product_id === product.id)

  return {
    product,
    productEvents,
    productOrders,
    isPremium
  }
}