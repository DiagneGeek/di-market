import { insertIn, selectTable } from "$lib/server/supabase";
import type { User } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { phone, referer } = await request.json();

    // Validate phone
    if (!phone || phone.trim().length < 7) {
      return json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const { data: existingUser } : {
      data: User | null
    } = await selectTable("Sellers")
      .eq("phone", phone)
      .single();

    if (existingUser && existingUser != undefined) {
      if (!existingUser.id) return json({
        error: "Will never happen"
      })
      // Return existing seller - they're a returning user
      cookies.set("session_id", existingUser?.id.toString(), { path: "/" });
      return json({ user: existingUser, isNew: false });
    }

    // Create new seller with just phone
    const TRIAL_DAYS = 30;
    const trial_ends_at = new Date(
      Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    const newSeller: User = {
      phone,
      referred_by: referer,
      plan: "PREMIUM",
      trial_ends_at,
      name: "",
      password: ""
    };

    const { data: inserted, error } = await insertIn("Sellers", [newSeller]).select();

    if (error) {
      return json(
        { error: "Erreur lors de la création du compte" },
        { status: 500 }
      );
    }

    // Set session cookie
    cookies.set("session_id", inserted[0].id.toString(), 
      { 
        path: "/" 
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 30
      });

    return json({ user: inserted[0], isNew: true });
  } catch (error) {
    console.error("Registration error:", error);
    return json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
};
