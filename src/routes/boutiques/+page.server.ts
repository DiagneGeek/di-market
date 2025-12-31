
import {selectTable} from "$lib/server/supabase"

export const load = async ({ params }) => {
	let sellers = null
	let error
	try {
	const {data, error} = await selectTable("Sellers", "*, Products (title, id, description)")
      sellers = data
	} catch (err) {
		error = err
	}

 return {
    sellers,
    error
  }
};
