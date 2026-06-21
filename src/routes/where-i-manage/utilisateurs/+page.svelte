<script lang="ts">
  import AdminShell from "$lib/components/AdminShell.svelte";
  import Select from "$lib/components/Select.svelte";
  import Button from "$lib/components/Button.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import type { User } from "$lib/types";

  export let data: { sellers: User[] };

  const { sellers = [] } = data;
  const periods = ["toute", "Aujourd'hui", "Cette semaine", "Ce mois"];
  const referredOptions = [
    { value: "all", label: "Tous" },
    { value: "referred", label: "Référés seulement" },
    { value: "not_referred", label: "Non référés" }
  ];
  const orderOptions = [
    { value: "newest", label: "Plus récents" },
    { value: "oldest", label: "Plus anciens" },
    { value: "orders", label: "Nombre de commandes" },
    { value: "products", label: "Nombre de produits" }
  ];

  let period = "toute";
  let minOrders = 0;
  let minProducts = 0;
  let referredFilter = "all";
  let orderBy = "newest";
  let orderThreshold = 1;
  let showPlanModal = false;
  let selectedSeller: any = null;
  let planDuration = 1;
  let isSubmittingPlan = false;

  const formatDate = (value: any) => {
    if (!value) return "-";
    const date = new Date(value);
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
  };

  const normalizePhone = (value: any) => {
    if (!value) return "";
    return String(value).replace(/[^0-9+]/g, "");
  };

  const getPeriodRange = (choice: string) => {
    const now = new Date();
    const start = new Date(now);
    if (choice === "Aujourd'hui") {
      start.setHours(0, 0, 0, 0);
      return [start, now];
    }
    if (choice === "Cette semaine") {
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      return [start, now];
    }
    if (choice === "Ce mois") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      return [start, now];
    }
    return null;
  };

  const isInPeriod = (value: any, choice: string) => {
    if (choice === "toute") return true;
    const range = getPeriodRange(choice);
    if (!range) return true;
    const date = new Date(value);
    return date >= range[0] && date <= range[1];
  };

  const calculateSellerStats = (seller: any) => {
    const orders = seller.Orders || [];
    const productsCount = seller.Products?.length || 0;
    const ordersCount = orders.length;
    const buyerCount = new Set(orders.map((order: any) => String(order.buyer_id || ""))).size;
    const firstOrderAt = orders.length
      ? new Date(Math.min(...orders.map((order: any) => new Date(order.created_at).getTime())))
      : null;

    return {
      ...seller,
      productsCount,
      ordersCount,
      buyerCount,
      createdAtLabel: formatDate(seller.created_at),
      firstOrderAtLabel: firstOrderAt ? formatDate(firstOrderAt) : "-",
      whatsappLink: `https://wa.me/${normalizePhone(seller.phone)}`,
      paidSeller: seller.plan === "PREMIUM" && seller.last_payment != null
    };
  };

  $: enrichedSellers = sellers.map(calculateSellerStats);

  $: filteredSellers = enrichedSellers
    .filter((seller) => {
      if (!isInPeriod(seller.created_at, period)) return false;
      if (seller.ordersCount < minOrders) return false;
      if (seller.productsCount < minProducts) return false;
      if (referredFilter === "referred" && !seller.referred_by) return false;
      if (referredFilter === "not_referred" && seller.referred_by) return false;
      return true;
    })
    .sort((a, b) => {
      if (orderBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (orderBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (orderBy === "orders") return b.ordersCount - a.ordersCount;
      if (orderBy === "products") return b.productsCount - a.productsCount;
      return 0;
    });

  $: paidSellersCount = enrichedSellers.filter((seller) => seller.paidSeller).length;
  $: referredSellersCount = enrichedSellers.filter((seller) => !!seller.referred_by).length;
  $: thresholdSellersCount = enrichedSellers.filter((seller) => seller.ordersCount >= orderThreshold).length;

  const resetFilters = () => {
    period = "toute";
    minOrders = 0;
    minProducts = 0;
    referredFilter = "all";
    orderBy = "newest";
    orderThreshold = 1;
  };

  const openPlanModal = (seller: any) => {
    selectedSeller = seller;
    planDuration = 1;
    showPlanModal = true;
  };

  const closePlanModal = () => {
    showPlanModal = false;
    selectedSeller = null;
    planDuration = 1;
  };

  const handlePlanSubmit = async (e: Event) => {
    if (!selectedSeller) return "reject";

    isSubmittingPlan = true;
    const formData = new FormData();
    formData.append("sellerId", selectedSeller.id);
    formData.append("months", String(planDuration));

    try {
      const response = await fetch("?/changePlan", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      if (result.data?.success) {
        closePlanModal();
        // Reload the page to show updated data
        window.location.reload();
        return;
      }
      return "reject";
    } catch (error) {
      console.error("Error updating plan:", error);
      return "reject";
    } finally {
      isSubmittingPlan = false;
    }
  };
</script>

<AdminShell active="utilisateurs">
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Utilisateurs</h1>
      <p class="text-gray-600 max-w-2xl">Trouve rapidement vos vendeurs, filtre par date, nombre de commandes, produits, et référents.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Total vendeurs</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{enrichedSellers.length}</p>
        <p class="mt-2 text-sm text-slate-600">Vue globale du réseau marchand</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Vendeurs payants</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{paidSellersCount}</p>
        <p class="mt-2 text-sm text-slate-600">Utilisateurs premium</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Vendeurs référés</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{referredSellersCount}</p>
        <p class="mt-2 text-sm text-slate-600">Provenance par affiliation</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Avec au moins</p>
            <p class="mt-3 text-4xl font-bold text-slate-900">{thresholdSellersCount}</p>
          </div>
          <div class="min-w-[84px]">
            <Select
              label="Commandes"
              options={["1", "2", "3"]}
              default={String(orderThreshold)}
              onchange={(value: string) => { orderThreshold = Number(value); }}
            />
          </div>
        </div>
      </div>
    </div>

    <section class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 shadow-sm">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Filtres avancés</h2>
          <p class="text-sm text-slate-500">Affinez le tableau en temps réel.</p>
        </div>
        <Button variant="primary" on:click={resetFilters}>Réinitialiser</Button>
      </div>

      <div class="grid gap-4 mt-6 sm:grid-cols-2 xl:grid-cols-4">
        <Select
          label="Date de création"
          options={periods}
          default={period}
          onchange={(value: string) => (period = value)}
        />
        <div>
          <span class="text-xs font-semi-bold text-gray">Commandes min.</span>
          <input
            type="number"
            min="0"
            value={minOrders}
            oninput={(e: Event) => { minOrders = Number((e.target as HTMLInputElement).value); }}
            class="mt-2 w-full p-2 rounded-xl bg-input border border-gray-300"
          />
        </div>
        <div>
          <span class="text-xs font-semi-bold text-gray">Produits min.</span>
          <input
            type="number"
            min="0"
            value={minProducts}
            oninput={(e: Event) => { minProducts = Number((e.target as HTMLInputElement).value); }}
            class="mt-2 w-full p-2 rounded-xl bg-input border border-gray-300"
          />
        </div>
        <Select
          label="Référé"
          options={referredOptions.map((option) => option.label)}
          default={referredOptions.find((option) => option.value === referredFilter)?.label || "Tous"}
          onchange={(value: string) => {
            const match = referredOptions.find((option) => option.label === value);
            referredFilter = match?.value || "all";
          }}
        />
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Select
          label="Trier par"
          options={orderOptions.map((option) => option.label)}
          default={orderOptions.find((option) => option.value === orderBy)?.label || "Plus récents"}
          onchange={(value: string) => {
            const match = orderOptions.find((option) => option.label === value);
            orderBy = match?.value || "newest";
          }}
        />
        <div class="col-span-2 text-sm text-gray-500">
          <p class="font-semibold">Conseil :</p>
          <p>Utilisez les filtres pour trouver un vendeur référé, un vendeur très actif ou un vendeur qui vient de rejoindre la plateforme.</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Liste des vendeurs</h2>
          <p class="text-sm text-gray-500">{filteredSellers.length} vendeur{filteredSellers.length > 1 ? "s" : ""} correspond{filteredSellers.length > 1 ? "ent" : ""} aux critères.</p>
        </div>
      </div>

      <div class="grid gap-4">
        {#if filteredSellers.length > 0}
          {#each filteredSellers as seller (seller.id)}
            <div class="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="text-base font-semibold text-slate-900">{seller.name}</p>
                <p class="mt-1 text-sm text-slate-500">Depuis le {seller.createdAtLabel} • {seller.paidSeller ? "PREMIUM" : "FREE"} • Setup: {seller.setupping ? "Oui" : "Non"}</p>
                <div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Commandes : {seller.ordersCount}</span>
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Produits : {seller.productsCount}</span>
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Acheteurs : {seller.buyerCount}</span>
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Référé : {seller.referred_by ? "Oui" : "Non"}</span>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:items-end">
                <a href={seller.whatsappLink} target="_blank" rel="noreferrer" class="text-sky-600 text-sm font-semibold hover:underline">WhatsApp</a>
                <div class="flex gap-2 w-full sm:w-auto">
                  <Button size="sm" variant="secondary" onclick={() => openPlanModal(seller)}>Plan</Button>
                  <a href={`/collections/${seller.id}`} class="flex-1 sm:flex-none">
                    <Button size="sm" variant="primary">Voir</Button>
                  </a>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div class="rounded-3xl border border-dashed border-gray-300 bg-back-main p-10 text-center text-gray-500">
            Aucun vendeur ne correspond à ces filtres.
          </div>
        {/if}
      </div>
    </section>
  </div>
</AdminShell>

{#if showPlanModal && selectedSeller}
  <Modal open={showPlanModal} close={closePlanModal} onSubmit={handlePlanSubmit} btnLabel="Valider">
    <div class="space-y-4 w-full">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Changer le plan</h2>
        <p class="mt-2 text-slate-600">Passer {selectedSeller.name} en PREMIUM</p>
      </div>

      <div class="rounded-lg bg-slate-50 p-4 border border-slate-200">
        <p class="text-sm font-semibold text-slate-700">Vendeur actuel</p>
        <p class="mt-2 text-lg text-slate-900">{selectedSeller.name}</p>
        <p class="mt-1 text-sm text-slate-600">Plan actuel: {selectedSeller.paidSeller ? "PREMIUM" : "FREE"}</p>
      </div>

      <div>
        <label for="duration" class="block text-sm font-semibold text-slate-700 mb-2">
          Durée du plan premium (mois)
        </label>
        <div class="flex gap-3 items-center">
          <select
            id="duration"
            bind:value={planDuration}
            class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          >
            <option value="1">1 mois</option>
            <option value="3">3 mois</option>
            <option value="6">6 mois</option>
            <option value="12">12 mois</option>
          </select>
        </div>
        <p class="mt-2 text-xs text-slate-500">Le vendeur aura accès à toutes les fonctionnalités premium pour la durée sélectionnée.</p>
      </div>

      <div class="rounded-lg bg-sky-50 p-4 border border-sky-200">
        <p class="text-sm text-sky-900">
          <span class="font-semibold">À partir d'aujourd'hui:</span> {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p class="text-sm text-sky-900 mt-1">
          <span class="font-semibold">Jusqu'au:</span> {new Date(Date.now() + planDuration * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  </Modal>
{/if}
