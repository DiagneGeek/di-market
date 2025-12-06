<script lang="ts">
  import Button from "$lib/components/Button.svelte"

  const {data} = $props()
  const {product} = data
</script>

<svelte:head>
  <title>DiMarket - {product?.title || "Produit"}</title>
  <meta name="description" content={product?.description || ""} />
  <meta property="og:title" content={`DiMarket - ${product.title}`} />
  <meta property="og:description" content={product.description} />
  <meta property="og:image" content={product.image} />
  <meta property="og:type" content="website" />
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
