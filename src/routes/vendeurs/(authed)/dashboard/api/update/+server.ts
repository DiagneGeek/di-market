import {updateArticle} from "$lib/server/articles"
import { error, json } from "@sveltejs/kit"
import { uploadImage, getPublicUrl } from "$lib/server/supabase"
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({request}) => {
    const form = await request.formData()
    const detailsStr: any = form.get("details")

    // build data object from form entries (excluding file inputs)
    const data: any = Object.fromEntries(Array.from(form).filter(([k]) => k !== 'image' && k !== 'details'))

    // Parse details if provided
    if (detailsStr) {
      data.details = JSON.parse(detailsStr)
    }
    console.log("Received data for update:", data)
    // handle image upload if present (use shared helpers to support server env)
    const image = form.get('image') as File | null
    if (image && (image as any).size && data.id) {
        const bucket = 'product-images'
        const ext = (image as any).name?.split('.').pop() || 'jpg'
        const imageName = `articles/${data.id}-${Date.now()}.${ext}`

        const { data: uploadData, error: uploadError } = await uploadImage(bucket, imageName, image)

        if (uploadError) {
            throw error(500, "Erreur lors de l'envoi de l'image")
        }

        const { data: { publicUrl } } = getPublicUrl(bucket, imageName)
        data.image = publicUrl
    }

    const updating = await updateArticle(data)

    if (updating.error) {
        throw error(400, "Nous n'avons pas pu modifier le produit !")
    }

    return json({success: true})
}
