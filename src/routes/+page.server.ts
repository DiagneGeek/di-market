import { getArticles } from '$lib/server/articles';

export const load = async () => {
	return await getArticles()
};