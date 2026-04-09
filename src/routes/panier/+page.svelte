<script lang="ts">
    import { useCart } from "$lib/composables/useCart.svelte"
    import Button from "$lib/components/Button.svelte"
    const { cart, removeItem, changeQuantity } = useCart()
</script>

<h1>Mon Panier !</h1>
<p>Bienvenue dans votre panier, ici vous pourrez voir les produits qui vous intéressent et commander si vous êtes prêt.</p>

<section class="my-8 flex flex-col gap-4 w-full">
  {#each $cart as subCart, sellerIdx (subCart.seller_id)}
    <div class="w-full p-2 border border-gray-300 rounded-2xl">
      <h2 class="text-lg p-2 font-semibold mb-4">Vendeur:  {subCart.sellerName}
        <span class="text-sm font-normal text-gray-500 ml-2">({subCart.items.length} produits)</span>
      </h2>   
      <div class="flex flex-col gap-2 items-center">
        {#each subCart.items as item, itemIdx (itemIdx)}
          <div class="flex flex-col gap-2 p-2 bg-card rounded-2xl min-w-[290px] max-w-md">
            <div class="flex justify-between items-center">
              <h3 class="text-[13px]">{(item.product.title)}</h3>
              <img class="w-2/5 max-w-[150px] rounded-xl" src={item.product.image} alt="{item.product.title}" />
            </div>
           <div>
              <p class="text-sm text-gray-500">Quantité</p>
              <div class="flex items-center gap-2 w-[80px]">
                <Button 
                  onclick={() => changeQuantity(subCart.seller_id, itemIdx, item.quantity - 1)} 
                  size="sm" 
                  variant="neutral" 
                  disabled={item.quantity === 1}>
                  -
                </Button>
                <span class="font-semibold">{item.quantity}</span>
                <Button 
                  onclick={() => changeQuantity(subCart.seller_id, itemIdx, item.quantity + 1)}
                  size="sm"
                  variant="neutral"
                >
                  +
                </Button>
              </div>
           </div>
           <span class="text-sm font-semibold">{(item.product.price * item.quantity).toLocaleString("fr-FR")} FCFA</span>
            <Button
              onclick={() => removeItem(subCart.seller_id, itemIdx)}
              variant="dangerOutline"
              size="sm"
              class="w-16 ml-auto translate-x-[-25px]"
            >
              Supprimer
            </Button>
          </div>
        {/each}
     </div>
     <br>
     <h3>Total</h3>
     <p 
       class="text-sm text-gray font-semibold">
       {subCart.items
         .reduce((total: number, item: any) => total + (item.product.price * item.quantity), 0)
         .toLocaleString("fr-FR")} FCFA
      </p>
      
    <a href="/collections/{subCart.seller_id}/commander">
     <Button class="w-full mt-2" variant="neutral">
        Commander pour ce vendeur
     </Button>
    </a>
    </div>
  {:else}
    <p>Votre panier est vide pour le moment. Ajoutez des produits pour pouvoir commander</p>
    <a href="/products">
      <Button class="mt-4">
         Voir les produits 
      </Button>
    </a>
  {/each}
</section>