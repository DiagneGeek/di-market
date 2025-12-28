<script lang="ts">
  import { page } from "$app/stores"
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
  import { useToast } from "$lib/composables/useToast"
  import { enhance } from '$app/forms';

  const { data, form } = $props()
  const toast = useToast()

  const product = data.products.find((p: any) => p.id === Number($page.url.searchParams.get("product_id")))

  let type = $state("percentage")
  let dateInput: HTMLInputElement | null = null
  let discount = $state(0)
  let expi = $state<string | null>(null)
  let error = $state<string>("")
  
  const isPast = $derived.by(() => {
    if (!expi) return false
    try {
      const expiDate = new Date(expi + "T00:00:00")
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return expiDate < today
    } catch {
      return false
    }
  })

  $effect(() => {
    if (form?.success) {
      toast.show(`Reduction appliqué avec succès`, "success", 3000)
    }
  })

  const canSubmit = $derived(discount > 0 && expi && !isPast)
</script>



<h2 class="text-xl">Faire Une Reduction</h2>

<div class="bg-card p-2 rounded-lg">
    <h2>Type de reduction</h2>
    <div class="flex items-center justify-center gap-2">
        <input type="radio" bind:group={type} id="pourcentage" name="type_reduction" value="percentage" checked>
        <label class="cursor-pointer {type === "percentage" ? "text-secondary" : ""}" for="pourcentage">Pourcentage</label>
        <input type="radio" bind:group={type} id="montant_fixe" name="type_reduction" value="fixed_amount">
        <label class="cursor-pointer {type === "fixed_amount" ? "text-secondary" : ""}" for="montant_fixe">Montant fixe</label>
    </div>
</div>
{ form?.success }
<form 
  method="POST"
  use:enhance
  class="flex flex-col items-center gap-4 my-4 bg-card p-4 rounded-lg">
  <div class="flex justify-center items-center gap-4">
    <Input
       type="number"
       value={discount}
       oninput={({target}: {target: HTMLInputElement}) => discount = parseFloat(target?.value || "0")}
       placeholder="Pourcentage ou montant"
       name="discount"
     />
    <p class="h-full flex items-center font-bold text-lg">
      {type === "percentage" ? "%" : "FCFA"}
    </p>
  </div>

  <p>Prix final: {type === "percentage" ? (product.price - (product.price * discount / 100)) : (product.price - discount)} fcfa</p>

  <input 
   type="date"
   class="scale-0"
   name="expiration_date"
   id="expi"
   onchange={(e: Event) => expi = (e.target as HTMLInputElement).value}
   bind:this={dateInput}
   />
   <label for="expi">
   <Button 
     type="button"
     onclick={() => dateInput?.click()}
     size="md" 
     variant="neutral">
    Definir la date d'expiration
   </Button>
   </label>
   
   <p>Date d'Expiration: {expi === null ? "Pas encore défini" : expi}</p>
   
   {#if error || form?.error}
     <p class="text-red-500 font-semibold">{error || form?.error}</p>
   {/if}
   
   {#if isPast && expi}
     <p class="text-red-500 text-sm">⚠️ Cette date est dans le passé</p>
   {/if}

   <input 
     type="hidden"
     value={type} 
     name="discount_type" />
   <input 
      type="hidden"
      value={$page.url.searchParams.get("product_id")}
      name="product_id" />

      <Button
        type="submit"
        class="w-full"
        disabled={!canSubmit}
      >
        Appliquer la réduction
      </Button>
</form>