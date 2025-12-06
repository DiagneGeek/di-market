<script lang="ts">
	import ArticleCard from "../lib/components/ArticleCard.svelte";
	import Button from "../lib/components/Button.svelte";
	import Hero from "../lib/components/Hero.svelte";
    import Input from "$lib/components/Input.svelte"
    import { page } from '$app/stores';
    import { invalidateAll, goto } from '$app/navigation';

  const {data} = $props()
  const products = data.data || []

  let query = $state($page.url.searchParams.get("nameinclude") || "")

  if (query !== "") {
    invalidateAll()
  }
</script>

<svelte:head>
	<title>DiMarket - La plateforme qui reunis vos boutiques preferees</title>
	<meta name="description" content="DiMarket est un marketplace Senegalais qui regroupes divers produits de qualites qui vont vous ravir !" />
</svelte:head>

<div>
  <Hero>
	<h1 class="italic">La place qui reunis tous les articles que vous cherchez !</h1>
	<p>decouvrer un large gamme de produits senagalais qui vont vous ravirent</p>
  </Hero>

  <div class="w-full rounded-xl bg-card flex justify-center gap-2">
    <Input 
      value={query} 
      oninput={(e) => query = e.target.value}
      placeholder="Rechercher un produit" />
    <Button onclick={() => goto(`/?nameinclude=${query}`)}>Rechercher</Button>
  </div>

  <section class="w-full flex justify-center gap-8 md:px-20 flex-wrap my-12">
    {#each products as product}
       <ArticleCard
         title={product.title}
         price={product.price}
         slug={product.slug}
         seller={product.seller_id}
         description={product.description}
         img={product.image}
        />
    {:else}
      <p>Aucun produit pour le moment</p>
    {/each}
  </section>
</div>
