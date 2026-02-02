import type { Cookies } from "@sveltejs/kit"
import { selectTable, updateRow } from "./supabase"
import type { Buyer, User } from "../types"

export const getUser = async (cookies: Cookies) => {
  const sessionToken = cookies.get("session_id")

  if (!sessionToken) {
    return {user: null, error: null}
  }

  const {data: user, error } : {
    data: User | null,
    error: any
  } = await selectTable("Sellers", "*")
    .eq("id", sessionToken)
    .single()


  return {user, error}
}

export const isPremium = async (user: User) => {
  if (user.plan === "PREMIUM" && 
     user.trial_ends_at === null) {
      return true
  } else if (user.plan === "FREE") {
    return false
  }
  const now = new Date()
  const trialEndsAt = new Date(user.trial_ends_at)
  const output = trialEndsAt > now
  if (output === false) {
   await updateRow("Sellers", {
    where: ["id", user.id],
    value: {
      plan: "FREE"
    }
   })
  }
  return output
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