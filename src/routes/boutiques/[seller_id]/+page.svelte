<script lang="ts">
  import Hero from "$lib/components/Hero.svelte"
  import ArticleCard from "$lib/components/ArticleCard.svelte"

  const {data} = $props()
</script>

<Hero>
<h1>
  Bienvenue dans la boutique de<br>
  <span class="highlight italic">
   {data?.seller?.name}
  </span>
</h1>
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

