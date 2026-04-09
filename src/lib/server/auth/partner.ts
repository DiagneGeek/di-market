import { fail, redirect, type Actions } from "@sveltejs/kit";
import { insertIn, selectTable } from "../supabase";
import { nanoid } from "nanoid";

export const authForPartner = async ({ request, cookies} : { request: Request; cookies: any }) => {
        const formData = await request.formData()
        const phone = formData.get("phone") as string
        const password = formData.get("password") as string 

        const creds = {
         phone: parseInt(phone),
         password
        }
         
        if (!phone || !password) {
            return fail(400, { error: "Veuillez fournir un numéro de téléphone et un mot de passe", ...creds})
        }

        const type = formData.get("type")

        const {data: user, error} = await selectTable("partners").eq("phone", parseInt(phone)).single() as any
        let _user = user
        if (type === "register") {
          if (user) {
            console.log("User exists")
            return fail(400, { error: "Ce numéro de téléphone est dejà associé à un compte partenaire", ...creds })
          }
          const session_id = `${Date.now()}_${crypto.randomUUID().replace(/-/g, '')}`
          const partner_id = `partner_${nanoid(6)}${Date.now()}`
          // create new partner
          const {data: partner, error} = await insertIn("partners", [{
            phone: parseInt(phone),
            password,
            session_id,
            partner_id
        }]).select().single() as any
          _user = partner

          if (error) {
            console.error("Error ", error)
          }
        } else if (type === "login") {
            console.log("User ", user)
            if (!user || user.password !== password) {
                return fail(400, { error: "Numéro de téléphone ou mot de passe incorrect", ...creds })
            }
        }
        cookies.set("partner_session", _user.session_id, { path: "/" })
        redirect(303, `/partenaires/dashboard/?identified=true&phone=${_user.phone}&partnerid=${_user.partner_id}`)
        
    } 