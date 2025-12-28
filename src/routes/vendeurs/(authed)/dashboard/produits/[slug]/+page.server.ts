import { selectTable } from "$lib/server/supabase"
import { error } from "@sveltejs/kit"
import type { Article, Event } from "$lib/types/index.js"

export const load = async ({ params, parent }) => {
  const { slug } = params
  const parentData = await parent()
  const { user, products, isPremium, events } = parentData

  // Find the product by slug
  const product = products.find((p: Article) => p.slug === slug)
  if (!product) {
    throw error(404, "Produit non trouvé")
  }

  // Filter events for this product
  const productEvents = events.filter((e: Event) => e.product_id === product.id)

  return {
    product,
    productEvents,
    isPremium
  }
}