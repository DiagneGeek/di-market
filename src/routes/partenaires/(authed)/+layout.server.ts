import { error, redirect } from "@sveltejs/kit"
import { getPartner } from "$lib/server/auth/getUser"
import type { Partner } from "$lib/types"
import { selectTable } from "$lib/server/supabase"

export const load = async ({cookies, url}: {cookies: any, url: URL}) => {
  const {partner, error: userError}  = await getPartner(cookies)
  if (userError) {
    throw error(401, userError)
  }
  
  if (!partner) {
    redirect(307, "/partenaires/connexion")
  }

  delete partner.password
  delete partner.session_id

  const { partner_id } = partner
  if (!partner_id) {
    redirect(307, "/partenaires/connexion")
  }

  const {data: sellers, error: sellersError} = await selectTable("Sellers").eq("referred_by", partner_id)as any
  if (sellersError) {
    console.error("Error fetching referred sellers: ", sellersError)
  }
  const paidSellers = sellers?.filter((seller: any) => seller.plan === "PREMIUM" && seller.last_payment) || []
  const date = url.searchParams.get("date") || "thisweek"
  const newRefferals = sellers?.filter((seller: any) => {
    const createdAt = new Date(seller.created_at)
    const now = new Date()
    if (date === "aujourdhui") {
      console.log("Comparing dates ", createdAt.toDateString(), now.toDateString())
      return createdAt.toDateString() === now.toDateString()
    } else if (date === "cette_semaine") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(now.getDate() - 7)
      return createdAt >= oneWeekAgo && createdAt <= now
    } else if (date === "ce_mois") {
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
    } else if (date === "cette_année") {
      return createdAt.getFullYear() === now.getFullYear()
    }
    return true
  }) || []
  const newPaidRefferals = newRefferals.filter((seller: any) => seller.plan === "PREMIUM" && seller.last_payment) || []
  
  return {partner, referredSellers: sellers || [], paidSellers, newRefferals, newPaidRefferals}
}