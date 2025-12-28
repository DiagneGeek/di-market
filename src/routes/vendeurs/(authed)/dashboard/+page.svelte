<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import ChartCard from "$lib/components/ChartCard.svelte"
    import TopProductsCard from "$lib/components/TopProductsCard.svelte"
    import {getDates} from "$lib/composables/getDates"
	import { useToast } from "$lib/composables/useToast.js";
    import type { Event, Article } from "$lib/types"

    const {data} = $props()

    const periods = getDates()

    const periodDurations = {
      oneDayAgo: 1 * 24 * 60 * 60 * 1000,
      sevenDaysAgo: 7 * 24 * 60 * 60 * 1000,
      thirtyDaysAgo: 30 * 24 * 60 * 60 * 1000,
      oneYearAgo: 365 * 24 * 60 * 60 * 1000,
    }

    let period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo" = $state("oneDayAgo")
    const eventsInThisPeriod = $derived(
        data.events?.filter((event: Event) => new Date(event.created_at) >= new Date(periods[period])) || []
    )
    let views = $derived(
      eventsInThisPeriod
      .filter((event: Event) => event.type === "product_view")
    )
    let wsapp_opens = $derived(
      eventsInThisPeriod
      .filter((event: Event) => event.type === "wsapp_open")
    )

    let productViews = $derived(
      views.reduce((acc: any, event: Event) => {
        if (event.product_id) {
          acc[event.product_id] = (acc[event.product_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    )

    let topProducts = $derived(
      data.products?.sort((a: Article, b: Article) => (productViews[b.id || 0] || 0) - (productViews[a.id || 0] || 0)).slice(0, 5) || []
    )

    let previousStart = $derived(new Date(periods[period].getTime() - periodDurations[period]))
    let previousEnd = $derived(periods[period])
    let previousEventsInPeriod = $derived(
      data.events?.filter((event: Event) => {
        const d = new Date(event.created_at)
        return d >= previousStart && d < previousEnd
      }) || []
    )
    let previousViews = $derived(
      previousEventsInPeriod.filter((event: Event) => event.type === "product_view")
    )
    let previousWsapp_opens = $derived(
      previousEventsInPeriod.filter((event: Event) => event.type === "wsapp_open")
    )
</script>




<h1>Vue d'ensemble</h1>

{#if data.isPremium}
  <h2>Bienvenue dans votre tableau de bord !</h2>

  <div class="bg-card p-4 rounded-lg">
    <label for="period-select">Periode</label>
    <select 
       id="period-select"
       bind:value={period} 
       class="border border-gray-300 rounded-md p-2 bg-back-main"
    >
      <option value="oneDayAgo">Dernier jour</option>
      <option value="sevenDaysAgo">7 derniers jours</option>
      <option value="thirtyDaysAgo">30 derniers jours</option>
      <option value="oneYearAgo">12 derniers mois</option>
    </select>
  </div>

  <section class="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <ChartCard title="Vues de produits" events={views} previousEvents={previousViews} period={period} />
    <ChartCard title="Ouvertures de WhatsApp" events={wsapp_opens} previousEvents={previousWsapp_opens} period={period} />
    <ChartCard title="Taux de conversion" events={wsapp_opens} previousEvents={previousWsapp_opens} period={period} type="rate" denominatorEvents={views} previousDenominatorEvents={previousViews} />
    <TopProductsCard products={topProducts} productViews={productViews} />
  </section>
{:else}
   <p class="text-primary">
    Fonctionnalité Premium
   </p>
  <div 
    class="w-full h-[50svh] flex flex-col justify-center items-center gap-4"
  >
    <h2 class="text-xl font-bold">🔒 Votre vue d’ensemble est bloquée</h2>
    <h2>C'est ici que vous trouviez toutes les informations concernant votre boutique. </h2>
    <a href="https://wa.me/781878234?text=Salut, j'aimerais réactiviter les fonctionnalités Premium pour ma boutique">
      <Button label="Recuperer l'accés Premium" />
    </a>
  </div>
{/if}
