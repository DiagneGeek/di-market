import { getUser } from "$lib/server/auth/getUser"
import {selectTable, insertIn, updateRow } from "$lib/server/supabase"
import type { Product} from "$lib/types"
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


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
    const product: Product = data

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
    add_to_cart_event: async ({request}) => {
        const form = await request.formData()
        const product = JSON.parse(form.get("product") as string) as Product 

        await insertIn("Events", {
            type: "add_to_cart",
            product_id: product.id,
            seller_id: product.seller_id
        })
        return {success: true}
    }
} satisfies Actions