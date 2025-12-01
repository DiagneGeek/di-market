import {selectTable } from "$lib/server/supabase"
import type { PageLoad } from './$types'


export const load: PageLoad = async ({params}) => {
    const {slug} = params

    const {data, error} = await selectTable("Products", "*, Sellers (name, phone)")
         .eq("slug", slug)
         .single()

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

    return {product: data}
}