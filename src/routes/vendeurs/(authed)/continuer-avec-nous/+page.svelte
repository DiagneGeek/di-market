<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/components/Button.svelte";
  import { onMount } from "svelte";

  const {data} = $props()

  // Trial stats - in a real app, these would come from your backend
  let stats = {
    collections: 0,
    products: data.products.length,
    orders: data.orders.length,
    timeSaved: data.orders.length * 0.5,
    revenue: (data.orders as any).reduce((sum: number, order: any) => sum + order.Order_Items.reduce((sum: number, item: any) => sum + (item.price_at_the_time * item.quantity), 0), 0)
  };

  let expandedMetric = $state<string | null>(null);
  let showPricing = $state(false);
  let animateIn = $state(false);

  const metrics = [
    {
      id: "products",
      label: "Produits ajoutés",
      icon: "🛍️",
      detail: "Chaque produit ajouté, c'est une perte de temps économisée à répondre \"Est-ce que vous avez...?\"",
      stat: "products"
    },
    {
      id: "orders",
      label: "Commandes reçues",
      icon: "📊",
      detail: "Des commandes claires et structurées au lieu de messages confus. Votre qualité de service s'est améliorée.",
      stat: "orders"
    },
    {
      id: "timeSaved",
      label: "Heures économisées",
      icon: "⏱️",
      detail: "C'est du temps regagné pour développer votre business, pas pour gérer les messages.",
      stat: "timeSaved"
    }
  ];

  const fomoPoints = [
    {
      icon: "⚡",
      danger: "Revenir à la gestion manuelle",
      description: "Plus de messages confus, de commandes perdues, de clients qui demandent si le produit est disponible."
    },
    {
      icon: "📉",
      danger: "Perte de professionnalisme",
      description: "Vous avez montré à vos clients une façon meilleure de faire. Revenir en arrière? C'est perdre leur confiance."
    },
    {
      icon: "💸",
      danger: "Plus de commandes ratées",
      description: "Vous avez vu à quel point les commandes structurées augmentent la clarté. Sans ça, vous perdrez des ventes."
    },
    {
      icon: "😤",
      danger: "Retour au stress quotidien",
      description: "Vous aviez trouvé votre respiration. Voulez-vous vraiment revenir à l'chaos?"
    }
  ];

  onMount(() => {
    animateIn = true;
    // Simulate fetching real data from your backend
    // In production: const data = await fetchTrialMetrics(userId
  });

  function toggleMetric(id: string) {
    expandedMetric = expandedMetric === id ? null : id;
  }

  const message = `Salut cheikh, mon essai gratuit vient d'expirer. Je souhaite continuer à vendre avec DiMarket. Merci de me dire comment procéder.`;
</script>

<svelte:head>
  <title>Continuer avec DiMarket - Votre essai est terminé</title>
  <meta name="description" content="Continuez votre voyage avec DiMarket. Votre essai gratuit a pris fin." />
  <link rel="canonical" href="https://dimarket.biz/vendeurs/continuer-avec-nous">
</svelte:head>

<div class="min-h-screen bg-back-main">
  <!-- HERO: What You've Accomplished -->
  <Hero>
    <p class="mx-auto text-xs text-center mb-3 border border-card bg-primary/50 py-2 rounded-full">
      <span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Votre essai gratuit est terminé
    </p>

    <h1 class="mb-6 leading-tight">
      <p class="text-3xl">
        Ça fait dejà 1 mois que vous
        <span class="font-fraunces bg-secondary">vendez avec moins de stress</span>
      </p>
    </h1>

    <p class="leading-relaxed text-gray mx-auto mb-4">
      Il y'a 1 mois, vous avez decider de vendre plus simplement, et vous avez déjà fait de grands progrès. Vous avez gagné du temps, organisé vos commandes, et offert une meilleure expérience à vos clients. Mais ce n'est que le début de votre transformation.
    </p>

    <a href="#metrics-section">
      <Button variant="sober" class="mx-auto mt-4">
        Voir mes résultats
      </Button>
    </a>
  </Hero>

  <!-- METRICS SECTION: Interactive Discovery -->
  <Section isForLanding={true}>
    <div id="metrics-section" class="w-full">
      <h2 class="text-3xl text-center mb-12">Votre transformation en chiffres</h2>

      <!-- Metrics Grid with Interactive Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {#each metrics as metric (metric.id)}
          <button
            class="metric-card p-6 rounded-2xl bg-card border-2 border-transparent hover:border-secondary transition-all duration-300 cursor-pointer text-left group"
            onclick={() => toggleMetric(metric.id)}
            class:expanded={expandedMetric === metric.id}
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-start gap-4 flex-1">
                <span class="text-4xl">{metric.icon}</span>
                <div>
                  <p class="text-sm text-gray font-semibold uppercase tracking-wide">
                    {metric.label}
                  </p>
                  <p class="text-3xl font-fraunces font-bold text-heading mt-2">
                    {stats[metric.stat as keyof typeof stats] || "—"}
                  </p>
                </div>
              </div>
              <span
                class="text-xl transition-transform duration-300"
                class:rotate-180={expandedMetric === metric.id}
              >
                ▼
              </span>
            </div>

            {#if expandedMetric === metric.id}
              <div class="mt-4 pt-4 border-t border-gray/20 animate-fadeIn">
                <p class="text-sm text-gray leading-relaxed">
                  {metric.detail}
                </p>
              </div>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Key Insight -->
      <div class="mt-12 p-6 flex flex-col items-center rounded-2xl bg-primary/10 border border-primary/30">
        <p class="text-center text-sm text-gray font-semibold uppercase tracking-wide mb-2">
          💡 Le Point Clé
        </p>
        <p class="text-center text-lg font-fraunces text-heading">
          Vous avez gagné <strong>{stats.timeSaved}+ heures</strong>. C'est aussi
          <strong> {stats.revenue.toLocaleString()} FCFA</strong> en transactions claires et maîtrisées.
        </p>
      </div>
    </div>
  </Section>

   <!-- PRICING SECTION: The Ask -->
  <Section isForLanding={true} id="pricing-section">
    <div class="w-full">
      <div class="text-center mb-12">
        <p class="text-xs mx-auto text-center text-gray mb-4 uppercase tracking-widest font-semibold">
          💳 Plan Simple et Transparent
        </p>
        <h2 class="text-3xl mb-4">Continuer votre croissance</h2>
        <p class="text-gray mx-auto text-center">
          Un seul plan. Pas de surprises. Tout ce dont vous avez besoin, à un prix honnête pensé pour notre Afrique.
        </p>
      </div>

      <!-- Pricing Card -->
      <div class="max-w-md mx-auto mb-8">
        <div class="p-8 rounded-2xl bg-neutral-900 text-white border-2 border-secondary">
          <div class="text-center mb-8">
            <p class="text-sm uppercase tracking-widest text-secondary font-semibold mb-2">
              Plan Professionnel
            </p>
            <div class="mb-2">
              <span class="text-5xl font-fraunces font-bold">29 900 </span>
              <span class="text-lg">FCFA</span>
            </div>
            <p class="text-sm text-white/70">/mois</p>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Accés à DiMarket</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Produits illimités</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Partage facile avec la famille et amis</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Suivi des commandes en temps réel</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Statistiques de vente détaillées</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-secondary text-lg">✓</span>
              <span class="text-sm">Support prioritaire</span>
            </li>
          </ul>

          <a href="https://wa.me/221781878234?text={encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer" class="block mb-4">
            <Button variant="primary" class="w-full text-gray">
              Continuer de vendre avec DiMarket &gt;
            </Button>
          </a>

          <p class="text-xs text-white/60 text-center">
            Annulez quand vous voulez. Pas d'engagement long terme.
          </p>
        </div>
      </div>

      <!-- Risk Reversal / Reassurance -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {#each [
          { icon: "🔐", title: "Paiement via wave ou OM", desc: "Pas besoin de carte bancaire, on s'adapte pour vous !" },
          { icon: "⏱️", title: "Annulez quand vous voulez", desc: "Vous pouvez decider de ne plus utiliser nos services quand vous voulez" },
          { icon: "💬", title: "Support rapide", desc: "Une question? Réponse en moins de 4h." }
        ] as feature}
          <div class="text-center p-4">
            <p class="text-2xl mb-2">{feature.icon}</p>
            <h4 class="font-fraunces font-bold text-heading mb-1">{feature.title}</h4>
            <p class="text-sm text-gray">{feature.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </Section>


  <!-- FOMO SECTION: What You'll Lose -->
  <Section isForLanding={true} id="fomo-section">
    <div class="w-full">
      <h2 class="text-3xl text-center mb-4">Ce qui vous attend sans DiMarket</h2>
      <p class="text-center mx-auto text-gray mb-12">
        Vous souvenez-vous de comment c'était avant? Voulez-vous vraiment revenir?
      </p>

      <div class="space-y-4 w-full">
        {#each fomoPoints as point, index}
          <div
            class="p-6 rounded-2xl bg-card border-l-4 border-red-400 hover:shadow-md transition-all duration-300 hover:bg-red-50/30"
            style="animation: slideIn 0.5s ease-out; animation-delay: {index * 100}ms"
          >
            <div class="flex items-start gap-4">
              <span class="text-2xl">{point.icon}</span>
              <div class="flex-1">
                <h4 class="font-fraunces font-bold text-heading text-lg mb-1">
                  {point.danger}
                </h4>
                <p class="text-sm text-gray leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Bridge Statement -->
      <div class="mt-12 p-8 rounded-2xl bg-secondary/20 border border-secondary/50 text-center">
        <p class="font-fraunces text-center mx-auto text-lg leading-relaxed text-heading">
          Vous avez trop travaillé dur pour revenir en arrière. DiMarket n'est pas une dépense, c'est une
          <strong>décision pour continuer à grandir.</strong>
        </p>
      </div>
    </div>
  </Section>

 
  <!-- CTA Footer -->
  <Section isForLanding={true}>
   <h2 class="text-2xl text-center">
     Vous êtes complètement libre de partir...
    </h2>
    <div class="text-center">
      <p class="text-gray mb-4">
        Votre travail pendant ces 30 jours mérite de continuer. 
        Mais <strong>personne ne vous force à vendre avec DiMarket</strong>. Vous êtes la
        seule et unique personne qui peut savoir si DiMarket apporte quelque chose pour votre business ou pas et c'est donc vous qui choisissez !
      </p>
      <p class="text-xl text-gradient-to-r from-gray to-gray-600 font-fraunces font-bold mb-6">
        Alors, est ce que DiMarket est inutile pour votre business ?
      </p>
      <a href="https://wa.me/221781878234?text={encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer" class="block mb-4">
        <Button label="Non, je continue" class="px-8" />
      </a>
    </div>
  </Section>
</div>

<style>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 200px;
    }
  }

  :global(.animate-fadeIn) {
    animation: fadeIn 0.3s ease-out;
  }

  .metric-card {
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .metric-card:hover {
    transform: translateY(-2px);
  }

  .metric-card.expanded {
    background-color: rgb(240, 240, 240);
    border-color: rgb(132, 204, 22);
  }
</style>
