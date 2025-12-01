import type { Actions } from './$types';
import {addArticle} from "$lib/server/articles"

export const actions = {
	addproduct: async ({request}) => {
        const data = await request.formData()
        const title = data.get("title") as string
        const description = data.get("description")
        const category = data.get("category")
        const price = data.get("price")
        const image = data.get('image')
        const seller_id = data.get("seller")

        console.log(image, "_____")

        const slug = title?.toLowerCase()
                .replace(/\s*/g, "-") + Date.now()

        const newArticle = {
            title,
            description,
            category,
            price,
            image,
            seller_id,
            slug
        }

        const adding = await addArticle(newArticle)

        if(!adding.success) {
           throw new Error("Erreur lors de l'ajout d'un produit !")
        }
        return {success: true}
    }
} satisfies Actions;