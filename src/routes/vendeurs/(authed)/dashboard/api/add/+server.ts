
import {addArticle} from "$lib/server/articles"
import {uploadImage, getPublicUrl} from "$lib/server/supabase"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({request}) => {
        const data = await request.json() 

        const slug = data.title?.toLowerCase()
                .replace(/\s+/g, "-") + Date.now()

        const imageName = `${data.seller_id}-${slug}-${file.name}`

        const {data: imageUploadData, error: errWhenUpload} = await uploadImage("product-images", imageName, data.image)
        if (errWhenUpload) {
          error(400, "Nous n'avons pas pu ajouter votre image")
        }
        const {data: {publicUrl}} = getPublicUrl("product-images", imageName)

        const newArticle = {
            ...data,
            image: publicUrl,
            slug
        }

        

        const adding = await addArticle(newArticle)

        if(!adding.success) {
           error(400, adding.error)
        }
        return json({success: true})
}
