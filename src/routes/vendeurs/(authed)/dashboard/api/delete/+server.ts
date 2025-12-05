
import type { RequestHandler } from './$types'


export const POST: RequestHandler = async ({request}) => {
    const form = await request.formData()
    const id = form.productId
}
