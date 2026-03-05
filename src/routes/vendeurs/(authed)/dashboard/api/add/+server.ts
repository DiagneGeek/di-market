
import {addArticle} from "$lib/server/articles"
import type {Article, User} from "$lib/types"
import {uploadImage, getPublicUrl} from "$lib/server/supabase"
import {isPremium} from "$lib/server/getUser"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

function slugify(title: string) {
    return title
        .normalize("NFD")                   // separate accents
        .replace(/[\u0300-\u036f]/g, "")    // remove accents
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")       // remove special chars
        .trim()
        .replace(/\s+/g, "-")               // spaces → -
        .replace(/-+/g, "-");               // avoid multiple -
   }

function generateImageName(title: string) {
    const slug = slugify(title);
    const unique = crypto.randomUUID(); // or your product ID
    return `${slug}-${unique}`;
}

export const POST: RequestHandler = async ({request}) => {
        const form = await request.formData()
        const image: any = form.get("image")

        if (!image) {
          error(400, "image innexistant")
        }

        let {user, products, ...data} : {
          user: User | string,
          data: Article,
          products: Article[] | string
        } = Object.fromEntries(form)
         user = JSON.parse(user as string)
         products = JSON.parse(products as string) as Article[]
        
        data.seller_id = user.id

        if (typeof user === "string" || data === null) error(403, "Erreur interne")

        const premium = await isPremium(user)

        if (!premium && 
           products.length >= 15
           ) {
            error(403, "Limites atteintes pour les vendeurs non premium")
           }

        const slug = slugify(data.title) + Date.now()

        const imageName = generateImageName(data.title)

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
