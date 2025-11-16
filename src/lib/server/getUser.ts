import type { Cookies } from "@sveltejs/kit"
import { selectTable } from "./supabase"
import type { User } from "../../types"

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

  if (error) {
    return {user, error}
  }
  return {user, error: null}
}