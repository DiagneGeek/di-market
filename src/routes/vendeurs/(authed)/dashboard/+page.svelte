<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import ChartCard from "$lib/components/ChartCard.svelte"
    import TopProductsCard from "$lib/components/TopProductsCard.svelte"
    import OrderCard from "$lib/components/OrderCard.svelte"
    import OrdersTable from "$lib/components/OrdersTable.svelte"
    import { useAnalytics } from "$lib/composables/useAnalytics.svelte"
	import { useToast } from "$lib/composables/useToast.js";

    const {data} = $props()

    let period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo" = $state("oneDayAgo")
    
    const analytics = $derived(useAnalytics(data.events, data.products, period, (data.orders || []) as any))
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
    <ChartCard title="Vues de produits" events={analytics.views} previousEvents={analytics.previousViews} period={period} />
    <ChartCard title="Ajouts au panier" events={analytics.addToCart} previousEvents={analytics.previousAddToCart} period={period} />
    <ChartCard title="Taux de conversion" events={analytics.addToCart} previousEvents={analytics.previousAddToCart} period={period} type="rate" denominatorEvents={analytics.views} previousDenominatorEvents={analytics.previousViews} />
    <OrderCard title="Commandes" ordersCount={analytics.ordersCount} previousOrdersCount={analytics.previousOrdersCount} period={period} orders={analytics.orders} />
  </section>

  <section class="my-8">
    <TopProductsCard products={analytics.topProducts} productViews={analytics.productViews} />
  </section>

  {#if analytics.orders && analytics.orders.length > 0}
    <section class="my-8">
      <h2 class="text-2xl font-bold mb-4">Dernières commandes</h2>
      <OrdersTable orders={analytics.orders} />
    </section>
  {/if}
{:else}
   <p class="text-primary">
    Fonctionnalité Premium
   </p>
<div 
    class="w-full h-[50svh] flex flex-col justify-center items-center gap-4"
  >
    <h2 class="text-xl text-center font-bold">Ne perdez pas votre votre devance !</h2>
    <h2 class="text-center">Votre Accés a été révoqué, recuperez le pour continuer à voir plus claire sur vos produit et gagner du temps</h2>
    <a href="https://wa.me/781878234?text=Salut, je voudrais recupérer mes avantages sur DiMarket que je vient de perdre !">
      <Button label="Recuperer mes avantages" />
    </a>
  </div>
{/if}
