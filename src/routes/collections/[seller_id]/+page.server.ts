
import {selectTable} from "$lib/server/supabase"
import search from "$lib/composables/search.js"

interface Product {
  title: string
  description: string
  price: string
  category: string
  created_at?: any
  [key: string]: any
}

interface Seller {
  id: string
  name: string
  [key: string]: any
}

export const load = async ({ params, url }: {params: any, url: URL}) => {
	const {seller_id} = params
	const {data: seller, error: errorWhenGettingSeller} = await selectTable("Sellers")
         .eq("id", seller_id)
        .single() as {data: Seller | null, error?: any}
        
	if (!seller) {
		throw new Error("Cette collection n'existe pas !")
	}
  const {data, error} = await selectTable("Products")
	      .eq("seller_id", seller_id) as {data: Product[] | null, error?: any}
  
  // Get filter params from URL
  const recherche = url.searchParams.get('recherche') || ''
  const category = url.searchParams.get('category') || null
  const minPrice = url.searchParams.get('minPrice') ? parseFloat(url.searchParams.get('minPrice')!) : null
  const maxPrice = url.searchParams.get('maxPrice') ? parseFloat(url.searchParams.get('maxPrice')!) : null
  const sortBy = url.searchParams.get('sortBy') || ''
  
  // Filter products server-side
  let filteredProducts: Product[] = data || []
  
  if (recherche) {
    filteredProducts = search({
      query: recherche,
      list: filteredProducts,
      targets: [
        { key: 'title', weight: 0.9 },
        { key: 'description', weight: 0.4 }
      ],
     // maxScore: 0.3,
      strict: false
    }) as Product[]
  }
  
  if (category && category !== 'Tout') {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }
  
  if (minPrice !== null) {
    filteredProducts = filteredProducts.filter(p => parseFloat(p.price as string) >= minPrice)
  }
  
  if (maxPrice !== null) {
    filteredProducts = filteredProducts.filter(p => parseFloat(p.price as string) <= maxPrice)
  }
  
  // Sort products
  if (sortBy === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else if (sortBy === 'oldest') {
    filteredProducts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  } else if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => parseFloat(a.price as string) - parseFloat(b.price as string))
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => parseFloat(b.price as string) - parseFloat(a.price as string))
  }
  
  // Get unique categories for filter dropdown
  const allCategories = ['Tout', ...new Set((data || []).map(p => p.category as string).filter(Boolean))]
  
  return {
    products: filteredProducts,
    seller,
    allCategories,
    initialFilters: {
      recherche,
      category,
      minPrice,
      maxPrice,
      sortBy
    }
  }
};
