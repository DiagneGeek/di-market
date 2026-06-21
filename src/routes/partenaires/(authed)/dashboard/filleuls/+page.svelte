<script lang="ts">
 import Select from '$lib/components/Select.svelte';
 import Toggle from "$lib/components/Toggle.svelte"
 import ReferralCard from "$lib/components/ReferralCard.svelte"
 import { page } from '$app/state';
 
 const {data} = $props()
 const {
    partner,
    referredSellers,
    paidSellers,
    newRefferals,
    newPaidRefferals
 } = data;
 

 const params = page.url.searchParams
const checkParam = (n:string, v:string) => params.has(n) && params.get(n) === v

let filters = $state({
  period: params.get("date") || "cette_semaine",
  paidOnly: checkParam("payants_seulement", "true"),
  freeOnly: checkParam("non_payants_seulement", "true")
})
let effectRunned = false
$effect(() => {
  let search = `date=${filters.period}&payants_seulement=${filters.paidOnly}&non_payants_seulement=${filters.freeOnly}`
  if (effectRunned) window.location.href = `/partenaires/dashboard/filleuls?${search}`
  effectRunned = true
})



 const filteredList = () => {
    let list = newRefferals
    if (checkParam("payants_seulement", "true")) {
        list = [...newPaidRefferals]
    } else if (checkParam("non_payants_seulement", "true")) {
        list = newRefferals.filter((r: any) => r.last_payment === null)
    }
    return list
 }
</script>

<p class="text-gray text-xs">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
    Un filieul est une personne qui s'inscrit aprés avoir cliquer sur votre lien
</p>

<div class="w-full flex justify-between items-center flex-col md:flex-row mx-auto md:px-4 mb-6">
    <h1>Filleuls</h1>
    
    <div class="flex md:items-center gap-4 flex-col md:flex-row">
      <Select
        border={true}
        onchange={(value: string) => filters.period = value.toLowerCase().replace(/\s/g, "_")}
        label="Période"
        options={[
             "Aujourdhui",
             "Cette Semaine",
             "Ce Mois",
             "Cette Année",
             "Toutes Les Périodes"
          ]}
        default={page.url.searchParams.get("date") ? page.url.searchParams.get("date")?.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "Cette Semaine"}
      ></Select>
      
      <Toggle
        onchange={(checked) => checked && filters.freeOnly ? filters.freeOnly = false : null}
        bind:checked={filters.paidOnly} name="payants seulement">
        payants seulement
      </Toggle>

      <Toggle        
       onchange={(checked) => checked && filters.paidOnly ? filters.paidOnly = false : null}
       bind:checked={filters.freeOnly}>
        Non payants seulement
      </Toggle>
    </div>
</div>

{#snippet insight(name: string, value: any)}
  <div class="p-4 flex-1 rounded-2xl bg-card flex flex-col items-items-center gap-2">
    <p class="text-center font-fraunces text-secondary text-2xl">{value}</p>
    <p class="text-gray text-center text-xs">{name}</p>
  </div>
{/snippet}

<div class="my-4 w-full flex justify-center items-center gap-4">
  {@render insight("Filleuls payants", newPaidRefferals.length)}
  {@render insight("Filleuls non payants", newRefferals.filter((r: any) => r.plan !== "PREMIUM" && r.last_payment === null).length )}
  {@render insight("Filleuls en essaie gratuite", newRefferals.filter((r: any) => r.access_ends_at != null).length )}
</div>

<section class="w-full border-t-1 border-slate-100 my-6 py-2 grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {#each filteredList() as referral (referral.id)}
    <ReferralCard
      name={referral.name}
      createdAt={referral.created_at}
      isPaid={referral.plan === "PREMIUM" && referral.last_payment !== null}
      ordersCount={referral?.Orders?.length || 0}
      planType={referral.plan}
    />
  {/each}

  {#if filteredList().length === 0}
    <div class="col-span-full text-center py-16 md:py-20">
      <p class="text-gray-400 text-sm md:text-base">Aucun filleul ne correspond à vos critères</p>
    </div>
  {/if}
</section>