import { getUser, isPremium as _isPremium} from "$lib/server/auth/getUser"
import { selectTable } from "$lib/server/supabase"
import { isSetupComplete } from "$lib/server/setupCheck"
import { error, redirect } from "@sveltejs/kit"
import type { Product, Event } from "$lib/types/index.js"
import type { PostgrestError } from "@supabase/supabase-js"

const throwError = error

interface Data {
  data: Product[] | null,
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
    if (user.last_payment === null || user.last_payment === undefined) {
      redirect(307, "/vendeurs/continuer-avec-nous")
    } else if (!url.pathname.includes("/vendeurs/dashboard/renouveler")) {
      redirect(307, "/vendeurs/dashboard/renouveler")
    }
  }

  delete user.password
  delete user.created_at

  const {data: events} : {
    data: Event[] | any
  } = await selectTable("Events").eq("seller_id", user.id)


  const {data: products, error: pErrors} : {
    data: Product[] | any
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

  const access_ends_at =  new Date(user.access_ends_at || new Date()) 
  const now = new Date()
  const daysLeft = Math.ceil((access_ends_at.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return {user, daysLeft, products, isPremium, events, orders, setupComplete}
}