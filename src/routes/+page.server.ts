import { getArticles } from '$lib/server/articles';
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({url}: {url: any}) => {
	const {
		nameinclude="",
		category="",
		maxprice=""
	} = Object.fromEntries(url.searchParams)
	return await getArticles({
		nameinclude,
		category,
		maxprice
	})
};
