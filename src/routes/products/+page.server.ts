import { getArticles } from '$lib/server/articles';
import type { Article } from '$lib/types';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ url }) => {
	const {
		nameinclude = "",
		category = "",
		maxprice = ""
	} = Object.fromEntries(url.searchParams);

	const { data, error } : {
        data: Article[] | null | any,
        error: any
    } = await getArticles({
		nameinclude,
		category,
		maxprice
	});

	if (error) {
		console.error('Error fetching products:', error);
		return {
			products: [] as Article[],
			error: error.message
		};
	}

	return {
		products: (data || []) as Article[],
		error: null
	};
};
