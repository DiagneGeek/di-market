import { selectTable, updateRow, removeRow, insertIn } from "$lib/server/supabase"
import { error } from "@sveltejs/kit"
import type { Actions } from './$types'

export const load = async ({ parent }: { parent: any }) => {
  const parentData = await parent()
  const { orders, user, isPremium } = parentData

  // Fetch buyer data for all orders
  const ordersWithBuyers = await Promise.all(
    (orders || []).map(async (order: any) => {
      const { data: buyer } = await selectTable("Buyers")
        .eq("id", order.buyer_id)
        .single()

      return {
        ...order,
        buyer,
        user, 
        isPremium
      }
    })
  )

  return {
    orders: ordersWithBuyers.sort(
      (a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }
}

export const actions = {
  updateStatus: async ({ request }) => {
    const formData = await request.formData()
    const orderId = formData.get("orderId") as string
    const status = formData.get("status") as string

    if (!orderId || !status) {
      return { success: false, error: "Missing required fields" }
    }

    try {
      await updateRow("Orders", {
        where: ["id", orderId],
        value: { status }
      })

      return { success: true }
    } catch (err) {
      console.error("Error updating order status:", err)
      return { success: false, error: "Failed to update order status" }
    }
  },

  updatePayment: async ({ request }) => {
    const formData = await request.formData()
    const orderId = formData.get("orderId") as string
    const amountPaid = formData.get("amountPaid") as string

    if (!orderId || amountPaid === null || amountPaid === undefined) {
      return { success: false, error: "Missing required fields" }
    }

    try {
      const amount = parseInt(amountPaid)
      await updateRow("Orders", {
        where: ["id", orderId],
        value: { 
          amount_paid: amount,
          paid: amount > 0
        }
      })

      return { success: true }
    } catch (err) {
      console.error("Error updating order payment:", err)
      return { success: false, error: "Failed to update payment" }
    }
  },

  updateOrderItem: async ({ request }) => {
    const formData = await request.formData()
    const itemId = formData.get("itemId") as string
    const quantity = formData.get("quantity") as string
    const price = formData.get("price") as string

    if (!itemId || !quantity || !price) {
      return { success: false, error: "Missing required fields" }
    }

    try {
      const qty = parseInt(quantity)
      const pricePerUnit = parseInt(price)
      const totalPrice = qty * pricePerUnit

      await updateRow("Order_Items", {
        where: ["id", itemId],
        value: { 
          quantity: qty,
          price_at_the_time: totalPrice
        }
      })

      return { success: true }
    } catch (err) {
      console.error("Error updating order item:", err)
      return { success: false, error: "Failed to update order item" }
    }
  },

  deleteOrderItem: async ({ request }) => {
    const formData = await request.formData()
    const itemId = formData.get("itemId") as string

    if (!itemId) {
      return { success: false, error: "Missing item ID" }
    }

    try {
      await removeRow("Order_Items", ["id", itemId])
      return { success: true }
    } catch (err) {
      console.error("Error deleting order item:", err)
      return { success: false, error: "Failed to delete order item" }
    }
  },

  addOrderItem: async ({ request }) => {
    const formData = await request.formData()
    const orderId = formData.get("orderId") as string
    const productId = formData.get("product_id") as string
    const quantity = formData.get("quantity") as string
    const price = formData.get("price") as string

    if (!orderId || !productId || !quantity || !price) {
      return { success: false, error: "Missing required fields" }
    }

    try {
      const qty = parseInt(quantity)
      const pricePerUnit = parseInt(price)
      const totalPrice = qty * pricePerUnit

      await insertIn("Order_Items", {
        order_id: orderId,
        product_id: productId,
        quantity: qty,
        price_at_the_time: totalPrice
      })

      return { success: true }
    } catch (err) {
      console.error("Error adding order item:", err)
      return { success: false, error: "Failed to add order item" }
    }
  }
} satisfies Actions
