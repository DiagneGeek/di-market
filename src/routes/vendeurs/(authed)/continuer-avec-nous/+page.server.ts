import type { Actions } from "@sveltejs/kit"

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData()
        const choice = formData.get("choice") as string

        if (choice === "continue") {
            // User chose to continue with DiMarket
            cookies.set("trial_choice", "continue", { path: "/" })
            return { success: true }
        } else {
            // User chose not to continue
            cookies.set("trial_choice", "not_continue", { path: "/" })
            return { success: true }
        }
    }
} satisfies Actions