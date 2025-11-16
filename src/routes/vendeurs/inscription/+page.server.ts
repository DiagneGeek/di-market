import { getUser } from "$lib/server/getUser";
import { insertIn, selectTable } from "$lib/server/supabase";
import type { User } from "$lib/types/index.js";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";


const throwError = error

export const load = async ({cookies, url}) => {
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

  const submitError = url.searchParams.get("error") || "null"

  return {submitError}
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

      const credits = 15000
      const plan = "premium"

      const row: User = {
         name,
        phone,
        password,
        plan,
        credits
      }
      if (name.trim().length  < 3) {
        redirect(301, "/vendeurs/inscription/?error=Le nom de votre boutiques doit contenir au moins 3 lettres")
      }
      if (password.trim().length  < 6) {
        redirect(301, "/vendeurs/inscription/?error=Le mot de passe doit contenir au moins 6 charactères")
      }
      if (phone.trim().length  !== 9) {
        redirect(301, "/vendeurs/inscription/?error=Ce numero n'est pas valide")
      }
      const exists = await checkIfExists(phone as string)
      if (exists) {
        redirect(301, "/vendeurs/inscription/?error=Ce numero Existe Deja")
      }
      const {data: user, error} = await insertIn('Sellers', [row]).select()
      if (!user) {
        const error : {error: string} = {error: "user not found"}
        return fail(400, error)
      }
      cookies.set("session_id", user[0].id.toString(), {path: "/"})
      if(!error) {
        return redirect(301, "/vendeurs/dashboard")
      }
      return {error}
    }
} satisfies Actions;