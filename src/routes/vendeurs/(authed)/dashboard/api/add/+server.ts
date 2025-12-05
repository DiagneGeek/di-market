
import {addArticle} from "$lib/server/articles"
import {uploadImage, getPublicUrl} from "$lib/server/supabase"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({request}) => {
        const data = await request.json() 

        const slug = data.title?.toLowerCase()
                .replace(/\s+/g, "-") + Date.now()

        const imageName = `${data.seller_id}-${slug}-${file.name}`

        const {data, error} = await uploadImage("product-images", imageName, data.image)
        const {data: {publicUrl}} = getPublicUrl("product-images", imageName)

        const newArticle = {
            ...data,
            image: publicUrl,
            slug
        }

        

        const adding = await addArticle(newArticle)

        if(!adding.success) {
           throw new Error("Erreur lors de l'ajout d'un produit !")
        }
        return json({success: true})
}
