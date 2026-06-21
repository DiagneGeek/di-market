<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Select from "$lib/components/Select.svelte";

  export let data: {
    sellers: any[];
    partners: any[];
    buyers: any[];
  };

  const { sellers = [], partners = [], buyers = [] } = data;
  const periodOptions = ["Aujourd'hui", "Cette semaine", "Ce mois"];
  const sortOptions = ["Derniers", "Plus performants"];

  let period = "Aujourd'hui";
  let sellerSort = "Derniers";
  let orderSort = "Derniers";
  let partnerSort = "Derniers";
  let buyerSort = "Derniers";

  const formatDate = (value: any) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
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
    const range = getPeriodRange(choice);
    if (!range || !value) return false;
    const date = new Date(value);
    return date >= range[0] && date <= range[1];
  };

  const getOrderTotal = (order: any) => {
    return (order.Order_Items || []).reduce((sum: number, item: any) => {
      const price = Number(item.price_at_the_time || 0);
      const quantity = Number(item.quantity || 0);
      return sum + price * quantity;
    }, 0);
  };

  const allOrders = buyers.flatMap((buyer: any) => {
    return (buyer.Orders || []).map((order: any) => ({ ...order, buyer }));
  });

  const ordersBySeller = allOrders.reduce((acc: Record<string, any[]>, order: any) => {
    const key = String(order.seller_id || order.sellerId || "");
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
  }, {});

  const sellerRows = sellers.map((seller: any) => {
    const orders = ordersBySeller[String(seller.id)] || [];
    return {
      ...seller,
      productCount: seller.Products?.length || 0,
      orderCount: orders.length,
      totalRevenue: orders.reduce((sum: number, order: any) => sum + getOrderTotal(order), 0),
      createdAtLabel: formatDate(seller.created_at),
      setupLabel: seller.setupping ? "Oui" : "Non"
    };
  });

  const partnerRows = partners.map((partner: any) => {
    const referredSellers = sellers.filter((seller: any) => seller.referred_by === partner.partner_id);
    const paidAffiliates = referredSellers.filter((seller: any) => seller.plan === "PREMIUM" && seller.last_payment != null);
    const affiliateRevenue = referredSellers.reduce((sum: number, seller: any) => {
      const revenue = (ordersBySeller[String(seller.id)] || []).reduce((orderSum, order: any) => orderSum + getOrderTotal(order), 0);
      return sum + revenue;
    }, 0);

    return {
      ...partner,
      createdAtLabel: formatDate(partner.created_at),
      affiliatesCount: referredSellers.length,
      paidAffiliatesCount: paidAffiliates.length,
      affiliateRevenue,
      whatsappLink: `https://wa.me/${String(partner.phone || "").replace(/[^0-9]/g, "")}`
    };
  });

  const buyerRows = buyers.map((buyer: any) => {
    const buyerOrders = buyer.Orders || [];
    const firstOrder = buyerOrders.length
      ? new Date(Math.min(...buyerOrders.map((order: any) => new Date(order.created_at).getTime())))
      : null;
    return {
      ...buyer,
      orderCount: buyerOrders.length,
      totalPaid: buyerOrders.reduce((sum: number, order: any) => sum + getOrderTotal(order), 0),
      firstOrderAt: firstOrder,
      firstOrderLabel: firstOrder ? formatDate(firstOrder) : "-",
      whatsappLink: `https://wa.me/${String(buyer.phone || "").replace(/[^0-9]/g, "")}`
    };
  });

  const newSellerCount = sellerRows.filter((seller) => isInPeriod(seller.created_at, period)).length;
  const affiliateCount = sellerRows.filter((seller) => seller.referred_by != null).length;
  const newAffiliateCount = sellerRows.filter((seller) => seller.referred_by != null && isInPeriod(seller.created_at, period)).length;
  const paidSellerCount = sellerRows.filter((seller) => seller.plan === "PREMIUM" && seller.last_payment != null).length;
  const newPaidSellerCount = sellerRows.filter((seller) => seller.plan === "PREMIUM" && seller.last_payment != null && isInPeriod(seller.created_at, period)).length;
  const buyerCount = buyerRows.length;
  const newBuyerCount = buyerRows.filter((buyer) => buyer.created_at ? isInPeriod(buyer.created_at, period) : buyer.Orders?.some((order: any) => isInPeriod(order.created_at, period))).length;

  const sortRows = (rows: any[], sortBy: string, metricKey: string) => {
    return [...rows].sort((a, b) => {
      if (sortBy === "Derniers") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return (b[metricKey] || 0) - (a[metricKey] || 0);
    });
  };

  const topSellers = sortRows(sellerRows, sellerSort, "totalRevenue").slice(0, 5);
  const latestOrders = sortRows(allOrders.map((order: any) => ({
    ...order,
    total: getOrderTotal(order),
    createdAtLabel: formatDate(order.created_at)
  })), orderSort, "total").slice(0, 5);
  const topPartners = sortRows(partnerRows, partnerSort, "affiliateRevenue").slice(0, 5);
  const topBuyers = sortRows(buyerRows, buyerSort, "totalPaid").slice(0, 5);
</script>

<div class="space-y-10 max-w-full">
  <section class="space-y-4">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-gray-600 max-w-2xl">Vue d'ensemble des vendeurs, affiliés, commandes et acheteurs.</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-3xl border border-gray-200 bg-card p-4">
          <p class="text-xs uppercase tracking-[0.18em] text-gray-500">Période</p>
          <Select
            label=""
            options={periodOptions}
            default={period}
            onchange={(value: string) => { period = value; }}
          />
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Vendeurs actifs</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{sellerRows.length}</p>
        <p class="mt-2 text-sm text-slate-600">+{newSellerCount} sur la période</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Affiliés</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{affiliateCount}</p>
        <p class="mt-2 text-sm text-slate-600">+{newAffiliateCount} sur la période</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Vendeurs payants</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{paidSellerCount}</p>
        <p class="mt-2 text-sm text-slate-600">+{newPaidSellerCount} sur la période</p>
      </div>
      <div class="rounded-[32px] border border-slate-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-500">Acheteurs</p>
        <p class="mt-4 text-4xl font-bold text-slate-900">{buyerCount}</p>
        <p class="mt-2 text-sm text-slate-600">+{newBuyerCount} sur la période</p>
      </div>
    </div>
  </section>

  <section class="grid gap-6 xl:grid-cols-2">
    <div class="rounded-3xl border border-gray-200 bg-card p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Vendeurs</h2>
          <p class="text-sm text-gray-500">Collection, commandes, date de création et état de setup.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Select
            label=""
            options={sortOptions}
            default={sellerSort}
            onchange={(value: string) => { sellerSort = value; }}
          />
          <a href="/where-i-manage/utilisateurs" class="text-sky-600 hover:text-sky-700 font-semibold">Voir tout &gt;</a>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        {#each topSellers as seller}
          <div class="rounded-[32px] border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="font-semibold text-slate-900">{seller.name || "Collection inconnue"}</p>
              <p class="text-sm text-slate-500">Créé le {seller.createdAtLabel} • {seller.setupLabel === "Oui" ? "Setup actif" : "Setup terminé"}</p>
              <p class="mt-2 text-xs text-slate-500">Commandes : {seller.orderCount} • Produits : {seller.productCount}</p>
            </div>
            <div class="flex items-center gap-3">
              <a href={`/where-i-manage/utilisateurs?seller=${seller.id}`}>
                <Button size="sm" variant="primary">plus</Button>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="rounded-3xl border border-gray-200 bg-card p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Dernières commandes</h2>
          <p class="text-sm text-gray-500">Les commandes récentes triées par date ou performance.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Select
            label=""
            options={sortOptions}
            default={orderSort}
            onchange={(value: string) => { orderSort = value; }}
          />
          <a href="/where-i-manage/transactions" class="text-sky-600 hover:text-sky-700 font-semibold">Voir tout &gt;</a>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        {#each latestOrders as order}
          <div class="rounded-[32px] border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="font-semibold text-slate-900">Commande #{order.id}</p>
              <p class="text-sm text-slate-500">Client : {order.buyer?.name || "Inconnu"} • {order.createdAtLabel}</p>
              <p class="mt-2 text-xs text-slate-500">Montant : {formatMoney(order.total)} • Articles : {(order.Order_Items || []).length}</p>
            </div>
            <div>
              <a href={`/where-i-manage/transactions?order=${order.id}`}>
                <Button size="sm" variant="primary">plus</Button>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="grid gap-6 xl:grid-cols-2">
    <div class="rounded-3xl border border-gray-200 bg-card p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Partenaires</h2>
          <p class="text-sm text-gray-500">Performance des partenaires et de leurs affiliés.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Select
            label=""
            options={sortOptions}
            default={partnerSort}
            onchange={(value: string) => { partnerSort = value; }}
          />
          <a href="/where-i-manage/affliers" class="text-sky-600 hover:text-sky-700 font-semibold">Voir tout &gt;</a>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        {#each topPartners as partner}
          <div class="rounded-[32px] border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="font-semibold text-slate-900 truncate">{partner.partner_id || partner.phone}</p>
              <p class="text-sm text-slate-500">Créé le {partner.createdAtLabel}</p>
              <p class="mt-2 text-xs text-slate-500">Affiliés : {partner.affiliatesCount} • Payants : {partner.paidAffiliatesCount}</p>
            </div>
            <div>
              <a href={`/where-i-manage/affliers?partner=${partner.id}`}>
                <Button size="sm" variant="primary">plus</Button>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="rounded-3xl border border-gray-200 bg-card p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold">Acheteurs</h2>
          <p class="text-sm text-gray-500">Premier achat, nombre de commandes et total payé.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Select
            label=""
            options={sortOptions}
            default={buyerSort}
            onchange={(value: string) => { buyerSort = value; }}
          />
          <a href="/where-i-manage/transactions" class="text-sky-600 hover:text-sky-700 font-semibold">Voir tout &gt;</a>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        {#each topBuyers as buyer}
          <div class="rounded-[32px] border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="font-semibold text-slate-900">{buyer.name || "Client inconnu"}</p>
              <p class="text-sm text-slate-500">Premier achat : {buyer.firstOrderLabel}</p>
              <p class="mt-2 text-xs text-gray-500">Commandes : {buyer.orderCount} • Total payé : {formatMoney(buyer.totalPaid)}</p>
            </div>
            <div>
              <a href={`/where-i-manage/transactions?buyer=${buyer.id}`}>
                <Button size="sm" variant="primary">plus</Button>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>
