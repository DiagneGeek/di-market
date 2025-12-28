import type { RequestHandler } from './$types'
import {removeFile, removeRow, selectTable} from "$lib/server/supabase"
import { error, json, redirect } from "@sveltejs/kit"


export const DELETE: RequestHandler = async ({request}) => {
    const form = await request.formData()
    const id = form.get("productId") as string

    const {data: product} : {
        data: any
    } = await selectTable("Products", "*")
          .eq("id", id).single()

    if(!product) {
        error(400, "Probleme Interne")
    }
    
     await removeRow("Events", ["product_id", id])
     const {error: err} = await removeRow("Products", ["id", id])
    
 
    const {data: file, error: errWhenDelete} = await removeFile(
        "product-images",
        product.image.slice(product.image.lastIndexOf("/")+1)
    )
    return json({success: true})
}
