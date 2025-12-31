import { getUser } from "$lib/server/getUser"
import {selectTable, insertIn, updateRow } from "$lib/server/supabase"
import type { Article} from "$lib/types"
import { redirect } from '@sveltejs/kit';


export const load = async ({params, url, cookies} : {params: any, url: any, cookies: any}) => {
    const {slug} = params

    const {data, error} : {
        data: any,
        error: any
    } = await selectTable("Products", "*, Sellers (name, phone, plan, id)")
         .eq("slug", slug)
         .single()

    const {user, error: userError} = await getUser(cookies)

    if(!user || user.id !== data.seller_id) {
      await insertIn("Events", {
        type: "product_view",
        product_id: data.id,
        seller_id: data.seller_id 
      })
    }

    if(error) {
        return {
            status: 500,
            error
        }
    } else if (!data) {
        return {
            status: 404,
            error:  "Ce produit n'existe pas !"
        }
    }
    const product: Article = data

    if (product.discount_end) {
        const now = new Date()
        const discount_end = new Date(product.discount_end)
        if (now > discount_end) {
            product.discount = null
            product.discount_end = null
            await updateRow("Products", {
                where: ["id", product.id],
                value: {
                    discount: null,
                    discount_end: null,
                    discount_type: null
                }
            })
        }
    }

    return {product}
}

export const actions = {
    add_wsapp_open: async ({request}) => {
        const form = await request.formData()
        const product = JSON.parse(form.get("product") as string) as Article & {Sellers: {name: string, phone: string}}

        await insertIn("Events", {
            type: "wsapp_open",
            product_id: product.id,
            seller_id: product.seller_id
        })
        redirect(303, `https://wa.me/${product.Sellers?.phone}?text=${encodeURIComponent(`Salut ${product.Sellers?.name}, je suis interessé par votre produit sur DiMarket '${product.title}'. On peut en discuter ?`)}`)
        return {success: true}
    }
}