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
          title: `Découvrez la boutique de ${data.seller.name} chez DiMarket` || document.title,
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

<Hero>
<h1>
  Bienvenue dans la boutique de<br>
  <span class="highlight italic">
   {data?.seller?.name}
  </span>
</h1>
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
</Hero>

<h2 class="mb-4">Mes produits</h2>
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
    {/each}
  </section>

