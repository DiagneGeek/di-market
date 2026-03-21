<script lang="ts">
  import PartnerHero from "$lib/components/PartnerHero.svelte";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import BenefitsSection from "$lib/components/BenefitsSection.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCard from "$lib/components/PartnerCard.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";

  const benefits = [
    {
      icon: "💰",
      title: "Gains Immédiats",
      description: "Gagnez 10 000 FCFA par vendeur actif que vous référez. Les paiements sont effectués mensuellement via Wave, directement sur votre compte."
    },
    {
      icon: "🚀",
      title: "Opportunité Scalable",
      description: "Plus vous référez de vendeurs, plus vous gagnez. Aucune limite - créez un revenu passif en partageant DiMarket avec votre réseau."
    },
    {
      icon: "🤝",
      title: "Support Dédié",
      description: "Nous vous fournissons tous les outils, ressources et support dont vous avez besoin pour réussir votre programme d'affiliation."
    },
    {
      icon: "📊",
      title: "Tableau de Bord Transparent",
      description: "Suivez en temps réel vos référencements, vos gains et vos statistiques. Clarté et transparence garanties."
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
        "Commissions élevées par leader"
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
</script>

<svelte:head>
  <title>Partenaires DiMarket - Programme d'Affiliation</title>
  <meta name="description" content="Rejoignez notre programme d'affiliation et gagnez 10 000 FCFA par vendeur référé. Transparent, rémunérateur, scalable." />
  <link rel="canonical" href="https://dimarket.biz/partenaires">
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Hero Section -->
  <PartnerHero
    title="Une Opportunité Privilégiée"
    subtitle="Vous avez un réseau ? Transformez-le en revenus ! Gagnez 10 000 FCFA par vendeur que vous référez à DiMarket. Simple. Transparent. Rentable."
    ctaLabel="Rejoindre le Programme"
    ctaHref="#gain-calculator"
  />

  <!-- What is DiMarket Section -->
  <InfoSection
    title="DiMarket, c'est quoi ?"
    content="<strong>DiMarket</strong> est la marketplace numéro 1 au Sénégal qui connecte les vendeurs locaux aux clients qui cherchent leurs produits. Nous offrons aux vendeurs une plateforme gratuite et sans commission pour vendre en ligne, construire leur collection, et atteindre des milliers de clients.<br><br>Depuis son lancement, DiMarket a aidé des centaines de vendeurs à transformer leur activité en ligne. Notre mission ? Démocratiser le commerce électronique en Afrique."
  />

  <!-- Benefits Section -->
  <BenefitsSection
    title="Pourquoi Devenir Partenaire ?"
    benefits={benefits}
  />

  <!-- Gain Calculator -->
  <div id="gain-calculator">
    <GainBar />
  </div>

  <!-- Partner Types -->
  <section class="my-16 sm:my-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900">
        Choisissez Votre Type de Partenariat
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
    </div>
  </section>

  <!-- Final CTA -->
  <PartnerCTA
    title="Prêt à Gagner des Revenus ?"
    subtitle="Rejoignez notre réseau de partenaires et commencez à gagner dès aujourd'hui"
    message="Contactez-nous via WhatsApp pour discuter de votre programme d'affiliation. Nous répondons généralement en moins de 24 heures."
    ctaLabel="Contacter via WhatsApp"
    ctaHref="https://wa.me/781878234?text=Salut%20DiMarket%2C%20je%20suis%20inté ressé%20par%20le%20programme%20d%27affiliation.%20Pouvez-vous%20me%20donner%20plus%20de%20détails%20%3F"
  />

  <!-- FAQ Preview -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        Questions Fréquentes
      </h2>
      
      <div class="space-y-6">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">💡 Quand est-ce que je reçois ma commission ?</h3>
          <p class="text-gray-700">Les commissions sont versées mensuellement via Wave. Elles sont calculées après que le vendeur ait complété sa période d'essai gratuit d'un mois.</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">🎯 Combien de vendeurs puis-je référer ?</h3>
          <p class="text-gray-700">Il n'y a pas de limite ! Plus vous référez, plus vous gagnez. C'est un programme complètement scalable.</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">📊 Comment je suivre mes gains ?</h3>
          <p class="text-gray-700">Vous recevrez un tableau de bord personnalisé où vous pourrez suivre en temps réel vos référencements, vos gains et vos statistiques.</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">🤝 Quel est le support disponible ?</h3>
          <p class="text-gray-700">Vous aurez accès à un gestionnaire de compte dédié, des ressources de marketing complètes, et un support prioritaire pour répondre à vos questions.</p>
        </div>
      </div>
    </div>
  </section>
</div>
