<script lang="ts">
  import type { Product } from "$lib/types"
  import Button from "$lib/components/Button.svelte"

  interface Props {
    products: Product[];
    productViews: Record<string, number>;
  }

  let { products, productViews }: Props = $props();
</script>

<div class="bg-card p-8 rounded-2xl h-[300px] flex flex-col gap-2">
  <h3 class="text-center">Top Produits</h3>
  <div class="flex-1 overflow-y-auto">
    <ul class="space-y-2">
      {#each products as product, i}
        <li class="flex justify-between items-center p-2 bg-bg-2 rounded border-b-1 border-back-main">
          <span class="font-medium truncate">{i + 1}. {product.title}</span>
          <span class="text-sm text-gray-500">{product.id && productViews[product?.id] || 0} vues</span>
        </li>
       {:else}
         <div class="w-full h-[150px] flex justify-center  flex-col items-center gap-4">
          <p class="text-gray">Aucun produit pour le moment :(</p>
          <a href="/vendeurs/dashboard/produits">
            <Button variant="sober">
               Ajouter un produit
            </Button>
          </a>
         </div>
      {/each}
    </ul>
  </div>
</div>