import { requireAdmin } from "$lib/server/admin";

export const load = async ({ cookies }: any) => {
  requireAdmin(cookies);
  return {};
};
