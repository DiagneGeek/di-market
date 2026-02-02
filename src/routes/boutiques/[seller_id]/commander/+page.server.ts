import {selectTable, insertIn} from "$lib/server/supabase"
import type {Article } from "$lib/types"
import { redirect } from "@sveltejs/kit";
import type { Actions } from './$types';

const initForm = async (request: any,) => {
const form = await request.formData()
  return (name: string) : string => {
    return form.get(name) as string 
  }
}

export const load = async () => {
  await insertIn("Events", {
    type: "order_page_visit",
  })
}

export const actions = {
  request_order: async ({request, url, params, cookies}) => {
    const product_id = url.searchParams.get("productId")
    const {seller_id } = params 
    const form = await initForm(request)
    const customer_name = form("customer_name")
    const phone = parseInt(form("phone"))
    const bruteAddress = JSON.parse(form("address"))
    const address_info = form("address_info")
    const items = JSON.parse(form("items"))
    const totalPrice = parseInt(form("total"))
    const sellerName = form("seller_name")

    const status = "En attente"
    const address = `${bruteAddress.display_name}|${bruteAddress.address.country}|${bruteAddress.name}`

    const credentials = {
      customer_name,
      phone,
      address,
      address_info,
    }
    const checkingBuyer = await selectTable("Buyers").eq("phone", phone).single()
    let buyer = null
    if (checkingBuyer.data) {
      buyer = checkingBuyer.data
    } else {
      const auth_credential = Math.random().toString(36) + phone + Date.now().toString(36)

    const {data, error: buyerError} = await insertIn("Buyers", [{
      name: customer_name,
      phone,
      auth_credential
    }]).select().single()

    if (buyerError) {
      console.error("Error inserting buyer:", buyerError)
      return {
        order: "error",
        ...credentials
      }
    }

    cookies.set("buyer_auth", auth_credential, {path: "/"})
    buyer = data
  }

    const order = {
      address,
      address_info,
      status, 
      seller_id,
      buyer_id: buyer.id
    }
    console.log("order", order)
    const {data: orderData, error} = await insertIn("Orders", order).select().single()
    if (error) {
      console.error("Error inserting order:", error)
      return {
        order: "error",
        ...credentials 
      }
    }

    const id = orderData.id

    const {error: itemsError} = await insertIn("Order_Items", items.map((item: any) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      order_id: id
    })))
    if (itemsError) {
       console.error("Error inserting items:", itemsError)
       return {
        order: "error",
        customer_name,
        phone,
        address,
        address_info
       }
    }

    redirect(302, `/boutiques/${params.seller_id}/commander/succes?order_number=DI-${id}&seller_name=${sellerName}&total=${totalPrice}`)
    return {
      order: "confirmed",
      ...credentials
    }
  }
} satisfies Actions 