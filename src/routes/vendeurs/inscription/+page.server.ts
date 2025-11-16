import { getUser } from "$lib/server/getUser";
import { insertIn, selectTable } from "$lib/server/supabase";
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

      const can_add = 0
      const plan = null

      const exists = await checkIfExists(phone as string)
      if (exists) {
        const error : {error: string} = {error: "Ce numero de telephone existe deja !"}
        redirect(301, "/vendeurs/inscription/?error=Ce Mot De Passe Exist Deja")
      }
      const {data: user, error} = await insertIn('Sellers', [{
        name,
        phone,
        password,
        plan,
        can_add
      }]).select()
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