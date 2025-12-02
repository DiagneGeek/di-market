import type { PageLoad } from './$types';
import {selectTable} from "$lib/server/supabase"

export const load: PageLoad = async ({ params }) => {
	const {seller_id} = params
  const {data, error} = await selectTable("Products")
  const {data: seller} = await selectTable("Sellers")
         .eq("id", seller_id)
        .single()
  return {products: data, seller}
};
