import { fail, redirect } from "@sveltejs/kit"

export const actions = {
    default: async ({request, cookies}: any) => {
      const formData = await request.formData()
      const password = formData.get("password") as string 
      console.log("thhhh")
      const mypassword = "jemappelbambaag17ansetjesuisambitieux"
      if (password === mypassword) {
        // Handle successful authentication
        cookies.set("admin_auth_token", password, { path: "/", httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 24 * 7 }) // Set cookie for 7 days;

        redirect(302, "where-i-manage/dashboard")
      } else {
        return fail(400, { error: "hmm, seems like you have nothing to do here 🤨"})
      }

    }
}