<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/components/Button.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";
  import ScrollHighlight from "$lib/components/ScrollHighlight.svelte";

  const benefits = [
    {
      icon: "🔌",
      title: "API Complète",
      description: "Endpoints REST complets avec documentation claire. Webhooks pour les événements temps-réel."
    },
    {
      icon: "💻",
      title: "SDKs Multi-langages",
      description: "Node.js, Python, JavaScript, Go. Commencez en minutes, pas en jours."
    },
    {
      icon: "🚀",
      title: "White-Label Marketplace",
      description: "Construisez votre marketplace propre. Nous gérons le backend, vous le design."
    },
    {
      icon: "📊",
      title: "Analytics Complètes",
      description: "Accès total aux données et rapports. Dashboards personnalisés faciles."
    }
  ];

  let userCount = $state(100);
  const conversionRate = 0.30; // 30% conversion for dev tools
  const activeAfterTrial = 0.80; // 80% stay active after trial
  const monthlyVendors = () => Math.floor(userCount * conversionRate);
  const activeVendors = () => Math.floor(monthlyVendors() * activeAfterTrial);
  const monthlyEarnings = () => activeVendors() * 5000;
  const yearlyEarnings = () => monthlyEarnings() * 12;
</script>

<svelte:head>
  <title>Partenaires Développeurs & API - DiMarket</title>
  <meta name="description" content="API DiMarket pour développeurs. Intégrez une marketplace complète en quelques heures. Gagnez 5 000 FCFA par vendeur référé." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- HERO SECTION -->
  <Hero>
    <p class="mx-auto text-xs text-center h-full mb-4 border border-card bg-primary/50 py-2 rounded-full">
      <span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Pour les constructeurs et développeurs
    </p>

    <h1 class="mb-6 leading-tight">
      Ajoutez une Marketplace<br />
      <span class="font-fraunces bg-secondary">À Votre Produit</span>
    </h1>

    <p class="leading-relaxed mx-auto">
      Vous construisez un outil SaaS ? Une app ? Un service pour entrepreneurs ? Intégrez DiMarket comme marketplace complète. Gagnez 5 000 FCFA par utilisateur qui devient un vendeur actif.
    </p>

    <div class="bg-white rounded-2xl p-8 mb-12 max-w-md mx-auto">
      <div class="flex gap-1 flex-col">
        <Button
          label="Accéder à l'API"
          onclick={() => window.location.href = 'https://docs.dimarket.biz'}
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
      Documentation compl ète. Démarrez en minutes.
      </p>
    </div>

    <!-- Stats Pills -->
    <div class="flex flex-wrap justify-center gap-8 text-center">
      {#each [
        { icon: '🧑‍💻', text: '<strong class="font-fraunces text-lg">Pour les Dev</strong><br> Et startups' },
        {
          icon: '💰',
          text: '<strong class="font-fraunces text-lg">5 000 FCFA</strong><br> Par utilisateur'
        },
        { icon: '🔌', text: '<strong class="font-fraunces text-lg">API Complète</strong><br> REST + Webhooks' }
      ] as badge}
        <div class="flex items-center flex-col gap-2">
          <span class="">{badge.icon}</span>
          <p class="text-sm sm:text-base text-gray-700">
            {@html badge.text}
          </p>
        </div>
      {/each}
    </div>
  </Hero>

  <!-- PROBLEM SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Vous construisez un outil<br/>
      <span class="font-fraunces opacity-70">Mais pas de marketplace</span>
    </h2>
    <p class="text-center text-gray-600 mb-12 text-lg">
      Et vos utilisateurs vous en demandent une
    </p>

    <div class="max-w-2xl mx-auto space-y-4 px-4">
      <ScrollHighlight once>
        <p class="text-lg">
          Vous avez créé un super outil pour e-commerçants : gestion d'inventaire, app mobile, plateforme d'automatisation... c'est excellent.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Mais vos utilisateurs demandent "Pouvez-vous ajouter une marketplace ?" ou "Comment je vends en ligne avec votre outil?"
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Construire une marketplace, c'est énorme. Des mois de travail. Paiements, logistics, support client... c'est un produit entier.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Et si vous pouviez juste... connecter votre outil à une marketplace existante ? Une que vos utilisateurs adorent ?
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg text-secondary font-semibold">
          Et en être rémunéré chaque fois qu'un utilisateur vend ?
        </p>
      </ScrollHighlight>
    </div>
  </Section>

  <!-- SOLUTION SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      La Solution : DiMarket API
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">1️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Lisez la Documentation</h3>
            <p class="text-gray-700">
              Nos docs sont claires et complètes. REST API, SDKs, exemples de code. Tout est là pour vous. 30 minutes de lecture.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <svg class="w-8 h-8 text-gray-400 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">2️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Intégrez en Quelques Heures</h3>
            <p class="text-gray-700">
              Appelez nos endpoints. Créez des vendeurs, des produits, gérez les collections. Notre API fait tout le travail lourd.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <svg class="w-8 h-8 text-gray-400 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">3️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vos Utilisateurs Vendent</h3>
            <p class="text-gray-700">
              Vos utilisateurs obtiennent une vraie marketplace. Ils vendent. Vous gagnez 5 000 FCFA par utilisateur actif, chaque mois.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- BENEFITS SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Pourquoi Intégrer DiMarket
    </h2>
    <p class="text-center text-gray-600 mb-12">
      C'est pratique, c'est puissant, et c'est profitable
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {#each benefits as benefit, index}
        <div class="bg-white border-2 border-card rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <span class="text-4xl mb-4 block">{benefit.icon}</span>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
          <p class="text-gray-700 text-sm">{benefit.description}</p>
        </div>
      {/each}
    </div>
  </Section>

  <!-- CALCULATOR SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Calculez vos gains
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Basé sur le nombre d'utilisateurs de votre outil
    </p>

    <div class="max-w-2xl mx-auto bg-white border-2 border-card rounded-2xl p-8">
      <div class="mb-8">
        <label for="users" class="block text-sm font-semibold text-gray-700 mb-4">
          Utilisateurs actifs de votre outil :
        </label>
        <input
          id="users"
          type="range"
          bind:value={userCount}
          min="10"
          max="500"
          step="10"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="text-center mt-4">
          <p class="text-2xl font-bold font-fraunces text-primary">{userCount} utilisateurs</p>
        </div>
      </div>

      <!-- Breakdown -->
      <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À 30% conversion :</span>
          <span class="font-bold">{monthlyVendors()} nouveaux/mois</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À 80% rétention :</span>
          <span class="font-bold">{activeVendors()} actifs</span>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p class="text-sm text-gray-600 mb-1">Par mois</p>
          <p class="text-3xl font-bold text-yellow-700 font-fraunces">
            {(monthlyEarnings() / 1000).toFixed(0)}k FCFA
          </p>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p class="text-sm text-gray-600 mb-1">Par an</p>
          <p class="text-3xl font-bold text-green-700 font-fraunces">
            {(yearlyEarnings() / 1000000).toFixed(1)}M FCFA
          </p>
        </div>
      </div>

      <p class="text-xs text-gray-500 text-center">
        *Estimations basées sur moyennes de l'industrie. Les résultats varient.
      </p>
    </div>
  </Section>

  <!-- USE CASES SECTION -->
  <Section isForLanding={true} class="bg-primary/10 py-20 rounded-2xl">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Cas d'Usage Populaires
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Cas 1</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">🏢 Plateforme de Coaching E-commerce</h3>
        <p class="text-gray-700">
          Vous enseignez aux entrepreneurs comment vendre en ligne. Maintenant, ils peuvent lancer une vraie marketplace en quelques minutes. L'intégrer gagnez 5k FCFA par client.
        </p>
      </div>

      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Cas 2</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">📱 App de Gestion d'Inventaire</h3>
        <p class="text-gray-700">
          Votre app synchronise les inventaires. Pourquoi ne pas ajouter la vente en ligne ? Intégrez DiMarket et laissez vos utilisateurs vendre directement depuis votre app.
        </p>
      </div>

      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Cas 3</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">🛠️ Plateforme No-Code de Vente</h3>
        <p class="text-gray-700">
          Vous créez des outils pour que les entrepreneurs se construisent des businesses. Intégrez DiMarket pour qu'ils puissent vendre sans quitter votre plateforme.
        </p>
      </div>

      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Cas 4</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">🎯 Marketplace Niche</h3>
        <p class="text-gray-700">
          Vous créez une marketplace pour une niche (artisans, créateurs, etc.). Utilisez DiMarket comme backbone. Vous focalisez sur le design et le marketing.
        </p>
      </div>
    </div>
  </Section>

  <!-- TECHNICAL SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Qu'Avez-Vous Accès
    </h2>

    <div class="max-w-4xl mx-auto space-y-4">
      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">REST API Complète</h3>
        <p class="text-gray-700 text-sm">
          Endpoints pour tout : vendeurs, produits, collections, commandes, paiements, pays, catégories, etc.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">Webhooks & Événements</h3>
        <p class="text-gray-700 text-sm">
          Events en temps réel : new_seller, product_created, order_placed, payment_completed. Intégrez votre système facilement.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">SDKs Multi-Languages</h3>
        <p class="text-gray-700 text-sm">
          Node.js, Python, JavaScript, Go. Installation simple, documentation complète, exemples prêts à l'emploi.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">OAuth 2.0 & JWT Auth</h3>
        <p class="text-gray-700 text-sm">
          Authentification sécurisée. Connectez vos utilisateurs sans partager les mots de passe.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">Analytics & Reporting</h3>
        <p class="text-gray-700 text-sm">
          Accès complet aux données. Créez des dashboards personnalisés pour vos utilisateurs.
        </p>
      </div>
    </div>
  </Section>

  <!-- SUPPORT SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Support Développeur
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div class="bg-white border-2 border-card rounded-2xl p-6">
        <span class="text-4xl mb-4 block">📚</span>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Documentation Complète</h3>
        <p class="text-gray-700 text-sm mb-4">
          Guides détaillés, exemples de code, FAQ. Tout ce que vous devez savoir.
        </p>
        <Button label="Lire les Docs" onclick={() => window.location.href = 'https://docs.dimarket.biz'} />
      </div>

      <div class="bg-white border-2 border-card rounded-2xl p-6">
        <span class="text-4xl mb-4 block">💬</span>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Support 24/7</h3>
        <p class="text-gray-700 text-sm mb-4">
          Questions sur l'API ? Bugs ? Problèmes ? Nous répondons rapidement sur Slack et email.
        </p>
        <Button label="Support Discord" onclick={() => window.location.href = 'https://discord.gg/dimarket'} />
      </div>
    </div>
  </Section>

  <!-- GAIN CALCULATOR -->
  <div id="gain-calculator">
    <GainBar />
  </div>

  <!-- FINAL CTA -->
  <PartnerCTA
    title="Prêt à Intégrer DiMarket ?"
    subtitle="Ajoutez une marketplace à votre outil et générez du revenu passif"
    message="Commencez par lire notre documentation. C'est gratuit, c'est clair, et vous comprendrez vite comment ça marche."
    ctaLabel="Accéder à l'API Documentation"
    ctaHref="https://docs.dimarket.biz"
  />
</div>

