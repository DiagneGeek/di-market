import {getArticles } from "$lib/server/articles"
import {selectTable} from "$lib/server/supabase"

export async function GET() {
      const baseUrl = 'https://dimarket.biz'

        // Fetch data from your DB or API
     const {data: products} = await getArticles()
     const {data: sellers, error} = await selectTable("Sellers", "*")

    const urls = [
        ...products.map(p => `
             <url>
                <loc>${baseUrl}/products/${p.slug}</loc>
                <lastmod>${p.updated_at}</lastmod>
            </url>
        `),
        ...sellers.map(s => `
          <url>
             <loc>${baseUrl}/boutiques/${s.id}</loc>
             <lastmod>${s.updated_at}</lastmod>
             <changefreq>weekly</changefreq>
          </url>
         `)
    ].join('')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
           <url>
             <loc>${baseUrl}</loc>
             <changefreq>daily</changefreq>
           </url>

           <url>
             <loc>${baseUrl}/vendeurs</loc>
             <lastmod>2025-12-16</lastmod>
           </url>

           <url>
            <loc>${baseUrl}/vendeurs/connection</loc>
           </url>

           <url>
            <loc>${baseUrl}/vendeurs/inscription</loc>
           </url>

           <url>
             <loc>${baseUrl}/boutiques</loc>
             <changefreq>weekly</changefreq>
           </url>

           
           ${urls}
        </urlset>
    `

     return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml'
         }
    })
 }