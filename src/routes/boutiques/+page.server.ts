import type { PageLoad } from './$types';
import {selectTable} from "$lib/server/supabase"

export const load: PageLoad = async ({ params }) => {
	const {data, error} = await selectTable("Sellers", "*")
  return {
    sellers: data,
    error
  }
};
