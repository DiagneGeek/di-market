import { getUser, isPremium as _isPremium} from "$lib/server/getUser"
import { selectTable } from "$lib/server/supabase"
import { error, redirect } from "@sveltejs/kit"
import type { Article, Event } from "$lib/types/index.js"
import type { PostgrestError } from "@supabase/supabase-js"

const throwError = error

interface Data {
  data: Article[] | null,
  error: PostgrestError | null
}

export const load = async ({cookies}: {cookies: any}) => {
  const {user, error} = await getUser(cookies)

  if (error || user === null) {
    return throwError(500, "Une erreur c'est produite lors de l'access a votre tableau de bord")
  }
  const isPremium = await _isPremium(user)

  if (!user) {
    redirect(307, "/vendeurs/connection")
  }

  const {data: events} : {
    data: Event[] | any
  } = await selectTable("Events").eq("seller_id", user.id)


  const {data: products, error: pErrors} : {
    data: Article[] | any
    error: PostgrestError | null
  } = await selectTable("Products", '*')
      .eq("seller_id", user.id)

   if (pErrors || products === null) {
    return throwError(500, "Une erreur c'est produite lors du chargement des produits")
  }

  const {data: orders, error: ordersError} = await selectTable("Orders", "*, Order_Items (*), Buyers (name, phone)")
      .eq("seller_id", user.id)

  if (ordersError) {
    return throwError(500, "Une erreur c'est produite lors du chargement des commandes")
  }
  /*const {data: orderItems, error: orderItemsError} = await selectTable("Order_Items")
      .eq("seller_id", user.id)

  if (orderItemsError) {
    return throwError(500, "Une erreur c'est produite lors du chargement des items de commande")
  }
*/
  return {user, products, isPremium, events, orders}
}