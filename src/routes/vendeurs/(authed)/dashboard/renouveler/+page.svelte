<script>
	import Button from "$lib/components/Button.svelte";
import Hero from "$lib/components/Hero.svelte";
	import Tip from "$lib/components/Tip.svelte";
	import { formatAmount } from "$lib/composables/formatAmount";

  const { data }  = $props()
  
  let duration = $state(0) // month
  const message = $derived(`Salut cheikh, mon abonnement a expiré. Je souhaite le renouveler pour ${duration} mois. Merci de me dire comment procéder.`)
</script>

<Hero>
  <h1><span class="bg-primary font-fraunces px-2 py-1 rounded">Renouvelez</span> votre abonnement</h1>
  <p class="mb-4 mx-auto">
    Votre abonnement
    {#if data.daysLeft <= 0}
     <span class="text-red-500 font-bold">a expiré</span>
    {:else}
      <span class="text-green-500 font-bold">{data.daysLeft} jours</span> restants
    {/if}
    . Pour continuer à utiliser nos services, 
    veuillez renouveler votre abonnement.</p>
  
    <!-- a set of cards with 4 different durations and prices where the user can select one of them and below a button to text me on whatsapp with the message above and the selected duration. I want you to display the price for each duration and for each duration i want a discount that scale by 3%-->
    <div class="flex justify-center flex-wrap gap-4 my-4">
      {#each [1, 3, 6, 12] as month, index}
        <div class="bg-card p-3 rounded-2xl flex flex-col justify-between items-center gap-2 w-50">
          <div class="flex justify-between w-full">
            <p class="font-bold">{month} mois</p>
            <div class="text-xs ">
              <p class="text-[11px] p-1 px-2 bg-secondary rounded-full">- {index * 7} %</p>
            </div>
          </div>
          <div class="my-2">
          <p class="w-full text-lg text-bold">{formatAmount((month * 29900) * (1 - (index * 0.07)) ) }</p>
          <p class="text-sm text-gray-700 translate-y-[-3px] {index === 0 ? "opacity-0" : ""}">Aulieu de {formatAmount(month * 29900)}</p>
          </div>
          <a href={`https://wa.me/221781878234?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant={month === duration ? 'primary' : 'sober'} onclick={() => duration = month}>
              Selectionner
            </Button>
          </a>
        </div>
      {/each}
    </div>
    
    
    <Tip>
      <p class="text-left">
        Si vous êtes maintenant sûre que DiMarket est utile pour votre business, vous pouvez choisir de renouveler votre abonnement pour une durée plus longue afin de bénéficier d'une réduction sur le prix total et de devoir penser à renouveler moins souvent.
      </p>
    </Tip>
</Hero>