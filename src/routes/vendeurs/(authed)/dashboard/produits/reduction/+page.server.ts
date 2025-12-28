import { updateRow } from "$lib/server/supabase"
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const form = await request.formData()
    
        let {
           discount,
           discount_type,
           product_id,
           expiration_date
        } : {
            discount: string | number,
            discount_type: string,
            product_id: string,
            expiration_date: string
        } = Object.fromEntries(form)
        discount = parseFloat(discount as string)
        if(isNaN(discount) || discount <= 0) {
            return fail(400, {
                error: "Le montant de la reduction est invalide"
            })
        } else if (discount_type === "percentage" && discount > 100) {
            return fail(400, {
                error: "Le pourcentage ne peut pas être superieur à 100"
            })
        }

        await updateRow("Products", {
         where: ["id", product_id],
         value: {
            discount,
            discount_type,
            discount_end: new Date(expiration_date as string).toISOString()
         }
       })
       return {success: true}
    }
}