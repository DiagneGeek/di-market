<script lang="ts">
        import ArticleCard from '$lib/components/ArticleCard.svelte';
        import Button from '$lib/components/Button.svelte';
        import ShareCollectionCard from '$lib/components/ShareCollectionCard.svelte';
        import Input from '$lib/components/Input.svelte';
        import Modal from '$lib/components/Modal.svelte';
        import Textarea from '$lib/components/Textarea.svelte';
    import {productCatagories} from "./categories"
        import type { Article } from '$lib/types';
        import type { PageProps } from './$types';
  import { browser } from '$app/environment';

    import { page } from "$app/stores"
        import { invalidateAll } from '$app/navigation';
  import { useToast } from "$lib/composables/useToast"
   
  

  let { data }: PageProps = $props();

  if ($page.url.searchParams.has("reload")) {
    window.location.href = "/vendeurs/dashboard/produits"
  }
  const products: Article[] | any = data.products
             .sort((a: Article, b: Article) => {
                return parseInt(new Date(b.created_at).getTime().toString()) - parseInt(new Date(a.created_at).getTime().toString())
              });                                                  const toast = useToast()
  const message = "Si tu veux créer ta collection en ligne gratuitement sans com mision, clique sur le lien: https://dimarket.biz/vendeurs"                      </script>

<h1>Mes Produits</h1>

{#snippet insight(heading: string, subheadng: string)}
    <div class="flex flex-col items-center  gap-1 w-[100px]">
        <p class="text-xl font-bold text-amber-600 italic">{heading}</p>
        <p>{subheadng}</p>
    </div>
{/snippet}

<div
 class="flex items-center justify-between px-4  border-card border-2 rounded-3xl py-2">                                                                           {@render insight(data.products ? data.products.length.toString() : '0', "produ its")}                                                                            <a href="/vendeurs/dashboard/produits/ajouter">
  <Button>Ajouter un produit</Button>
  </a>
</div>

{#if data.products && data.products.length > 0}
<div class="my-6 max-w-2xl mx-auto">
  <ShareCollectionCard 
    sellerId={data.user.id}
    sellerName={data.user.name}
    productCount={data.products?.length || 0}
    compact={false}
  />
</div>
{/if}

<div class="w-full flex justify-center my-8">
    <div class="w-full max-w-[900px] border-card border-2 rounded-3xl flex justi fy-center gap-4 flex-wrap p-4">                                                         {#each data.products as product}
            <ArticleCard
              title={product.title}
              seller={data.user.name}
              slug={product.slug}
              price={product.price}
              description={product.description}
              img={product.image}
              id={product.id}
            ></ArticleCard>

        {:else}
         <h2 class="text-2xl">Créez vos premiers produits</h2>
          <p>Avant de pouvoir voir n'importe quelle changement,  vous aurez d'ab ord besoin d'ajouter vos produits à DiMarket</p>                                          <a href="/vendeurs/dashboard/produits/ajouter">
            <Button>Ajouter mes produits</Button>
          </a>
        {/each}
       
    </div>
</div>
