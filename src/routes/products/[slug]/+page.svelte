<script lang="ts">
  import Button from "$lib/components/Button.svelte"
  import { page } from '$app/stores';
  import { goto } from "$app/navigation"
  import type { Article } from "$lib/types"

  const {data} = $props()
  const product: any = data.product

  if (!product) throw new Error("Produit non trouvé")

  const cameFrom = $page.url.searchParams.get("from") || null

  const checkBadge = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
    `

const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.Sellers.name
    },
    "offers": {
      "@type": "Offer",
      "url": `https://dimarket.biz/products/${product.slug}`,
      "priceCurrency": "XOF",
      "price": product.price,
      "availability": `https://schema.org/InStock`,
    },
    "seller": {
        "@type": "Organization",
        "name": product.Sellers.name
      }
  };

const share = async (e: Event) => {
    const target = e.target as HTMLButtonElement
    if(!target) return 
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title || document.title,
          text: product.description || "Achetez maintenant !",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // fallback (copy link)
      navigator.clipboard.writeText(window.location.href);
      target.innerText = "URL copier!"
    }
  };
</script>

<svelte:head>
  <title>DiMarket - {product?.title || "Produit"}</title>
  <meta name="description" content={product?.description || ""} />
  <meta property="og:title" content={`DiMarket - ${product.title}`} />
  <meta property="og:description" content={product.description} />
  <meta property="og:image" content={product.image} />
  <meta property="og:type" content="website" />

<script type="application/ld+json">
  {JSON.stringify(structuredData)}
</script>
</svelte:head>

{#if product.error}
  <h1>{product.status}</h1>
  <p>{product.error}</p>
{:else}


  <Button 
    onclick={() => cameFrom ? goto(cameFrom) : history.back()}
    size="sm"
    style="padding: 0 !important; margin: -8px !important"
    variant="outline">
    <span class="text-xs text-slate-600">&lt; Retour</span>
  </Button>

  <img 
     src={product.image}  
     alt={product.title}
     class="rounded-2xl border-2 border-card my-4 w-full min-h-[150px]"
  />

  <div class="w-full flex items-center justify-between gap-2 m-2 rounded-lg border border-card p-2">
      <p class="text-gray text-[12px]">Vendue par <a href="/boutiques/{product.Sellers?.id}" class="font-bold underline">{product.Sellers?.name}</a></p>
      {#if product.Sellers.plan === "PREMIUM"}
        <span title="Vendeur certifié" class="text-amber-500 font-bold flex items-center gap-1">{@html checkBadge} Certifié</span>
      {/if}
  </div>

  <h1>{product.title}</h1>
  <p>Categorie: {product.category}</p>
      
   <div 
      class="my-2 flex justify-center items-center gap-4">
   <Button 
      onclick={share}
      class="flex gap-2 justify-center items-center my-2"
      variant="neutral" 
      size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
       <path d="M12 6a2 2 0 1 0-1.994-1.842L5.323 6.5a2 2 0 1 0 0 3l4.683 2.342a2 2 0 1 0 .67-1.342L5.995 8.158a2.03 2.03 0 0 0 0-.316L10.677 5.5c.353.311.816.5 1.323.5Z" />
      </svg> 
      Partager sur les reseaux
  </Button>

   <Button 
      size="sm"
      variant="secondary"
      onclick={() => navigator.clipboard.writeText(window.location.href)}>
        Copier le lien
    </Button>
  </div>
  <div class="px-2 py-4 flex justify-center items-center  gap-2 rounded-2xl border-1 border-card flex-wrap">
    <p class="font-bold italic {product.discount && "line-through text-gray scale-90"}">
       {Number(product.price).toLocaleString("fr-FR")} fcfa
    </p>
    {#if product.discount}
      <p class="font-bold italic">
        {(product.discount_type === "percentage" ? (Number(product.price) - (Number(product.price) * product.discount / 100)) : (Number(product.price) - product.discount)).toLocaleString("fr-FR")} fcfa
      </p>

      <p class="text-sm bg-amber-100 text-amber-800 font-semibold p-2 rounded-full">
        -{product.discount_type === "percentage" ? `${product.discount}%` : `${product.discount}`} fcfa
      </p>

      <p>Promo valable jusqu'au {product.discount_end.split("T")[0]}</p>
    {/if}
  </div>
  <div class="flex justify-center">
  <p class="my-2 mt-4 bg-card rounded-2xl text-left px-2 py-4">{product.description}</p>
  </div>
  <form method="POST" action="?/add_wsapp_open">
  <input type="hidden" name="product" value={JSON.stringify(product)} />
  <input type="hidden" name="current" value={product.wsapp_open} />
  <Button 
     class="my-4">Contacter le vendeur</Button>
    </form>

{/if}
