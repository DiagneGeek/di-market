<script lang="ts">
	import ArticleCard from "../lib/components/ArticleCard.svelte";
	import Button from "../lib/components/Button.svelte";
	import Hero from "../lib/components/Hero.svelte";

    const {data} = $props()
</script>

<svelte:head>
	<title>DiMarket - La plateforme qui reunis vos boutiques preferees</title>
	<meta name="description" content="DiMarket est un marketplace Senegalais qui regroupes divers produits de qualites qui vont vous ravir !" />
</svelte:head>

<section>
  <Hero>
	<h1 class="italic">La place qui reunis tous les articles que vous cherchez !</h1>
	<p>decouvrer un large gamme de produits senagalais qui vont vous ravirent</p>
	<Button variant="primary" class="mt-4">Decouvrir nos produits</Button>
  </Hero>
  <section class="w-full flex justify-center gap-8 md:px-20 flex-wrap my-12">
    {#each data.articles as product}
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
</section>
