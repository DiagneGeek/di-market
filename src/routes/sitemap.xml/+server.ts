import { getArticles } from "$lib/server/articles"
import { selectTable } from "$lib/server/supabase"
import { getPosts } from '$lib/composables/getPosts'
import { getGuides } from '$lib/composables/getGuides'
import { getTutorials } from '$lib/composables/getTutorials'

export async function GET() {
  const baseUrl = 'https://dimarket.biz'

  // Fetch data with null safety
  const { data: products = [] } = await getArticles()
  const { data: sellers = [] } = await selectTable("Sellers", "*")
  const posts = getPosts() || []
  const guides = getGuides() || []
  const tutorials = getTutorials() || []

  // Static pages
  const staticPages = [
    "/",
    "/vendeurs",
    "/vendeurs/connection",
    "/vendeurs/inscription",
    "/collections",
    "/vendeurs/commencer",
    "/products",
    "/partenaires",
    "/ressources",
    "/ressources/blog",
    "/ressources/tutoriels", 
    "/ressources/guides"
  ]

  // Generate URL entries
  const urls = [
    // Static pages
    ...staticPages.map(path => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
      </url>
    `),
    
    // Products
    ...(products?.length ? products.map((p: any) => `
      <url>
        <loc>${baseUrl}/products/${p.slug}</loc>
        <lastmod>${p.updated_at}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `) : []),
    
    // Collections (seller pages)
    ...(sellers?.length ? sellers.map((s: any) => `
      <url>
        <loc>${baseUrl}/collections/${s.id}</loc>
        <lastmod>${s.updated_at}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `) : []),
    
    // Blog posts
    ...(posts?.length ? posts.map((p: any) => `
      <url>
        <loc>${baseUrl}/ressources/blog/${p.slug}</loc>
        <lastmod>${p.updated_at || p.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `) : []),
    
    // Guides
    ...(guides?.length ? guides.map((g: any) => `
      <url>
        <loc>${baseUrl}/ressources/guides/${g.slug}</loc>
        <lastmod>${g.updated_at || g.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `) : []),
    
    // Tutorials
    ...(tutorials?.length ? tutorials.map((t: any) => `
      <url>
        <loc>${baseUrl}/ressources/tutoriels/${t.slug}</loc>
        <lastmod>${t.updated_at || t.date}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `) : [])
  ].join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}