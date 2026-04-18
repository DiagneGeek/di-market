import { authForPartner } from "$lib/server/auth/partner";
import type { Actions } from "@sveltejs/kit";
import {getPartner} from "$lib/server/auth/getUser"
import { redirect } from "@sveltejs/kit"


export const load = async ({cookies}) => {
  const {partner, error} = await getPartner(cookies)
  if (!error && partner) {
    redirect(302, "/partenaires/dashboard")
  }
  return {unknown: true}
}

export const actions = {
    default: authForPartner
} satisfies Actions