import { redirect } from "@sveltejs/kit";

const ADMIN_TOKEN = "jemappelbambaag17ansetjesuisambitieux";

export const requireAdmin = (cookies: any) => {
  const authToken = cookies.get("admin_auth_token");
  if (authToken !== ADMIN_TOKEN) {
    throw redirect(302, "/where-i-manage");
  }
};
