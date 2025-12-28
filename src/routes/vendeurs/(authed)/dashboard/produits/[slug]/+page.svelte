<script lang="ts">
  import ChartCard from "$lib/components/ChartCard.svelte"
  import Button from "$lib/components/Button.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import { getDates } from "$lib/composables/getDates"
  import type { Event } from "$lib/types"
  import SuggestionCard from "$lib/components/SuggestionCard.svelte"
	import { goto } from "$app/navigation";
  import { useToast } from "$lib/composables/useToast"

  const { data } = $props()

  const periods = getDates()
  let deleteModalIsOpen = $state(false)
  const toast = useToast()

  const periodDurations = {
    oneDayAgo: 1 * 24 * 60 * 60 * 1000,
    sevenDaysAgo: 7 * 24 * 60 * 60 * 1000,
    thirtyDaysAgo: 30 * 24 * 60 * 60 * 1000,
    oneYearAgo: 365 * 24 * 60 * 60 * 1000,
  }

  let period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo" = $state("oneDayAgo")

  const eventsInThisPeriod = $derived(
    data.productEvents?.filter((event: Event) => new Date(event.created_at) >= new Date(periods[period])) || []
  )

  let views = $derived(
    eventsInThisPeriod.filter((event: Event) => event.type === "product_view")
  )
  let wsapp_opens = $derived(
    eventsInThisPeriod.filter((event: Event) => event.type === "wsapp_open")
  )

  let previousStart = $derived(new Date(periods[period].getTime() - periodDurations[period]))
  let previousEnd = $derived(periods[period])
  let previousEventsInPeriod = $derived(
    data.productEvents?.filter((event: Event) => {
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

  const format = (n: any) => n.toLocaleString('fr-FR');

  // Top hours
  const topHours = $derived(() => {
    const hourCounts: { [hour: number]: number } = {}
    views.forEach((event: Event) => {
      const hour = new Date(event.created_at).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    return Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
  })

  // Estimated revenue (price * opens, assuming each open leads to sale)
  const estimatedRevenue = $derived(parseInt(data.product.price.replace(".", "")) * wsapp_opens.length)

  // Suggestions
  const suggestions = $derived(() => {
    const totalViews = views.length
    const totalOpens = wsapp_opens.length
    const conversionRate = totalViews > 0 ? (totalOpens / totalViews) * 100 : 0
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
        description: "Basé sur vos ouvertures WhatsApp, vos revenus estimés sont inférieurs à 10 000 FCFA pour cette période. Envisagez de réduire le prix, d'offrir des promotions ou d'augmenter la visibilité du produit.",
        action: { text: "Ajuster le prix", href: `/vendeurs/dashboard/produits/${data.product.slug}` },
        type: "urgent"
      })
    }

    return suggestions
  })

  const deleteProduct = async (e: any) => {
      e.preventDefault()
      const form = new FormData()
       form.append("productId", data?.product?.id)
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


{#if data.isPremium}
 <h2 class="text-2xl mb-4 my-12">Performances</h2>
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
    <ChartCard title="Vues de produits" events={views} previousEvents={previousViews} period={period} />
    <ChartCard title="Ouvertures de WhatsApp" events={wsapp_opens} previousEvents={previousWsapp_opens} period={period} />
    <ChartCard title="Taux de conversion" events={wsapp_opens} previousEvents={previousWsapp_opens} period={period} type="rate" denominatorEvents={views} previousDenominatorEvents={previousViews} />
  </section>

  <section class="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <p class="text-sm text-gray-500">Basé sur {wsapp_opens.length} ouvertures WhatsApp × {data.product.price} FCFA</p>
    </div>
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
{:else}
  <p class="text-primary">Fonctionnalité Premium</p>
  <div class="w-full h-[50svh] flex flex-col justify-center items-center gap-4">
    <h2 class="text-xl font-bold">🔒 Analyse de performance bloquée</h2>
    <h2>Cette page détaille les performances de vos produits.</h2>
    <a href="https://wa.me/781878234?text=Bonjour, j'aimerais avoir des information sur l'offre premium de DiMarket">
      <button class="bg-primary text-white px-4 py-2 rounded">Accéder au Premium</button>
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
