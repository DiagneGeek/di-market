import { getUser } from "$lib/server/getUser"
import { selectTable } from "$lib/server/supabase"
import { error, redirect } from "@sveltejs/kit"
import type { Article } from "../../../types/index.js"
import type { PostgrestError } from "@supabase/supabase-js"

const throwError = error

interface Data {
  data: Article[] | null,
  error: PostgrestError | null
}

export const load = async ({cookies}) => {
  const {user, error} = await getUser(cookies)
  if (error) {
    throwError(500, "Une erreur c'est produite lors de l'access a votre tableau de bord")
  }

  if (!user) {
    redirect(307, "/vendeurs")
  }


  const {data: products, error: pErrors} : {
    data: Article[] | any
    error: PostgrestError | null
  } = await selectTable("Products", '*')
      .eq("seller_id", user.id)

   if (pErrors || products === null) {
    throwError(500, "Une erreur c'est produite lors du chargement des produits")
  }

  return {user, products}
}