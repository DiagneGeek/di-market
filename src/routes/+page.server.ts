import { getArticles } from '$lib/server/articles';
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({url}) => {
	const {
		nameinclude="",
		category="",
		price=""
	} = Object.fromEntries(url.searchParams)
	return await getArticles()
};