import type { PageLoad } from './$types';
import {selectTable} from "$lib/server/supabase"

export const load: PageLoad = async ({ params }) => {
	const {seller_id} = params
	const {data: seller, error: errorWhenGettingSeller} = await selectTable("Sellers")
         .eq("id", seller_id)
        .single()
	if (!seller) {
		throw new Error("Cette boutique n'existe pas !")
	}
  const {data, error} = await selectTable("Products")
	      .eq("seller_id", seller_id)
  
  return {products: data, seller}
};
