import { getUser } from "$lib/server/getUser";
import { insertIn, selectTable } from "$lib/server/supabase";
import type { User } from "$lib/types/index.js";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";


const throwError = error

export const load = async ({cookies} : {cookies: any}) => {
  const {user, error} : {
    error: any,
    user: any
  } = await getUser(cookies)
  if (error) {
    return {user: null}
  }

  if (user) {
    redirect(307, "/vendeurs/dashboard")
  }

  return {success: true}
}


interface FormData {
    name: string,
    phone: string,
    password: string
}

const checkIfExists = async (phone: string) => {
    const { data, error } = await selectTable("Sellers")
  .eq('phone', phone)
  if (data && data.length > 0) {
    return true
  }
  return false
}


export const actions = {
    default: async ({cookies, request}) => {
      const data = await request.formData()
      const name = data.get("name") as string
      const phone = data.get("phone") as string
      const password = data.get("password") as string

      const plan = "PREMIUM"
      const TRIAL_DAYS = 14
      // trial ends value is the current data plus 14 days
      const trial_ends_at = new Date(
            Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000
        ).toISOString()

      const row: User = {
         name,
        phone,
        password,
        plan,
        trial_ends_at
      }
      if (name.trim().length  < 3) {
        return fail(400, {error: "Le nom de votre boutiques doit contenir au moins 3 lettres", name, phone, password})
      }
      if (password.trim().length  < 6) {
        return fail(400, {error: "Le mot de passe doit contenir au moins 6 charactères",  name, phone, password})
      }
      const exists = await checkIfExists(phone as string)
      if (exists) {
        return fail(400, {error: "Ce numero Existe Deja"})
      }
      const {data: user, error} = await insertIn('Sellers', [row]).select()
      if (error) {
        return fail(400, {error: error.message, ...row})
      }
      cookies.set("session_id", user[0].id.toString(), {path: "/"})
      if(!error) {
        return redirect(301, "/vendeurs/dashboard")
      }
      return {error, ...row}
    }
} satisfies Actions;