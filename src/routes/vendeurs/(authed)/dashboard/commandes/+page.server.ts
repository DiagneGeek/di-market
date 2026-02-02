import { selectTable, updateRow } from "$lib/server/supabase"
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
  }
} satisfies Actions
