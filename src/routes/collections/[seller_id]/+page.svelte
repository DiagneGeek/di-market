<script lang="ts">
  import Hero from "$lib/components/Hero.svelte"
  import ArticleCard from "$lib/components/ArticleCard.svelte"
  import Button from "$lib/components/Button.svelte"

  const {data} = $props()

   const share = async (e) => {
    const {target} = e
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvrez la collection de ${data.seller.name} chez DiMarket` || document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // fallback (copy link)
      navigator.clipboard.writeText(window.location.href);
    }
  };
</script>

<svelte:head>
  <title>DiMarket - Bienvenue chez {data.seller.name}</title>
</svelte:head>

<Hero>
<h1>
  Bienvenue dans la collection<br>
  <span class="highlight italic">
   {data?.seller?.name}
  </span>
</h1>
<div class="flex justify-center items-center gap-4 mt-8">
<Button
  onclick={share}
 >
   Partager sur les reseaux
 </Button>
  <Button 
    variant="neutral"
    onclick={() => navigator.clipboard.writeText(window.location.href)}
  >
    Copier le lien
  </Button>
 </div>
</Hero>

<h2 class=" text-xl px-4">Mes produits</h2>
<section class="w-full flex justify-center gap-8 md:px-20 flex-wrap my-12">
    {#each data.products as product}
       <ArticleCard
         title={product.title}
         price={product.price}
         slug={product.slug}
         category={product.category}
         seller={product.seller_id}
         description={product.description}
         img={product.image}
        />
        {:else}
         <p class="text-gray-500">Aucun produit disponible pour cette collection.</p>
    {/each}
  </section>

