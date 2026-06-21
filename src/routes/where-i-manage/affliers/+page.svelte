<script lang="ts">
  import AdminShell from "$lib/components/AdminShell.svelte";
  import Select from "$lib/components/Select.svelte";
  import Button from "$lib/components/Button.svelte";
  import type { Partner } from "$lib/types";

  export let data: { partners: Partner[]; sellers: any[] };

  const { partners = [], sellers = [] } = data;
  const periods = ["toute", "Aujourd'hui", "Cette semaine", "Ce mois"];
  const orderOptions = [
    { value: "newest", label: "Plus récents" },
    { value: "oldest", label: "Plus anciens" },
    { value: "affiliates", label: "Nombre d'affiliés" },
    { value: "paidAffiliates", label: "Affiliés payants" }
  ];

  let period = "toute";
  let minAffiliates = 0;
  let minPaidAffiliates = 0;
  let orderBy = "newest";
  let affiliateThreshold = 1;

  const formatDate = (value: any) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
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

  const buildPartnerStats = (partner: any) => {
    const referredSellers = sellers.filter((seller) => seller.referred_by === partner.partner_id);
    const paidAffiliatesCount = referredSellers.filter((seller) => seller.plan === "PREMIUM" && seller.last_payment != null).length;

    return {
      ...partner,
      createdAtLabel: formatDate(partner.created_at),
      affiliatesCount: referredSellers.length,
      paidAffiliatesCount,
      whatsappLink: `https://wa.me/${normalizePhone(partner.phone)}`
    };
  };

  $: enrichedPartners = partners.map(buildPartnerStats);

  $: filteredPartners = enrichedPartners
    .filter((partner) => {
      if (!isInPeriod(partner.created_at, period)) return false;
      if (partner.affiliatesCount < minAffiliates) return false;
      if (partner.paidAffiliatesCount < minPaidAffiliates) return false;
      return true;
    })
    .sort((a, b) => {
      if (orderBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (orderBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (orderBy === "affiliates") return b.affiliatesCount - a.affiliatesCount;
      if (orderBy === "paidAffiliates") return b.paidAffiliatesCount - a.paidAffiliatesCount;
      return 0;
    });

  $: partnersWithAffiliatesCount = enrichedPartners.filter((partner) => partner.affiliatesCount > 0).length;
  $: partnersWithPaidAffiliatesCount = enrichedPartners.filter((partner) => partner.paidAffiliatesCount > 0).length;
  $: thresholdPartnerCount = enrichedPartners.filter((partner) => partner.affiliatesCount >= affiliateThreshold).length;

  const resetFilters = () => {
    period = "toute";
    minAffiliates = 0;
    minPaidAffiliates = 0;
    orderBy = "newest";
    affiliateThreshold = 1;
  };
</script>

<AdminShell active="affliers">
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">Affliers</h1>
      <p class="text-gray-600 max-w-2xl">Suivez les partenaires, leurs affiliés et leurs affiliés payants en un coup d'œil.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Total partenaires</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{enrichedPartners.length}</p>
        <p class="mt-2 text-sm text-slate-600">Vue générale des affiliés</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Avec affiliés</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{partnersWithAffiliatesCount}</p>
        <p class="mt-2 text-sm text-slate-600">Partenaires actifs</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Affiliés payants</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{partnersWithPaidAffiliatesCount}</p>
        <p class="mt-2 text-sm text-slate-600">Conversion premium</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Avec au moins</p>
            <p class="mt-3 text-4xl font-bold text-slate-900">{thresholdPartnerCount}</p>
          </div>
          <div class="min-w-[84px]">
            <Select
              label="Affiliés"
              options={["1", "2", "3"]}
              default={String(affiliateThreshold)}
              onchange={(value: string) => { affiliateThreshold = Number(value); }}
            />
          </div>
        </div>
      </div>
    </div>

    <section class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 shadow-sm">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Filtres affliés</h2>
          <p class="text-sm text-slate-500">Filtrez et triez les partenaires actifs.</p>
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
          <span class="text-xs font-semi-bold text-gray">Affiliés min.</span>
          <input
            type="number"
            min="0"
            value={minAffiliates}
            oninput={(e: Event) => { minAffiliates = Number((e.target as HTMLInputElement).value); }}
            class="mt-2 w-full p-2 rounded-xl bg-input border border-gray-300"
          />
        </div>
        <div>
          <span class="text-xs font-semi-bold text-gray">Affiliés payants min.</span>
          <input
            type="number"
            min="0"
            value={minPaidAffiliates}
            oninput={(e: Event) => { minPaidAffiliates = Number((e.target as HTMLInputElement).value); }}
            class="mt-2 w-full p-2 rounded-xl bg-input border border-gray-300"
          />
        </div>
        <Select
          label="Trier par"
          options={orderOptions.map((option) => option.label)}
          default={orderOptions.find((option) => option.value === orderBy)?.label || "Plus récents"}
          onchange={(value: string) => {
            const match = orderOptions.find((option) => option.label === value);
            orderBy = match?.value || "newest";
          }}
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Liste des partenaires</h2>
          <p class="text-sm text-gray-500">{filteredPartners.length} partenaire{filteredPartners.length > 1 ? "s" : ""} trouvés.</p>
        </div>
      </div>

      <div class="grid gap-4">
        {#if filteredPartners.length > 0}
          {#each filteredPartners as partner (partner.id)}
            <div class="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="text-base font-semibold text-slate-900">{partner.partner_id || partner.phone}</p>
                <p class="mt-1 text-sm text-slate-500">Depuis le {partner.createdAtLabel}</p>
                <div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Affiliés : {partner.affiliatesCount}</span>
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Payants : {partner.paidAffiliatesCount}</span>
                  <span class="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Téléphone : {partner.phone}</span>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:items-end">
                <a href={partner.whatsappLink} target="_blank" rel="noreferrer" class="text-sky-600 text-sm font-semibold hover:underline">WhatsApp</a>
                <a href={`/where-i-manage/affliers?partner=${partner.id}`} class="w-full sm:w-auto">
                  <Button size="sm" variant="primary">plus</Button>
                </a>
              </div>
            </div>
          {/each}
        {:else}
          <div class="rounded-3xl border border-dashed border-gray-300 bg-back-main p-10 text-center text-gray-500">
            Aucun partenaire ne correspond aux filtres.
          </div>
        {/if}
      </div>
    </section>
  </div>
</AdminShell>
