import { getUser } from "$lib/server/auth/getUser";
import { insertIn, selectTable } from "$lib/server/supabase";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { User } from "$lib/types"


const throwError = error

export const load = async ({cookies, url}: {cookies: any, url: any}) => {
  const {user, error} : {
    error: any,
    user: User | null
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



const checkIfExists = async (phone: string, password: string) : Promise<User | null> => {
    const { data, error } : {
        data: User | null,
        error: any
    } = await selectTable("Sellers")
  .eq('phone', phone)
  .eq("password", password)
  .single()
  if (data) {
    return data
  }
  return null
}


export const actions = {
    default: async ({cookies, request}) => {
      const data = await request.formData()
      const phone = data.get("phone") as string
      const password = data.get("password") as string


      const user = await checkIfExists(phone as string, password as string)

      if (!user) {
        redirect(301, "/vendeurs/connection/?error=Numero de telephone ou mot de passe incorrect")
      }

      console.log(user)
      
      if (user.id) {
        cookies.set("session_id", user.id.toString(), {path: "/"})
         redirect(301, `/vendeurs/dashboard?identified=true&collection=${user.name}&phone=${user.phone}`)
      }
    }
} satisfies Actions;
