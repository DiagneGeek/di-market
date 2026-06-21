import type { Cookies } from "@sveltejs/kit"
import { selectTable, updateRow } from "../supabase"
import type { Buyer, User, Partner } from "../../types"

export const getUser = async (cookies: Cookies) => {
  const sessionToken = cookies.get("session_id")

  // If no session, return null
  if (!sessionToken) {
    return {user: null, error: null}
  }

  // Get user by session ID - user can exist with just a phone number
  // No password required yet (they'll set it in /commencer/setup)
  const {data: user, error } : {
    data: User | null,
    error: any
  } = await selectTable("Sellers", "*")
    .eq("id", sessionToken)
    .single()

  return {user, error}
}

export const isPremium = async (user: User) => {
   const now = new Date()
   const accessEndsAt = new Date(user.access_ends_at)
   const hasAccess = accessEndsAt > now

   if (hasAccess === false) {
   await updateRow("Sellers", {
    where: ["id", user.id],
    value: {
      plan: "FREE"
    }
   })
  }
  
  return hasAccess
}


export const getBuyer = async (cookies: Cookies) => {
  const sessionCookie = cookies.get("buyer_auth")

  if (!sessionCookie) {
    return {buyer: null, error: null}
  }

  const {data: buyer, error } : {
    data: Buyer | null,
    error: any
  } = await selectTable("Buyers", "*")
    .eq("auth_credential", sessionCookie)
    .single()


  return {buyer, error}
}

export const getPartner = async (cookies: Cookies) => {
  const sessionCookie = cookies.get("partner_session")

  if (!sessionCookie) {
    return {partner: null, error: null}
  }

  const {data: partner, error } : {
    data: Partner | null,
    error: any
  } = await selectTable("partners", "*")
    .eq("session_id", sessionCookie)
    .single()


  return {partner, error}
}
