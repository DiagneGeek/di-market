<script lang="ts">
        import ArticleCard from "$lib/components/ArticleCard.svelte";
        import Button from "$lib/components/Button.svelte";
        import Hero from "$lib/components/Hero.svelte";
  import Input from "$lib/components/Input.svelte"
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { Product} from "$lib/types"


  const {data} = $props()
 const products: Product[] | any = data?.products?.sort((a: Product, b: Product) => parseInt(new Date(b.created_at).getTime().toString()) - parseInt(new Date(a.created_at).getTime().toString()));

   let isGoing = $state(false)

   const go = async () => {
     isGoing = true
     await goto(`/products?nameinclude=${query}`)
     location.reload()
   }

  let query = $state($page.url.searchParams.get("nameinclude") || "")
</script>

<svelte:head>
        <title>DiMarket - La plateforme qui reunis vos collections preferees</title>
        <meta name="description" content="DiMarket est un marketplace Africain qui regroupe divers produits de qualités qui vont vous ravir !" />
</svelte:head>

<div>
  <Hero>
    <div class="text-center mb-6 sm:mb-8 animate-slideInFromLeft" style="animation-delay: 0ms;">
      <h1 class="italic text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">La place qui réunit tous les articles que vous cherchez !</h1>
      <p class="mx-auto">Comparez, commandez, tout simplement</p>
    </div>
    <div class="w-full flex justify-center gap-4 my-8">
      <a href="/panier">
        <Button size="md" variant="neutral">Voir Mon Panier</Button>
      </a>
      <a href="/collections">
        <Button size="md" variant="">Les collections</Button>
      </a>
    </div>
    <div class="w-full max-w-full sm:max-w-md mx-auto px-4 sm:px-0 animate-scaleIn" style="animation-delay: 100ms;">
      <div class="rounded-2xl flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 p-3 bg-white shadow-lg border border-gray-100">
        <Input 
          value={query} 
          oninput={(e: Event) => query = (e.target as HTMLInputElement).value}
          placeholder="Rechercher un produit" 
          class="flex-1" />
        <Button variant="neutral" onclick={go} class="w-full sm:w-auto">{isGoing ? "En cours..." : "Rechercher"}</Button>
      </div>
    </div>
  </Hero>

  <section class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-12 justify-items-center">
    {#each products as product (product.id)}
       <ArticleCard
         title={product.title}
         price={product.price}
         slug={product.slug}
         seller={product.seller_id}
         description={product.description}
         img={product.image}
        />
    {:else}
      <div class="col-span-full text-center py-12 animate-fadeIn">
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H3" />
          </svg>
        </div>
        <p class="text-gray-500 text-lg font-medium">Aucun produit trouvé</p>
        <p class="text-sm text-gray-400 mt-2">Essayez de modifier votre recherche</p>
      </div>
    {/each}
  </section>

  <!-- Call to action for sellers -->
  <section class="my-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-bold mb-3">🏪 Créez Votre Collection</h2>
    <p class="mb-8 mx-auto">Rejoignez des centaines de vendeurs qui partagent leurs produits sur DiMarket. C'est gratuit et facile !</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/vendeurs/inscription">
        <Button size="md" variant="primary">Créer Ma Collection</Button>
      </a>
      <a href="/collections">
        <Button size="md" variant="neutral">Découvrir les Collections</Button>
      </a>
    </div>
  </section>
</div>
