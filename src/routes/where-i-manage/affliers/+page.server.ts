import { requireAdmin } from "$lib/server/admin";
import { selectTable } from "$lib/server/supabase";

export const load = async ({ cookies }: any) => {
  requireAdmin(cookies);

  const [{ data: partners, error: partnersError }, { data: sellers, error: sellersError }] = await Promise.all([
    selectTable("partners", "*"),
    selectTable("Sellers", "id, referred_by, plan, last_payment, created_at")
  ]);

  if (partnersError) {
    console.error("Error fetching partners:", partnersError);
  }
  if (sellersError) {
    console.error("Error fetching sellers for partner stats:", sellersError);
  }

  return {
    partners: partners || [],
    sellers: sellers || []
  };
};
