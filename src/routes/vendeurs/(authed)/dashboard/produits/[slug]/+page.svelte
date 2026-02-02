<script lang="ts">
  import ChartCard from "$lib/components/ChartCard.svelte"
  import Button from "$lib/components/Button.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import OrderCard from "$lib/components/OrderCard.svelte"
  import OrdersTable from "$lib/components/OrdersTable.svelte"
  import { useAnalytics } from "$lib/composables/useAnalytics.svelte"
  import type { Event, Article } from "$lib/types"
  import SuggestionCard from "$lib/components/SuggestionCard.svelte"
	import { goto } from "$app/navigation";
  import { useToast } from "$lib/composables/useToast"

  const { data } : {
    data: {
      productEvents: Event[],
      product: Article,
      productOrders: any[],
      isPremium: boolean
    }
  } = $props()

  let deleteModalIsOpen = $state(false)
  const toast = useToast()

  let period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo" = $state("oneDayAgo")

  const analytics = $derived(useAnalytics(data.productEvents || [], [], period, data.productOrders || []))

  const format = (n: any) => n.toLocaleString('fr-FR');

  // Top hours
  const topHours = $derived(() => {
    const hourCounts: { [hour: number]: number } = {}
    analytics.views.forEach((event: Event) => {
      const hour = new Date(event.created_at).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    return Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
  })

  // Estimated revenue (price * cart adds, assuming each add leads to sale)
  const estimatedRevenue = $derived(parseInt(data.product.price.replace(".", "")) * analytics.addToCart.length)

  // Suggestions
  const suggestions = $derived(() => {
    const totalViews = analytics.views.length
    const totalCartAdds = analytics.addToCart.length
    const conversionRate = totalViews > 0 ? (totalCartAdds / totalViews) * 100 : 0
    const suggestions = []

    if (conversionRate < 5) {
      suggestions.push({
        title: "Taux de conversion faible",
        description: "Votre taux de conversion est inférieur à 5%. Cela signifie que peu de visiteurs intéressés par votre produit passent à l'action. Améliorez la qualité de vos photos, rédigez une description plus détaillée et attrayante, ou ajustez le prix pour attirer plus d'acheteurs.",
        action: { text: "Modifier le produit", href: `/vendeurs/dashboard/produits/${data.product.slug}` },
        type: "urgent"
      })
    } else if (conversionRate < 10) {
      suggestions.push({
        title: "Taux de conversion moyen",
        description: "Votre taux de conversion est correct mais peut être amélioré. Ajoutez des témoignages clients, des vidéos de démonstration ou proposez des offres spéciales pour booster les ventes.",
        action: { text: "Ajouter des témoignages", href: `/vendeurs/dashboard/produits/${data.product.slug}` },
        type: "normal"
      })
    } else {
      suggestions.push({
        title: "Excellent taux de conversion !",
        description: "Félicitations ! Votre taux de conversion est supérieur à 10%. Continuez à maintenir la qualité de vos produits et descriptions pour garder ce niveau de performance.",
        action: { text: "Voir les statistiques", href: "#" },
        type: "positive"
      })
    }

    if (totalViews < 10) {
      suggestions.push({
        title: "Faibles vues du produit",
        description: "Votre produit reçoit peu de visites. Partagez-le sur les réseaux sociaux, optimisez le référencement avec des mots-clés pertinents, ou créez des campagnes publicitaires ciblées.",
        action: { text: "Partager le produit", href: `/vendeurs/dashboard/produits/${data.product.slug}` },
        type: "urgent"
      })
    }

    if (topHours().length > 0) {
      const bestHour = topHours()[0].hour
      suggestions.push({
        title: "Optimisez vos horaires de publication",
        description: `Vos produits sont le plus consultés vers ${bestHour}h. Planifiez vos publications et promotions autour de cette heure pour maximiser la visibilité.`,
        action: { text: "Planifier une publication", href: "/vendeurs/dashboard" },
        type: "normal"
      })
    }

    if (estimatedRevenue < 10000) {
      suggestions.push({
        title: "Revenus estimés faibles",
        description: "Basé sur vos ajouts au panier, vos revenus estimés sont inférieurs à 10 000 FCFA pour cette période. Envisagez de réduire le prix, d'offrir des promotions ou d'augmenter la visibilité du produit.",
        action: { text: "Ajuster le prix", href: `/vendeurs/dashboard/produits/${data.product.slug}` },
        type: "urgent"
      })
    }

    return suggestions
  })

  const deleteProduct = async (e: any) => {
      e.preventDefault()
      const form = new FormData()
       form.append("productId", data?.product?.id as string)
      try {
         const res = await fetch("/vendeurs/dashboard/api/delete", {
               method: "DELETE",
               body: form
       })
      } catch (err) {
        toast.show("Erreur lors de la suppression",  "error", 5000)
      }
      deleteModalIsOpen = false
      goto("/vendeurs/dashboard/produits?reload=true")
      toast.show("Produit Supprimé", "success", 5000)
   }

   const share = async (e: any) => {
        const {target} = e
            if (navigator.share) {
                try {
                   await navigator.share({
                      title: data.product.title || document.title,
                      text: data.product.description || "Achetez maintenant !",
                      url: `https://dimarket.biz/products/${data.product.slug}`,
                  });
              } catch (err) {
                  console.log("Error sharing:", err);
             }
         } else {
             // fallback (copy link)
              navigator.clipboard.writeText(window.location.href);
              target.innerHTML = "URL copier!"
          }
  };
</script>

<h1>{data.product.title}</h1>

 <section class="my-8">
   <h2 class="text-2xl mb-4">Gestion</h2>
    <div class="bg-card w-full rounded-lg p-4 flex gap-4 flex flex-wrap justify-center">

      <a href="/vendeurs/dashboard/produits/modifier?slug={data.product.slug}">
        <Button variant="neutral">Modifier</Button>
      </a>

      <a href="/vendeurs/dashboard/produits/reduction/?product_id={data.product.id}">
        <Button>Faire une reduction</Button>
      </a>

      <Button 
        onclick={share}
        class="w-full"
        variant="secondary">Partager</Button>
      <Button
         onclick={() => deleteModalIsOpen = true}
         variant="danger">Supprimer</Button>

      <a href="/products/{data.product.slug}">
        <Button>Voir le produit</Button>
      </a>
    </div>
 </section>

 <br>
 <h2 class="text-2xl mb-4 my-12">Performances</h2>
{#if data.isPremium}
  <div class="bg-card p-4 rounded-lg mb-4">
    <label for="period-select">Période</label>
    <select id="period-select" bind:value={period} class="border border-gray-300 rounded-md p-2 bg-back-main ml-2">
      <option value="oneDayAgo">Dernière 24h</option>
      <option value="sevenDaysAgo">7 derniers jours</option>
      <option value="thirtyDaysAgo">30 derniers jours</option>
      <option value="oneYearAgo">12 derniers mois</option>
    </select>
  </div>

  <section class="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ChartCard title="Vues de produits" events={analytics.views} previousEvents={analytics.previousViews} period={period} />
    <ChartCard title="Ajouts au panier" events={analytics.addToCart} previousEvents={analytics.previousAddToCart} period={period} />
    <ChartCard title="Taux de conversion" events={analytics.addToCart} previousEvents={analytics.previousAddToCart} period={period} type="rate" denominatorEvents={analytics.views} previousDenominatorEvents={analytics.previousViews} />
  </section>

  <section class="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    <div class="bg-card p-4 rounded-lg">
      <h3>Top heures de vues</h3>
      <ul>
        {#each topHours() as { hour, count }}
          <li>{hour}h: {count} vues</li>
        {/each}
      </ul>
    </div>

    <div class="bg-card p-4 rounded-lg">
      <h3>Revenus estimés</h3>
      <p class="text-2xl font-bold">{format(estimatedRevenue)} FCFA</p>
      <p class="text-sm text-gray-500">Basé sur {analytics.addToCart.length} ajouts au panier × {data.product.price} FCFA</p>
    </div>

    <OrderCard title="Commandes" ordersCount={analytics.ordersCount} previousOrdersCount={analytics.previousOrdersCount} period={period} orders={analytics.orders} />
  </section>

  <div class="bg-card p-4 rounded-lg">
    <h3 class="text-xl font-bold mb-4">Suggestions d'amélioration</h3>
    <div class="space-y-4">
      {#each suggestions() as suggestion}
        <SuggestionCard
           title={suggestion.title}
           description={suggestion.description}
           type={suggestion.type}
        >
          <a href={suggestion.action.href} class="inline-block">
            <Button variant={suggestion.type === 'urgent' ? 'neutral' : suggestion.type === 'positive' ? 'primary' : 'neutral'}>
              {suggestion.action.text}
            </Button>
          </a>
        </SuggestionCard>
      {/each}
    </div>
  </div>

  {#if analytics.orders && analytics.orders.length > 0}
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Commandes de ce produit</h2>
      <OrdersTable orders={analytics.orders} />
    </div>
  {/if}
{:else}
  <p class="text-primary">Fonctionnalité Premium</p>
  <div class="w-full my-8 flex flex-col justify-center items-center gap-4">
    <h2 class="text-xl font-bold text-center">🔒 Analyse de performances bloqué</h2>
    <h2 class="text-center">Vous avez perdu l'accés à cette fonctionnalité. Les données sur les performances sont dédiés aux vendeurs proffessionnels.</h2>
    <a href="https://wa.me/781878234?text=Bonjour, j'aimerais avoir des information sur l'offre premium de DiMarket">
      <Button>Je suis proffessionnel</Button>
    </a>
  </div>
{/if}

<Modal 
  open={deleteModalIsOpen} 
  close={() => deleteModalIsOpen = false}
  onSubmit={deleteProduct}
  >
  <p>Êtes vous sure de vouloir supprimer "<span class="font-bold">{data.product.title}</span>"</p>
</Modal>
