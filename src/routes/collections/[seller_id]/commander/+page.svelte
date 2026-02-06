<script lang="ts">
    import Input from "$lib/components/Input.svelte"
    import Button from "$lib/components/Button.svelte"
	  import Textarea from "$lib/components/Textarea.svelte";
  
    import { useToast } from "$lib/composables/useToast"
	import { useCart } from "$lib/composables/useCart.svelte.js";
	import { page } from "$app/state";

  const {form} = $props()
  const {cart} = useCart()
  const cartForThisSeller = $cart.find((c: any) => c.seller_id === Number(page.params.seller_id))
  const totalPrice = cartForThisSeller ? cartForThisSeller.items.reduce((acc: number, item: any) => acc + (item.product.price * item.quantity), 0) : 0;

    interface Address {
      display_name: string,
      addresstype: string,
      name: string 
    }

    let query = $state("")
      const url = $derived(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`);
      let addresses = $state<Address[]>([])
      let loading = $state(false)
      let noResult = $state<boolean|string>(false)
      let selectedAddress = $state<null|Address>(JSON.parse(form?.address || "null"))

    const toast = useToast()

      const findAddresses = () => {
        addresses = []
        loading = true
        fetch(url)
          .then(response => response.json())
          .then(data => {
             addresses = data
              .filter((a: any) => {
                 return ['municipality', 'town'].includes(a.addresstype)
               })
               loading = false
               if(addresses.length === 0) noResult = query
               else noResult = false
            })
         }
    if (!cartForThisSeller || cartForThisSeller.items.length === 0) {
      toast.show("Aucun produit de votre panier est vendue par ce vendeur", "error", 4000)
    }
    if (form?.order === "confirmed") {
      toast.show("Commande Confirmée", "success", 4000)
    }else {
      toast.show("Une erreur c'est produite. Veuillez réessayer", "error", 4000)
    }
</script>

<h1>Planifier une commande</h1>

{#if !cartForThisSeller || cartForThisSeller.items.length === 0}
  <div class="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-400"
  >
  <p>Aucun produit de votre panier est vendue par ce vendeur</p>
  </div>
   <a href="/collections/{page.params.seller_id}"
     class="highlight my-4 inline-block">
      Retourner à la collection de ce vendeur 
    </a>
{:else}
<section 
  class="flex flex-wrap gap-8 md:flex-nowrap justify-center p-2 m-2 rounded-2xl">
  <div class="w-full">
  <h4>Produit{cartForThisSeller.items.length > 1 ? "s" : ""}</h4>
  
{#snippet productCard(product: {image: string, title: string}, quantity: number)}
<div class="w-full flex rounded-2xl border-2 border-card overflow-hidden">
  <div class="w-3/5 p-2 flex flex-col justify-between">
    <h2 class="text-xl">{product.title}</h2>
    <p class="text-gray">Quantité: {quantity}</p>
    <p class="text-xs text-gray">Vendeur: {cartForThisSeller.sellerName}</p>
  </div>
  <img class="w-2/5" src={product.image} alt={product.title} />
</div>
{/snippet}

 {#each cartForThisSeller.items as item}
    {@render productCard(item.product, item.quantity)}
 {/each}
 <div>
  <br>
  <h2>Total</h2>
  <p class="font-bold text-xl text-gray-700 mt-[-6px]">
    {totalPrice.toLocaleString("fr-FR")} FCFA
  </p>
</div>
</div>

<div class="w-full">
 <h4>Formulaire</h4>
<form
 method="POST"
 action="?/request_order"
 class="bg-card rounded-2xl p-4 w-full flex flex-col gap-4">
    <Input 
      placeholder="Nom"
      label="Votre nom"
      name="customer_name"
      value={form?.customer_name || ""}
      required
    />
    <Input
     type="number"
     label="Numero de telehone"
     placeholder="XX XXX XX XX"
     name="phone"
     value={form?.phone || ""}
     required
    />
    
    <div class="flex items-center gap-2">
    <Input
     type="search"
     label="Address"
     placeholder="Recherchez votre localité"
     oninput={({target} : {target: HTMLInputElement}) => {query = target.value;}}
    />
    <Button 
      size="md" 
      type="button"
      onclick={findAddresses}
      class="self-end flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
    </Button>
    </div>
    <div class="bg-card p-2 rounded-2xl w-full max-w-md mx-auto">
      {#each addresses as address}
        <div
         class="w-full my-2 bg-back-main p-4 rounded-xl overflow-x-auto flex flex-wrap gap-2 items-center"
        >
         <p class="text-gray">{address.display_name}</p>
         <Button 
           type="button" 
           onclick={() => {
            selectedAddress = address
            query = ""
            addresses = []
            noResult = false
            loading = false
           }}
           variant="neutral">Selectionner</Button>
      </div>
      {:else}
       <p class="my-2 text-center text-gray">
         {loading ? "chargement..." : noResult ? `Aucun resultat pour '${noResult}'` : "Recherchez votre commune, municipalité ou arrondissement!"}
       </p>
     {/each}
    </div>
    <p>Addresse Selectionné: <span class="p-2 rounded-xl m-1 bg-back-main">{selectedAddress ? selectedAddress.name : "Aucun"}</span></p>
    <input type="hidden" name="address" value={JSON.stringify(selectedAddress)} />
    <Textarea 
      required
      class="w-full"
      name="address_info"
      value={form?.address_info || ""}
      placeholder="Ex: À côté de l'arrêt 84 ou prés du Auchan"
      label="Plus d'infos pour l'addresse de livraison"
    />
    <input type="hidden" name="seller_name" value={cartForThisSeller.sellerName} />
    <input type="hidden" name="total" value={totalPrice} />
    <input type="hidden" name="items" value={JSON.stringify(cartForThisSeller.items)} />
  <Button type="submit" disabled={selectedAddress === null}>Commander</Button>
</form>
</div>
</section>
{/if}