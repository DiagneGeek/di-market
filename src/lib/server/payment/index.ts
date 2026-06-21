import { redirect } from "@sveltejs/kit";

const keys = {
    api: "2a674a60f49e493e1a0043e49a39c0778e4d1e6fb008457a433dd448dd95aa1c",
    secretKey: "53f8fcca139e4884a7fb963a5cb996e02fdf52e400f114ad082ef07a76efa525"
}
const base = "https://paytech.sn/api"
const paymentData = {
    item_name: "Abonnement mensuel",
    item_price: 29900,
    currency: "XOF",
    ref_command: "CMD_" + Date.now() + "_" + crypto.randomUUID().slice(0, 8),
    command_name: "Commande test",
    env: "test", // Utiliser "prod" pour la production
    ipn_url: "https://dimarket.biz", // URL pour recevoir les notifications de paiement
    success_url: "https://dimarket.biz/vendeurs/dashboard", // URL de redirection après paiement réussi
    cancel_url: "https://dimarket.biz/", // URL de redirection après annulation
    // ... autres paramètres
};

export const createSubscriptionCheckout = async () => {
  try {
const response = await fetch(`${base}/payment/request-payment`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "API_KEY": keys.api,
        "API_SECRET": keys.secretKey
    },
    body: JSON.stringify(paymentData)
});

const rawText = await response.text();

// 2. Check if it's HTML (an error page) or JSON
if (rawText.trim().startsWith("<!DOCTYPE")) {
    console.error("❌ PayTech returned an HTML Error Page:");
    console.log(rawText); // This will print the actual error (e.g., 404, 500, or a specific message)
    return;
}

// 3. If it's safe, parse it as JSON
const data = JSON.parse(rawText);
console.log("✅ PayTech API Response:", data);

if (data.success === 1) {
            console.log("Success! Redirect your customer to this URL:");
            redirect(303, data.redirect_url);
            // Send data.redirect_url back to your frontend to redirect the user
        } else {
            console.error("Error creating checkout:", data);
            throw new Error(`Naboo API error: ${JSON.stringify(data)}`);
        }
  } catch (error) {
    console.error("Error in createSubscriptionCheckout:", error);
    throw error;
  }
}