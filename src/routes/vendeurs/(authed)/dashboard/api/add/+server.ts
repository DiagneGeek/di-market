
import {addArticle} from "$lib/server/articles"
import type {Product, User} from "$lib/types"
import {uploadImage, getPublicUrl} from "$lib/server/supabase"
import {isPremium} from "$lib/server/auth/getUser"
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
        const detailsStr: any = form.get("details")

        const formEntries = Object.fromEntries(form)
        const user = JSON.parse(formEntries.user as string) as User
        const products = JSON.parse(formEntries.products as string) as Product[]
        
        const {user: _, products: __, ...rawData} = formEntries
        
        let data: any = rawData
        
        // Parse details if provided
        if (detailsStr) {
          data.details = JSON.parse(detailsStr)
        }
        
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

        let publicUrl = ""
        if (image && typeof image === 'object' && (image as any).size) {
            const {data: imageUploadData, error: errWhenUpload} = await uploadImage("product-images", imageName, image)
            if (errWhenUpload) {
              console.error(errWhenUpload)
              error(400, JSON.stringify(errWhenUpload))
            }
            const {data: {publicUrl: pu}} = getPublicUrl("product-images", imageName)
            publicUrl = pu
        }

        const newArticle: Product = {
            ...data,
            image: publicUrl || "",
            slug
        }

        const adding = await addArticle(newArticle)

        if(!adding.success) {
           error(400, adding.error)
        }
        return json({success: true})
}
