import type { PageLoad } from './$types';
import {selectTable} from "$lib/server/supabase"

export const load: PageLoad = async ({ params }) => {
	let sellers = null
	let error
	try {
	const {data, error} = await selectTable("Sellers", "*")
    sellers = data
	} catch (err) {
		error = err
	}
 return {
    sellers,
    error
  }
};
