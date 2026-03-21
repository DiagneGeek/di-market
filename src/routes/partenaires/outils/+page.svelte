<script lang="ts">
  import PartnerHero from "$lib/components/PartnerHero.svelte";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import BenefitsSection from "$lib/components/BenefitsSection.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";

  const benefits = [
    {
      icon: "🔌",
      title: "API Complète & Documentée",
      description: "Accès total à notre API avec documentation complète, webhooks, et support développeur prioritaire pour vos intégrations."
    },
    {
      icon: "💻",
      title: "SDKs Disponibles",
      description: "SDKs pré-construits en Node.js, Python, JavaScript et Go. Démarrez en minutes, pas en jours."
    },
    {
      icon: "🚀",
      title: "Marketplace Sous Votre Marque",
      description: "Créez votre propre marketplace en intégrant DiMarket. Laissez-nous gérer le backend, vous contrôlez l'expérience."
    },
    {
      icon: "📊",
      title: "Données & Analytics",
      description: "Accès complet aux données, analytics, et rapports via API pour faire des analyses avancées pour vos clients."
    }
  ];
</script>

<svelte:head>
  <title>Partenaires Outils & API - DiMarket</title>
  <meta name="description" content="Programme API pour les développeurs et startups. Intégrez DiMarket et gagnez 10 000 FCFA par vendeur." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Hero Section -->
  <PartnerHero
    title="⚙️ Devenez Partenaire Développeur"
    subtitle="Constructeurs, développeurs, créateurs de outils : DiMarket est votre API. Intégrez, créez, gagnez. Jusqu'à 10 000 FCFA par vendeur référé."
    ctaLabel="Accéder à la Documentation API"
    ctaHref="https://docs.dimarket.biz"
  />

  <!-- What is This Program Section -->
  <InfoSection
    title="Programme Partenariat Développeurs"
    content="Vous créez un outil SaaS, une app mobile, ou un service ? Intégrez DiMarket directement pour donner à vos utilisateurs une solution de vente en ligne complète.<br><br>Chaque utilisateur que vous introduisez sur DiMarket et qui devient vendeur actif (après la période d'essai) vous rapporte 10 000 FCFA. <strong>Monétisez sans effort supplémentaire.</strong>"
  />

  <!-- Benefits Section -->
  <BenefitsSection
    title="Avantages du Partenariat Développeurs"
    benefits={benefits}
  />

  <!-- Gain Calculator -->
  <GainBar />

  <!-- Technical Details Section -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        🛠️ Ce Que Vous Avez Accès
      </h2>
      
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📡</span> REST API Complète
          </h3>
          <p class="text-gray-700 mb-4">
            Endpoints pour tous les opérations : vendeurs, produits, collections, commandes, pays, etc.
          </p>
          <div class="bg-gray-900 text-yellow-400 p-3 rounded text-xs overflow-x-auto block font-mono">
            <div>GET /api/v1/sellers/{'{id}'}/products</div>
            <div>POST /api/v1/sellers</div>
            <div>PUT /api/v1/collections/{'{id}'}</div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🎣</span> Webhooks & Events
          </h3>
          <p class="text-gray-700">
            Recevez des événements en temps réel : new seller, product created, order placed, payment completed. Intégrez votre système facilement.
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🔐</span> OAuth 2.0 & JWT
          </h3>
          <p class="text-gray-700">
            Authentification sécurisée pour vos utilisateurs. Connectez facilement avec DiMarket sans partager les mots de passe.
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📊</span> Analytics & Reporting
          </h3>
          <p class="text-gray-700">
            Données détaillées sur vos utilisateurs, leurs ventes, et votre impact. Parfait pour les dashboards personnalisés.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Use Cases Section -->
  <section class="my-16 sm:my-20 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-yellow-200">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        💡 Cas d'Usage
      </h2>
      
      <div class="space-y-6">
        <div class="bg-white rounded-lg p-6 border-l-4 border-blue-500">
          <h3 class="text-xl font-bold text-gray-900 mb-2">1. Plateforme de Coaching</h3>
          <p class="text-gray-700">
            Vous créez une plateforme de coaching pour e-commerçants ? Intégrez DiMarket pour que vos clients lancent immédiatement leur marketplace. Génération de revenus passive.
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 border-l-4 border-green-500">
          <h3 class="text-xl font-bold text-gray-900 mb-2">2. App de Gestion Inventaire</h3>
          <p class="text-gray-700">
            Vous avez une app pour gérer les inventaires ? Connectez-la directement à DiMarket. Vos utilisateurs synchronisent leurs produits automatiquement et vendent en ligne.
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 border-l-4 border-purple-500">
          <h3 class="text-xl font-bold text-gray-900 mb-2">3. Marketplace Niche</h3>
          <p class="text-gray-700">
            Vous construisez une marketplace pour une niche spécifique. Utilisez DiMarket comme backend pour les opérations. Vous focalisez sur le design et le marketing.
          </p>
        </div>

        <div class="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
          <h3 class="text-xl font-bold text-gray-900 mb-2">4. Tool d'Automatisation</h3>
          <p class="text-gray-700">
            Vous créez des outils pour les e-commerçants ? Intégrez DiMarket pour que vos utilisateurs accèdent à une marketplace réelle. Valeur augmentée = clients heureux.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Code Example -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        📝 Quick Start
      </h2>
      
      <div class="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto font-mono text-xs sm:text-sm whitespace-pre-wrap break-words">
        <div class="text-yellow-400 mb-4">// Créer un vendeur via API</div>
        <div>const response = await fetch(</div>
        <div class="text-green-400 ml-4">'https://api.dimarket.biz/v1/sellers',</div>
        <div>{'{'}</div>
        <div class="ml-4">method: <span class="text-green-400">'POST'</span>,</div>
        <div class="ml-4">headers: {'{'}</div>
        <div class="ml-8">'Authorization': <span class="text-green-400">'Bearer YOUR_API_KEY'</span>,</div>
        <div class="ml-8">'Content-Type': <span class="text-green-400">'application/json'</span></div>
        <div class="ml-4">{'}'}</div>
        <div class="ml-4">body: JSON.stringify({'{'}</div>
        <div class="ml-8">name: <span class="text-green-400">'New Seller'</span>,</div>
        <div class="ml-8">email: <span class="text-green-400">'seller@example.com'</span>,</div>
        <div class="ml-8">referrer_code: <span class="text-green-400">'YOUR_UNIQUE_CODE'</span></div>
        <div class="ml-4">{'}'})</div>
        <div>{'}'})</div>
      </div>
      
      <p class="text-center text-gray-600 mt-8">
        C'est facile ! Voir la <a href="https://docs.dimarket.biz" class="text-blue-600 font-bold hover:underline">documentation complète</a>
      </p>
    </div>
  </section>

  <!-- Support Section -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        🤝 Support Développeur
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-6">
          <div class="text-3xl mb-3">📚</div>
          <h3 class="font-bold text-gray-900 mb-2">Documentation API</h3>
          <p class="text-gray-700 text-sm mb-4">Guides complets, exemples de code, et références pour chaque endpoint.</p>
          <a href="https://docs.dimarket.biz" class="text-blue-600 font-bold text-sm">→ Accéder</a>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-6">
          <div class="text-3xl mb-3">💬</div>
          <h3 class="font-bold text-gray-900 mb-2">Dev Slack Community</h3>
          <p class="text-gray-700 text-sm mb-4">Connectez vous avec d'autres développeurs, partagez des solutions et des tips.</p>
          <a href="https://slack.dimarket.dev" class="text-blue-600 font-bold text-sm">→ Rejoindre</a>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-6">
          <div class="text-3xl mb-3">🐛</div>
          <h3 class="font-bold text-gray-900 mb-2">Bug Reports & Feature Requests</h3>
          <p class="text-gray-700 text-sm mb-4">GitHub Issues pour suivre les bugs et demander de nouvelles fonctionnalités.</p>
          <a href="https://github.com/dimarket/api-issues" class="text-blue-600 font-bold text-sm">→ Voir</a>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-6">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="font-bold text-gray-900 mb-2">Email Support Rapide</h3>
          <p class="text-gray-700 text-sm mb-4">Réponses en moins de 24h pour les questions techniques et problèmes urgents.</p>
          <a href="mailto:developers@dimarket.biz" class="text-blue-600 font-bold text-sm">→ Contacter</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <PartnerCTA
    title="Prêt à Intégrer DiMarket ?"
    subtitle="Commencez votre intégration dès aujourd'hui"
    message="Consultez notre documentation API et commencez à développer. C'est gratuit to get started. Nous sommes prêts à vous aider à réussir."
    ctaLabel="Consulter la Documentation"
    ctaHref="https://docs.dimarket.biz"
  />
</div>
