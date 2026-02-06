<script lang="ts">
  import OrdersManagement from "$lib/components/OrdersManagement.svelte"
  import Select from "$lib/components/Select.svelte"
  import { enhance } from "$app/forms"

  const { data } = $props()

  let searchTerm = $state("")
  let statusFilter = $state("Tous")

  const statuses = [
    "Tous",
    "En attente",
    "Confirmée",
    "En cours",
    "Livrée",
    "Annulée"
  ]

  const filteredOrders = $derived.by(() => {
    let filtered = data.orders || []

    // Filter by status
    if (statusFilter !== "Tous") {
      filtered = filtered.filter((order: any) => order.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((order: any) => 
        order.id?.toString().includes(term) ||
        order.buyer?.name?.toLowerCase().includes(term) ||
        order.buyer?.phone?.toString().includes(term) ||
        order.address?.toLowerCase().includes(term)
      )
    }

    return filtered
  })

  const stats = $derived.by(() => {
    const orders = data.orders || []
    return {
      total: orders.length,
      pending: orders.filter((o: any) => o.status === "En attente").length,
      confirmed: orders.filter((o: any) => o.status === "Confirmée").length,
      inProgress: orders.filter((o: any) => o.status === "En cours").length,
      delivered: orders.filter((o: any) => o.status === "Livrée").length,
      cancelled: orders.filter((o: any) => o.status === "Annulée").length
    }
  })
</script>


<h1>Commandes</h1>

{#if data.isPremium}
<div class="my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-gray-600 font-semibold">TOTAL</p>
    <p class="text-2xl font-bold text-primary mt-1">{stats.total}</p>
  </div>
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-yellow-600 font-semibold">EN ATTENTE</p>
    <p class="text-2xl font-bold text-yellow-800 mt-1">{stats.pending}</p>
  </div>
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-purple-600 font-semibold">CONFIRMÉES</p>
    <p class="text-2xl font-bold text-purple-900 mt-1">{stats.confirmed}</p>
  </div>
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-sky-800 font-semibold">EN COURS</p>
    <p class="text-2xl font-bold text-sky-950 mt-1">{stats.inProgress}</p>
  </div>
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-emerald-600 font-semibold">LIVRÉES</p>
    <p class="text-2xl font-bold text-emerald-600 mt-1">{stats.delivered}</p>
  </div>
  <div class="bg-card p-4 rounded-lg border border-gray-200">
    <p class="text-xs text-red-600 font-semibold">ANNULÉES</p>
    <p class="text-2xl font-bold text-red-800 mt-1">{stats.cancelled}</p>
  </div>
</div>

<div class="my-6 flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
  <div class="flex-1">
    <label for="search" class="block text-xs font-semibold text-gray-600 mb-1">RECHERCHER</label>
    <input
      id="search"
      bind:value={searchTerm}
      type="text"
      placeholder="ID, client, téléphone ou adresse..."
      class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
    />
  </div>
  
  <div class="flex flex-col">
    <label for="status-select" class="text-xs font-semibold text-gray-600 mb-1">STATUT</label>
    <select 
      id="status-select"
      bind:value={statusFilter}
      class="border border-gray-300 rounded-lg px-4 py-2 bg-white"
    >
      {#each statuses as status}
        <option value={status}>{status}</option>
      {/each}
    </select>
  </div>
</div>

<div class="my-6">
  <OrdersManagement orders={filteredOrders} />
</div>
{:else}
 <div class="my-8 flex flex-col items-center gap-4">
   <h2 class="text-xl font-bold text-center">Vous êtes entreint de rater les commandes d'aujourd'hui 😩</h2>
   <p class="text-gray-600 text-center">Vous avez perdu accés au commandes de vos clients. Reactiver votre collection proffessionnel pour accéder à vos commandes</p>
   <a href="https://wa.me/781878234?text=Salut, je voudrais recuperer mes avantages sur DiMarket que je vient de perdre !" class="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
     Recuperer mes commandes
   </a>
 </div>
 {/if}