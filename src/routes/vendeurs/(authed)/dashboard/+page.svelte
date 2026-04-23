<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import ChartCard from "$lib/components/ChartCard.svelte"
    import TopProductsCard from "$lib/components/TopProductsCard.svelte"
    import OrderCard from "$lib/components/OrderCard.svelte"
    import OrdersTable from "$lib/components/OrdersTable.svelte"
    import ShareCollectionCard from "$lib/components/ShareCollectionCard.svelte"
    import { useAnalytics } from "$lib/composables/useAnalytics.svelte"
    import { useToast } from "$lib/composables/useToast.js";
    import { page } from "$app/state"
    import { goto } from "$app/navigation"
    import Modal from "$lib/components/Modal.svelte"

    const {data} = $props()

    let period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo" = $state("oneDayAgo")
    
    const analytics = $derived(useAnalytics(data.events, data.products, period, (data.orders || []) as any))
    const isnew = page.url.searchParams.get("isnew") === "true"
    let demoOrderModalOpen = $state(false)
    if (isnew) {
      setTimeout(() => {
        demoOrderModalOpen = true
      }, 2000)
    }
</script>

<h1>Accueil</h1>
{#if data.isPremium}
  <h2>Bienvenue dans votre tableau de bord !</h2>
  
  <div class="my-6">
    <ShareCollectionCard 
      sellerId={data.user.id}
      sellerName={data.user.name}
      productCount={data.products?.length || 0}
      compact={true}
    />
  </div>

  <div class="bg-card p-4 rounded-lg my-4">
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
<div 
    class="w-full h-[50svh] flex flex-col justify-center items-center gap-4"
  >
    <h2 class="text-xl text-center font-bold">Votre essai est terminé !</h2>
    <h2 class="text-center">Ça fait déjà 1 mois que vous avez decider de changer votre manière de vendre 🥳<br> Voulez vous continuer à utiliser notre service ?</h2>
    <a href="https://wa.me/781878234?text=Salut, je viens de terminer mon essaie gratuit ! On peut en discuter ?">
      <Button label="Je continue" />
    </a>
  </div>
{/if}

<Modal 
  open={demoOrderModalOpen}
  close={() => demoOrderModalOpen = false}
  btnLabel="Voir la commande"
  onSubmit={() => goto("/vendeurs/dashboard/commandes")}
 >
 <p class="text-center my-2 text-xl">🔔 Amadou vient de commander (Démonstration) 👀</p>
 <p>Découvrez comment vos futurs commandes seront organisées avec DiMarket</p>
</Modal>
