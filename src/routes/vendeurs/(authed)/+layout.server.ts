import { getUser, isPremium as _isPremium} from "$lib/server/auth/getUser"
import { selectTable } from "$lib/server/supabase"
import { isSetupComplete } from "$lib/server/setupCheck"
import { error, redirect } from "@sveltejs/kit"
import type { Article, Event } from "$lib/types/index.js"
import type { PostgrestError } from "@supabase/supabase-js"

const throwError = error

interface Data {
  data: Article[] | null,
  error: PostgrestError | null
}

export const load = async ({cookies, url}: {cookies: any, url: URL}) => {
  const {user, error} = await getUser(cookies)

  if (error) {
    return throwError(500, "Une erreur c'est produite lors de l'access a votre tableau de bord")
  }

  if (!user) {
    redirect(307, "/vendeurs/connection")
  }

  // Check if user needs to complete onboarding (name + password)
  // But don't redirect if already on the commencer page
  const isOnCommencerPage = url.pathname.includes("/vendeurs/dashboard/commencer")
  const needsOnboarding = !user.name || !user.password
  const search = url.search
  if (needsOnboarding && !isOnCommencerPage) {
    //redirect(307, "/vendeurs/dashboard/commencer"+search)
  }
  
  const isPremium = await _isPremium(user)

  // Redirect to upgrade page only if not premium and not already on that page
  const isOnUpgradePage = url.pathname.includes("/vendeurs/continuer-avec-nous")
  if (!isPremium && !isOnUpgradePage && url.pathname.includes("/vendeurs/dashboard")) {
    redirect(307, "/vendeurs/continuer-avec-nous")
  }

  delete user.password
  delete user.created_at

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

  // Check if setup is complete (>= 5 products)
  const setupComplete = await isSetupComplete(user, products)
  
  // Redirect to setup if not complete and not already on setup/add pages
  const isSetupMode = url.searchParams.get('setup') === 'true'
  const isOnAjouterPage = url.pathname.includes('/produits/ajouter')
  const isOnProfile = url.pathname.includes('/profile')
  
  if (!setupComplete && !isOnCommencerPage && !isOnProfile && url.pathname.includes('/dashboard')) {
    // Allow access to ajouter page only during setup mode with the setup=true parameter
    if (!(isOnAjouterPage)) {
      redirect(307, '/vendeurs/dashboard/commencer')
    }
  }
  
  return {user, products, isPremium, events, orders, setupComplete}
}