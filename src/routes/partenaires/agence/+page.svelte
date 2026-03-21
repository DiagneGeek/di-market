<script lang="ts">
  import PartnerHero from "$lib/components/PartnerHero.svelte";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import BenefitsSection from "$lib/components/BenefitsSection.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";

  const benefits = [
    {
      icon: "💼",
      title: "Modèle Blanc Complet",
      description: "Intégrez DiMarket comme votre propre marketplace. Votre marque, votre interface, nos vendeurs. Solution clé en main."
    },
    {
      icon: "📈",
      title: "Croissance Rapide",
      description: "Gagnez 10 000 FCFA par vendeur introduit. Avec les capacités de ventes B2B des agences, les gains se multiplient rapidement."
    },
    {
      icon: "⚙️",
      title: "API & Intégration",
      description: "API complète pour intégrer DiMarket directement dans vos systèmes. Support technique prioritaire pour tous vos besoins."
    },
    {
      icon: "🎯",
      title: "Conditions Commerciales Flexibles",
      description: "Nous travaillons avec les agences pour créer des arrangements personnalisés adaptés à votre modèle économique."
    }
  ];
</script>

<svelte:head>
  <title>Partenaires Agences - DiMarket</title>
  <meta name="description" content="Programme d'affiliation pour les agences. Intégrez DiMarket et gagnez 10 000 FCFA par vendeur référé." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Hero Section -->
  <PartnerHero
    title="🏢 Devenez Partenaire Agence"
    subtitle="Élargissez vos services en proposant la marketplace DiMarket à vos clients. Gagnez 10 000 FCFA par nouveau client vendeur que vous référez."
    ctaLabel="Discuter d'un Partenariat"
    ctaHref="https://wa.me/781878234?text=Salut%20DiMarket%2C%20notre%20agence%20est%20intéressée%20par%20un%20partenariat.%20Pouvez-vous%20nous%20contacter%20%3F"
  />

  <!-- What is This Program Section -->
  <InfoSection
    title="Programme Partenariat Agences"
    content="Vous êtes une agence digital, un consultant, ou un prestataire de services ? DiMarket offre une nouvelle opportunité commerciale pour vos clients.<br><br>Présentez DiMarket à vos clients comme une solution de vente en ligne clé en main. Chaque client que vous aidez à lancer sur notre plateforme vous rapporte une commission de 10 000 FCFA. <strong>C'est une source de revenu additionnelle sans effort supplémentaire.</strong>"
  />

  <!-- Benefits Section -->
  <BenefitsSection
    title="Avantages du Partenariat Agences"
    benefits={benefits}
  />

  <!-- Gain Calculator -->
  <GainBar />

  <!-- Why Agencies Love It Section -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        Pourquoi les Agences Adorent Ce Partenariat
      </h2>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3">+ Revenu Sans Investissement</h3>
          <p class="text-gray-700">
            Vous n'avez rien à investir. Partagez votre lien de parrain avec vos clients et gagnez. C'est rentable immédiatement.
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3">+ Service Complémentaire</h3>
          <p class="text-gray-700">
            Vous proposez déjà des services web/digital ? DiMarket s'ajoute parfaitement à votre offre. Vos clients adorent les solutions intégrées.
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3">+ Fidélité Client</h3>
          <p class="text-gray-700">
            En aidant vos clients à vendre en ligne, vous augmentez leur succès. C'est excellente pour la fidélisation et les referrals.
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3">+ Scalabilité avec Peu d'Effort</h3>
          <p class="text-gray-700">
            Une fois intégré pour un client, c'est facilement réplicable pour les autres. Croissance sans charge opérationnelle.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Integration Options -->
  <section class="my-16 sm:my-20 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-yellow-200">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        🔌 Options d'Intégration
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg p-6 sm:p-8 border-2 border-yellow-300">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">📱 Easy: Lien Direct</h3>
          <p class="text-gray-700 mb-4">
            Partagez simplement votre lien de parrain. Les clients s'inscrivent et vous gagnez. Zéro développement.
          </p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li>✓ Hyperrapide à mettre en place</li>
            <li>✓ Aucun effort de maintenance</li>
            <li>✓ Parfait pour les petites agences</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg p-6 sm:p-8 border-2 border-blue-300">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">⚙️ Pro: White Label API</h3>
          <p class="text-gray-700 mb-4">
            Intégrez DiMarket directement dans votre plateforme. Votre marque, notre plateforme.
          </p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li>✓ Marketplace sous votre marque</li>
            <li>✓ API complète avec support</li>
            <li>✓ Conditions commerciales personnalisées</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Success Metric -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        📊 Exemple d'Agence à Succès
      </h2>
      
      <div class="bg-white border-2 border-blue-200 rounded-lg p-8 sm:p-10">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Agence Web : 20 Clients → 200k FCFA/mois</h3>
        
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="text-4xl">📱</div>
            <div>
              <p class="font-bold text-gray-900">Vous avez 20 clients web</p>
              <p class="text-sm text-gray-600">Petites boutiques, services, etc.</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-4xl">→</div>
            <div>
              <p class="font-bold text-gray-900">Vous proposez DiMarket à chacun</p>
              <p class="text-sm text-gray-600">Via email, réunion, ou document de recommandation</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-4xl">📈</div>
            <div>
              <p class="font-bold text-gray-900">20 deviennent vendeurs DiMarket</p>
              <p class="text-sm text-gray-600">Chacun via votre lien unique</p>
            </div>
          </div>

          <div class="bg-green-50 border-2 border-green-300 rounded-lg p-4 mt-6">
            <p class="text-gray-700 mb-2">Mois 2+ (après période d'essai):</p>
            <p class="text-3xl font-bold text-green-700">20 × 10 000 FCFA = 200 000 FCFA</p>
            <p class="text-sm text-gray-600 mt-2">Revenu mensuel récurrent, chaque mois</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Support & Resources -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        💪 Support & Ressources
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-3">👨‍💼</div>
          <h3 class="font-bold text-gray-900 mb-2">Account Manager Dédié</h3>
          <p class="text-gray-700 text-sm">Un point de contact unique pour toutes vos questions et optimisations.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-3">📚</div>
          <h3 class="font-bold text-gray-900 mb-2">Documentation API Complète</h3>
          <p class="text-gray-700 text-sm">Guides détaillés, exemples de code, et SDKs dans les languages populaires.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-3">🎯</div>
          <h3 class="font-bold text-gray-900 mb-2">Stratégies de Vente</h3>
          <p class="text-gray-700 text-sm">Templates de pitches, decks de présentation, et case studies à partager avec vos clients.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="font-bold text-gray-900 mb-2">Support Technique 24/7</h3>
          <p class="text-gray-700 text-sm">Réponses rapides pour les questions API, bugs, ou problèmes d'intégration.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <PartnerCTA
    title="Prêt à Croître avec DiMarket ?"
    subtitle="Transformez vos clients en source de revenus"
    message="Contactez-nous pour discuter du meilleur modèle d'intégration pour votre agence. Nous trouvons une solution qui fonctionne pour tout le monde."
    ctaLabel="Planifier un Appel"
    ctaHref="https://wa.me/781878234?text=Salut%20DiMarket%2C%20notre%20agence%20s%27appelle%20[nom]%2C%20nous%20avons%20[nombre]%20clients%2C%20et%20on%20aimerait%20discuter%20d%27un%20partenariat."
  />
</div>
