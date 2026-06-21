import { selectTable } from "$lib/server/supabase"
import { redirect } from "@sveltejs/kit"

export const load  = async ({cookies} : any) => {
    const authToken = cookies.get("admin_auth_token")
    if (authToken !== "jemappelbambaag17ansetjesuisambitieux") {
        redirect(302, "/where-i-manage")
    }

    const {data: sellers, error} = await selectTable("Sellers", "*, Products(*, Events(*))")
    if (error) {
        console.error("Error fetching users:", error)
        return { sellers: [], partners: [], allProducts: [], allEvents: [] }
    }

    const {data: partners, error: e2} = await selectTable("partners", "*")
    if (e2) {
        console.error("Error fetching partners:", e2)
        return { sellers, partners: [], allProducts: [], allEvents: [], buyers: [] }
    }

    const buyers = await selectTable("Buyers", "*, Orders(*, Order_Items(*))")
    if (buyers.error) {
        console.error("Error fetching buyers:", buyers.error)
        return { sellers, partners, allProducts: [], allEvents: [], buyers: [] }
    }

    const allProducts = sellers?.flatMap((seller: any) => seller.Products) || []
    const allEvents = allProducts.flatMap((product: any) => product.Events) || []
    
    return { sellers, partners, allProducts, allEvents, buyers: buyers.data || [] }
}