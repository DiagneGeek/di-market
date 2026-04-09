
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import { useToast } from '$lib/composables/useToast.js';

    const {data} = $props()
    const {
     partner,
     referredSellers,
     paidSellers,
     newRefferals,
     newPaidRefferals
    } = data;

    const toast = useToast()
    let copyText = $state("Copier")
    const copy = async (text: string) => {
     await navigator.clipboard.writeText(text)
     copyText = "lien copié !"
     setTimeout(() => copyText = "Copier", 2000)
     toast.show('Lien copié dans le presse-papier!', 'success', 8000)
    }
</script>
<svelte:head>
    <title>Tableau de bord partenaire - DiMarket</title>
    <meta name="description" content="Gérez vos filleuls, suivez vos commissions et accédez à des outils exclusifs dans votre tableau de bord partenaire sur DiMarket." />
</svelte:head>

<div class="flex justify-between items-center mx-auto px-4 mb-6">
    <h1>Accueil</h1>
    <Select
     border={true}
     onchange={(value: string) => window.location.href = `/partenaires/dashboard?date=${value.toLowerCase().replace(/\s/g, "_")}` }
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

{#snippet quickInsight(insight: string, value: string)}
  <div class="bg-card p-4 rounded-lg shadow">
    <p class="text-sm text-gray-500">{insight}</p>
    <p class="text-xl font-semibold">{value}</p>
  </div>
{/snippet}

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
  {#each [
    { insight: "Nombre de filleuls", value:newRefferals.length },
    { insight: "Filleuls payants", value: newPaidRefferals.length },
    { insight: "Commissions totales", value: `${newPaidRefferals.length * 1000} FCFA` }
  ] as stat}
    {@render quickInsight(stat.insight, stat.value)}
  {/each}
</div>


<!-- Parter's link and last referals (help me)-->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <div class="bg-card p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-4">Lien partenaire</h2>
    <p class="text-sm text-gray-600">C'est le lien de parrainage qui nous permet de savoir que vous avez parrainé un utilisateur.</p>
    <div class="mt-4 flex items-center gap-2">
      <input
       type="text"
       readonly
       value={`https://dimarket.biz/partenaires/inscription?ref=${partner.partner_id}`}
       class="flex-1 p-2 rounded-lg bg-input border border-gray-300"
      />
      <Button
       onclick={async () => await copy(`https://dimarket.biz/partenaires/inscription?ref=${partner.partner_id}`)}
       variant="sober"
      >
        {copyText}
      </Button>
  </div>
    </div>  
  
  <div class="bg-card p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-4">Derniers filleuls</h2>
    <p class="text-sm text-gray-600">Suivez vos derniers parrainages.</p>
  </div>
</div>


