<script lang="ts">
 import Select from '$lib/components/Select.svelte';
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

 const filteredList = () => {
    let list = []
    if (checkParam("payants_seulemnt", "true")) {
        list = newPaid
    }
 }
</script>


<div class="flex justify-between items-center mx-auto px-4 mb-6">
    <h1>Accueil</h1>
    <div class="flex items-center gap-2 flex-wrap">
      <Select
        border={true}
        onchange={(value: string) => window.location.href = `/partenaires/dashboard/filleuls?date=${value.toLowerCase().replace(/\s/g, "_")}` }
        label="Période"
        options={[
             "Aujourdhui",
             "Cette Semaine",
             "Ce Mois",
             "Cette Année",
             "Toutes Les Périodes"
          ]}
        default={page.url.searchParams.get("date") ? page.url.searchParams.get("date")?.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "Cette semaine"}
      ></Select>
    </div>
</div>