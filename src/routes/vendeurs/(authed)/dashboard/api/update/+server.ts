import {updateArticle} from "$lib/server/articles"
import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({request}) => {
    const form = await request.formData()

    const data : {
        title: string,
        description: string,
        price: string,
        id: string 
    } | any = Object.fromEntries(form)

    const updating = await updateArticle(data)

    if (!updating.error) {
        error(400, "Nous n'avons pas pu modifier le produit !")
    }

    return json({success: true})
}
