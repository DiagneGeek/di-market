<script lang="ts">
  import {formatAmount} from "$lib/composables/formatAmount"
  import Button from "$lib/components/Button.svelte"

  const {data} = $props()
  const {partner, newPaidRefferals} = data
  if (!partner) {
    throw new Error("pas autorisé")
  }
  const balance = formatAmount(partner.commissions || 0)
</script>

<h1>Paiements</h1>

<div class="bg-secondary flex flex-col md:flex-row md:justify-between gap-4 md:px-8 items-center p-2 rounded-2xl">
 <div class="flex w-full items-center md:items-start flex-col p-4">
  <h2>Vos Commissions Totales</h2>
  <p class="text-white font-fraunces text-3xl">{balance}</p>
 </div>
 <Button disabled={partner.commissions < 1000} class="shadow" variant="neutral">Retirer</Button>
 {#if partner.commissions < 1000}
 <p class="bg-red-300/20 text-red-900 p-2 rounded-xl">Vos commissions doivent être supérieures à 999 fcfa pour pouvoir retirer</p>
 {/if}
</div>


<p class="mt-2">Retrait via orange money ou wave en quelques secondes.</p>