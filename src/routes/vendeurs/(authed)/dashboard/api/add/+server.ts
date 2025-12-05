
import {addArticle} from "$lib/server/articles"
import type {Article} from "$lib/types"
import {uploadImage, getPublicUrl} from "$lib/server/supabase"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({request}) => {
        const form = await request.formData()
        const image: any = form.get("image")
        
        if (!image) {
          error(400, "image innexistant")
        }

        const data: Article = Object.fromEntries(form)

        const slug = data.title?.toLowerCase()
                .replace(/\s+/g, "-") + Date.now()

        const imageName = `${data.seller_id}-${slug}-${image.name}`

        const {data: imageUploadData, error: errWhenUpload} = await uploadImage("product-images", imageName, image)
        if (errWhenUpload) {
          console.error(image.type)
          error(400, JSON.stringify(errWhenUpload))
        }
        const {data: {publicUrl}} = getPublicUrl("product-images", imageName)

        const newArticle: Article = {
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
