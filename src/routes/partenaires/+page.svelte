<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/components/Button.svelte"
  import InfoSection from "$lib/components/InfoSection.svelte";
  import PartnerCard from "$lib/components/PartnerCard.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";
  import ScrollHighlight from "$lib/components/ScrollHighlight.svelte";

  const benefits = [
    {
      icon: "❤️",
      title: "Aidez votre audience",
      description: "Offrez à vos vendeurs une solution pour mieux gérer leurs ventes et libérer du temps"
    },
    {
      icon: "💰",
      title: "Gains Immédiats",
      description: "1 000 FCFA par mois pendant un an par vendeur payant référé. Pas de délai, pas de conditions cachées. Paiements quand vous voulez via Wave."
    },
    {
      icon: "🚀",
      title: "Continuez Sans Limite",
      description: "Plus vous référez, plus vous gagnez, aucune limite. Transformez votre audience en revenu passif durable."
    },
    {
      icon: "🛠️",
      title: "Outils Prêts à L'Emploi",
      description: "Nous fournissons templates, images, vidéos et guides. Vous ne gérez que la promotion."
    },
    {
      icon: "📊",
      title: "Tableau de bord Transparent",
      description: "Suivez vos gains, le nombre d'essais en cours et autres informations en temps réel. Et demander votre paiement quand vous voulez"
    }
  ];

  const partnerTypes = [
    {
      icon: "👥",
      title: "Communautés",
      description: "Pour les groupes et communautés",
      features: [
        "Liens de référencement personnalisés",
        "Matériel de promotion entièrement préparé",
        "Support communautaire",
        "Programme VIP pour 50+ vendeurs/mois"
      ],
      link: "/partenaires/communautés"
    },
    {
      icon: "🏢",
      title: "Agences",
      description: "Pour les agences et prestataires",
      features: [
        "Solutions d'intégration blanche",
        "Support API prioritaire",
        "Conditions commerciales personnalisées",
        "Gestionnaire de compte dédié"
      ],
      link: "/partenaires/agence"
    },
    {
      icon: "⚙️",
      title: "Outils & API",
      description: "Pour les développeurs et startups",
      features: [
        "Accès API complet",
        "Documentation technique complète",
        "Support développeur 24/7",
        "Programme d'intégration"
      ],
      link: "/partenaires/outils"
    }
  ];

  let monthlyTargetVendors = $state(10);
  const calculateMonthlyEarnings = () => monthlyTargetVendors * 1000;
  const calculateYearlyEarnings = () => calculateMonthlyEarnings() * 12;
</script>

<svelte:head>
  <title>Partenaires DiMarket - Gagnez 1 000 FCFA par mois par Vendeur</title>
  <meta name="description" content="Rejoignez notre programme d'affiliation et gagnez 1 000 FCFA par mois pendant un an par vendeur référé. Transparent, scalable, rémunérateur." />
  <link rel="canonical" href="https://dimarket.biz/partenaires">
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- HERO SECTION -->
  <Hero>
    <p class="mx-auto text-xs text-center h-full mb-4 border border-card bg-primary/50 py-2 rounded-full">
      <span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Gagner du revenu passif
    </p>

    <h1 class="mb-6 leading-tight">
      <p class="text-3xl">Vous connaissez des vendeurs en ligne ? <br>
      <span class="font-fraunces bg-secondary">Aidez-les</span> à mieux gérer leur business.</p>
    </h1>

    <p class="leading-relaxed mx-auto">
      Aidez des vendeurs à gagner du temps et de l'argent en recommandant DiMarket et gagner <strong>1 000 FCFA par mois</strong> pendant un an pour chaque vendeur référé.
    </p>

    <div class="bg-white rounded-2xl p-8 mb-12 max-w-md mx-auto">
      <a href="/partenaires/inscription" class="flex gap-1 flex-col">
        <Button
          label="Rejoindre le Programme"
        />
      </a>
      <p class="text-xs text-gray-500 mt-2">
      Aucun frais. Commencez maintenant.
      </p>
    </div>

    <!-- Stats Pills -->
    <div class="flex flex-wrap justify-center gap-8 text-center">
      {#each [
        { icon: '🌍', text: '<strong class="font-fraunces text-lg">Fait en Afrique</strong><br> Pour l\'Afrique' },
        {
          icon: '💸',
          text: '<strong class="font-fraunces text-lg">1 000 FCFA/mois</strong><br> Par vendeur'
        },
        { icon: '🚀', text: '<strong class="font-fraunces text-lg">Scalable</strong><br> Sans limite' }
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

  <Section isForLanding={true}>
    <h2 class="text-3xl mt-8">C'est quoi DiMarket ?</h2>
    <InfoSection>
      DiMarket aide les vendeurs en ligne africains à sortir du chaos des 
      messages et des commandes mal gérées.<br><br>

      Aujourd’hui, beaucoup passent leurs journées à répondre aux même messages, à répéter les mêmes infos dans Whatsapp et essayer de gérer les commandes manuellement. 
      Résultat : beaucoup de temps passé dans whatsapp, des ventes ratées et du stress inutile.<br><br>

      Avec DiMarket, les vendeurs créent facilement leurs collections, les partagent avec leurs clients,
       et reçoivent des commandes claires, structurées et prêtes à être traitées, 
       sans discussions interminables.<br><br>

      Pensé pour la réalité du commerce en Afrique, conçu au Sénégal, DiMarket transforme une activité confuse en un système simple, rapide et efficace.
    </InfoSection>
  </Section>

  <!-- PROBLEM SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Vous avez une audience de <span class="font-fraunces opacity-70">vendeurs ou entrepreneurs</span>
    </h2>
    <p class="text-center text-gray-600 mb-12 text-lg">
      Et ils cherchent une solution pour organiser leurs ventes
    </p>

    <div class="max-w-2xl mx-auto space-y-4 px-4">
      <ScrollHighlight once>
        <p class="text-lg">
          Vous avez un groupe WhatsApp ou Facebook de vendeurs, une communauté d'entrepreneurs, ou une audience sur les réseaux.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Vous les aidez régulièrement avec des conseils ou du support ou tout simplement une place pour vendre.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Mais votre aide peut être encore plus précieuse si vous leur permettez de gagner des heures chaque jours
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg text-secondary font-semibold">
          Et si chacun de vos vendeurs qui réussit vous rapportait quelque chose ?
        </p>
      </ScrollHighlight>
    </div>
  </Section>

  <!-- SOLUTION SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center pb-12 text-gray-900">
      Le Programme de Partenariat DiMarket
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">1️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous partagez votre lien unique</h3>
            <p class="text-gray-700">
              Vous recevez un lien partenaire que vous partagez avec votre audience via WhatsApp, Facebook, email, réseaux sociaux peu importe. Aucune vente à faire.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">2️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ils rejoignent DiMarket</h3>
            <p class="text-gray-700">
              Vos vendeurs s'inscrivent via votre lien, créent leur collection, et commencent à recevoir des commandes.  Tout ça gratuitement pendant 1 mois.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">3️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous gagnez 1 000 FCFA par mois</h3>
            <p class="text-gray-700">
              Après la période d'essai, si votre vendeur continue (paiement), vous gagnez 1 000 FCFA par mois pendant un an que vous pouvez récupérer via Wave
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- BENEFITS SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Pourquoi ça marche pour vous
    </h2>
    <p class="text-center text-gray-600 mb-12">
      C'est rémunérateur, transparent, et vraiment scalable
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
      Calculez vos gains potentiels
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Basé sur le nombre de vendeurs que vous pouvez référer
    </p>

    <div class="max-w-2xl mx-auto bg-white border-2 border-card rounded-2xl p-8">
      <div class="mb-8">
        <label for="vendors" class="block text-sm font-semibold text-gray-700 mb-4">
          Vendeurs par mois que vous pouvez référer :
        </label>
        <input
          id="vendors"
          type="range"
          bind:value={monthlyTargetVendors}
          min="1"
          max="50"
          step="1"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="text-center mt-4">
          <p class="text-2xl font-bold font-fraunces text-primary">{monthlyTargetVendors} vendeur{monthlyTargetVendors > 1 ? 's' : ''}</p>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p class="text-sm text-gray-600 mb-1">Par mois</p>
          <p class="text-3xl font-bold text-yellow-700 font-fraunces">
            {(calculateMonthlyEarnings() / 1000).toFixed(0)}k FCFA
          </p>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p class="text-sm text-gray-600 mb-1">Par an</p>
          <p class="text-3xl font-bold text-green-700 font-fraunces">
            {(calculateYearlyEarnings() / 1000000).toFixed(1)}M FCFA
          </p>
        </div>
      </div>

      <p class="text-xs text-gray-500 text-center mt-6">
        *Basé sur 1 000 FCFA par mois pendant un an par vendeur actif après la période d'essai
      </p>
    </div>
  </Section>

  <!-- PARTNER TYPES SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Fonctionne pour tous les types d'activités
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Quel que soit votre domaine d'activité (lié à la vente), DiMarket vous aide à générer des revenus passifs.
      Voici quelques exemples de partenaires:
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {#each partnerTypes as partner (partner.title)}
        <PartnerCard
          title={partner.title}
          description={partner.description}
          features={partner.features}
          icon={partner.icon}
          link={partner.link}
        />
      {/each}
    </div>
  </Section>

  <!-- FAQ SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Questions Fréquentes
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Tout ce que vous devez savoir avant de commencer
    </p>

    <div class="max-w-4xl mx-auto space-y-4">
      <details class="bg-white border border-card rounded-lg p-6">
        <summary class="font-bold text-gray-900 cursor-pointer">
          💡 Quand est-ce que je reçois ma commission ?
        </summary>
        <p class="text-gray-700 mt-4">
          Les commissions sont versées mensuellement via Wave. Elles sont calculées après que le vendeur ait complété sa période d'essai gratuit d'un mois.
        </p>
      </details>

      <details class="bg-white border border-card rounded-lg p-6">
        <summary class="font-bold text-gray-900 cursor-pointer">
          🎯 Combien de vendeurs puis-je référer ?
        </summary>
        <p class="text-gray-700 mt-4">
          Il n'y a pas de limite ! Plus vous référez, plus vous gagnez. C'est un programme complètement scalable et sans plafond.
        </p>
      </details>

      <details class="bg-white border border-card rounded-lg p-6">
        <summary class="font-bold text-gray-900 cursor-pointer">
          📊 Comment je suivre mes gains ?
        </summary>
        <p class="text-gray-700 mt-4">
          Vous recevrez un tableau de bord personnalisé où vous pourrez suivre en temps réel vos référencements, vos gains, et vos statistiques.
        </p>
      </details>

      <details class="bg-white border border-card rounded-lg p-6">
        <summary class="font-bold text-gray-900 cursor-pointer">
          🤝 Quel est le support disponible ?
        </summary>
        <p class="text-gray-700 mt-4">
          Vous aurez accès à des ressources de marketing complètes, un gestionnaire de compte dédié (selon votre programme), et un support prioritaire pour répondre à vos questions.
        </p>
      </details>

      <details class="bg-white border border-card rounded-lg p-6">
        <summary class="font-bold text-gray-900 cursor-pointer">
          📱 Faut-il faire du "sales" ?
        </summary>
        <p class="text-gray-700 mt-4">
          Non ! Partagez simplement votre lien ou présentez DiMarket comme une solution à votre audience. Notre plateforme parle d'elle-même. Les vendeurs adorent.
        </p>
      </details>
    </div>
  </Section>

  <!-- FINAL CTA -->
  <PartnerCTA
    title="Prêt à Commencer ?"
    subtitle="Rejoignez notre réseau de partenaires et générez du revenu passif"
    message="Cliquez simplement sur le bouton ci-dessous ou contactez-nous via WhatsApp pour discuter de votre programme. Nous répondons généralement en moins de 24 heures."
    ctaLabel="Rejoindre le Programme"
    ctaHref="/partenaires/commencer"
  />
</div>
