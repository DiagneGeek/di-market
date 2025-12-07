<script lang="ts">
  import Button from "$lib/components/Button.svelte"

  const {data} = $props()
  const {product} = data

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

const share = async (e) => {
    const {target} = e
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          text: product.description || "Achetez maintenant !",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // fallback (copy link)
      navigator.clipboard.writeText(window.location.href);
      target.innerHTML = "URL copier!"
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

  <img 
     src={product.image}  
     alt={product.title}
     class="rounded-2xl border-2 border-card my-4 w-full min-h-[150px]"
  />
  <h1>{product.title}</h1>
   <Button 
      onclick={share}
      class="flex gap-2 justify-center items-center"
      variant="neutral" 
      size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-1">
       <path d="M12 6a2 2 0 1 0-1.994-1.842L5.323 6.5a2 2 0 1 0 0 3l4.683 2.342a2 2 0 1 0 .67-1.342L5.995 8.158a2.03 2.03 0 0 0 0-.316L10.677 5.5c.353.311.816.5 1.323.5Z" />
      </svg> 
      Partager
  </Button>
  <div class="px-2 py-4 flex justify-between rounded-2xl border-1 border-card">
    <p class="font-bold italic">{product.price} fcfa</p>
    <p>Categorie: {product.category}</p>
  </div>
  <p class="my-2 mt-4 bg-card rounded-2xl text-right px-2 py-4">{product.description}</p>
  <a href="https://wa.me/{product.Sellers?.phone}?text=Salut {product.Sellers?.name}, je suis interessé par votre produit sur DiMarket '{product.title}'. On peut en discuter ?" target="_blank" rel="noopener norefferer">
  <Button class="my-4">Contacter le vendeur</Button>
</a>

  <p>Par <span class="font-bold underline">{product.Sellers?.name}</span></p>
{/if}
