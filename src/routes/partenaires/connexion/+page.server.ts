import { authForPartner } from "$lib/server/auth/partner";
import type { Actions } from "@sveltejs/kit";

export const actions = {
    default: authForPartner
} satisfies Actions