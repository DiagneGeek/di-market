import { requireAdmin } from "$lib/server/admin";
import { selectTable, updateRow } from "$lib/server/supabase";

export const load = async ({ cookies }: any) => {
  requireAdmin(cookies);

  const { data: sellers, error } = await selectTable(
    "Sellers",
    "*, Products(*), Orders(*, Order_Items(*))"
  );

  if (error) {
    console.error("Error fetching sellers for utilisateurs page:", error);
    return { sellers: [] };
  }

  return {
    sellers: sellers || []
  };
};

export const actions = {
  changePlan: async ({ request, cookies }: any) => {
    requireAdmin(cookies);

    const formData = await request.formData();
    const sellerId = formData.get("sellerId");
    const months = parseInt(formData.get("months")) || 1;

    if (!sellerId) {
      return {
        success: false,
        error: "Seller ID is required"
      };
    }

    try {
      // Calculate the new access_ends_at date
      const now = new Date();
      const trialEndsAt = new Date(now.getTime() + months * 30 * 24 * 60 * 60 * 1000);

      const { data, error } = await updateRow("Sellers", {
        where: ["id", sellerId],
        value: {
          plan: "PREMIUM",
          access_ends_at: trialEndsAt.toISOString(),
          last_payment: new Date().toISOString(),
        }
      });

      if (error) {
        console.error("Error updating seller plan:", error);
        return {
          success: false,
          error: "Failed to update seller plan"
        };
      }

      return {
        success: true,
        message: `${data[0]?.name} est maintenant PREMIUM pour ${months} mois`
      };
    } catch (err) {
      console.error("Unexpected error:", err);
      return {
        success: false,
        error: "An unexpected error occurred"
      };
    }
  }
};
