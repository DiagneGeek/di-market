import { createSubscriptionCheckout } from "$lib/server/payment"
import type { Actions } from "@sveltejs/kit"

export const actions = {
    continue: async ({ request, cookies }) => {
        await createSubscriptionCheckout()
    }
} satisfies Actions