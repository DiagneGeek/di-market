
import {addArticle} from "$lib/server/articles"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({request}) => {
        const data = await request.json() 

        const slug = data.title?.toLowerCase()
                .replace(/\s*/g, "-") + Date.now()

        const newArticle = {
            ...data,
            slug
        }

        const adding = await addArticle(newArticle)

        if(!adding.success) {
           throw new Error("Erreur lors de l'ajout d'un produit !")
        }
        return json({success: true})
}