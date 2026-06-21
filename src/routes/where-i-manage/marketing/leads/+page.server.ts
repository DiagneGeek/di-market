import { scrapeGoogleMaps } from "$lib/server/lead-gen/scraping";

export const load = async () => {
    try {
        const leads = await scrapeGoogleMaps("fournisseur tissus Sandaga Dakar");
        console.log(leads);
        return { leads };
    } catch (error) {
        console.error("Scraping error:", error);
        return { leads: [] };
    }
};