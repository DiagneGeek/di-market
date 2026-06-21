// scraper.js
import puppeteer from "puppeteer";

const CONFIG = {
  query: "grossiste textile Dakar",
  maxResults: 20,
  headless: true,
  delayMin: 1200,
  delayMax: 3000,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const randomDelay = () =>
  sleep(CONFIG.delayMin + Math.random() * (CONFIG.delayMax - CONFIG.delayMin));

async function launchBrowser() {
    console.log("🚀 Lancement du navigateur...");
  return puppeteer.launch({
    headless: CONFIG.headless,
    executablePath: "/home/codespace/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome", 
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--lang=fr-FR",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled",
    ],
    defaultViewport: { width: 1280, height: 800 },
  });
}

export async function goToMaps(page: any, query: string) {
  await page.goto(
    `https://www.google.com/maps/search/${encodeURIComponent(query)}`,
    { waitUntil: "networkidle2", timeout: 30000 }
  );
  try {
    await page.waitForSelector('button[aria-label*="Tout accepter"]', { timeout: 4000 });
    await page.click('button[aria-label*="Tout accepter"]');
    await sleep(1000);
  } catch {}
}

export async function scrollAndGetResults(page: any) {
  await page.waitForSelector('[role="feed"]', { timeout: 15000 });

  let previousCount = 0;
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => {
      document.querySelector('[role="feed"]')?.scrollBy(0, 800);
    });
    await sleep(1500);

    const count = await page.$$eval(
      '[role="feed"] > div[jsaction]',
      (els) => els.length
    );
    if (count >= CONFIG.maxResults || count === previousCount) break;
    previousCount = count;
  }

  return page.$$('[role="feed"] > div[jsaction]');
}

export async function extractLeadDetails(page: any) {
  await randomDelay();
  try {
    await page.waitForSelector('h1.DUwDvf', { timeout: 5000 });

    return await page.evaluate(() => {
      const getText = (sel) => document.querySelector(sel)?.textContent?.trim() || "";

      return {
        name:     getText("h1.DUwDvf"),
        category: getText("button.DkEaL"),
        rating:   getText("span.ceNzKf") || getText(".MW4etd"),
        reviews:  getText(".UY7F9"),
        address:  document.querySelector('[data-tooltip*="dresse"]')?.textContent?.trim() || "",
        phone:    document.querySelector('[data-tooltip*="léphone"]')?.textContent?.trim() || "",
        website:  document.querySelector('a[data-tooltip*="ite Web"]')?.href || "",
        hours:    getText(".OMl5r") || getText(".o0Svhf"),
      };
    });
  } catch {
    return null;
  }
}

export async function scrapeGoogleMaps() {
  console.log(`🔍 Recherche: "${CONFIG.query}"`);

  const res = await fetch("https://serpapi.com/search.json?engine=google_local&q=Coffee")
    const data = await res.json();
    console.log(data);
    return [];

  const leads = [];

  try {
    await goToMaps(page, CONFIG.query);
    const results = await scrollAndGetResults(page);

    console.log(`📋 ${results.length} résultats trouvés\n`);

    for (let i = 0; i < Math.min(results.length, CONFIG.maxResults); i++) {
      try {
        await results[i].click();
        const lead = await extractLeadDetails(page);

        if (lead?.name) {
          leads.push(lead);
          console.log(`✅ [${i + 1}] ${lead.name} — ${lead.phone || "pas de tél"}`);
        }

        await page.goBack({ waitUntil: "networkidle2" });
        await randomDelay();
      } catch {
        console.log(`⚠️  [${i + 1}] Erreur, on continue...`);
        await page.goBack().catch(() => {});
      }
    }
  } finally {
    await browser.close();
  }

  return leads;
}

