<script lang="ts">
  import PartnerHero from "$lib/components/PartnerHero.svelte";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import BenefitsSection from "$lib/components/BenefitsSection.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";
  import Button from "$lib/components/Button.svelte";

  const benefits = [
    {
      icon: "🎯",
      title: "Alignement Naturel",
      description: "DiMarket s'aligne parfaitement avec les valeurs de votre communauté : support local, commerce éthique, et empowerment économique."
    },
    {
      icon: "📱",
      title: "Ressources Prêtes à L'Emploi",
      description: "Nous fournissons tous les matériaux : templates WhatsApp, images, vidéos explicatives, et guides complets pour promouvoir auprès de votre communauté."
    },
    {
      icon: "💬",
      title: "Network Effect",
      description: "Lorsqu'une personne de votre communauté rejoint, elle amène souvent ses amis. Les gains augmentent exponentiellement."
    },
    {
      icon: "🏆",
      title: "Programme VIP Communautés",
      description: "Les communautés qui réfèrent 50+ vendeurs/mois accèdent à des bonis spéciaux, des reconnaissances publiques, et des avantages exclusifs."
    }
  ];
</script>

<svelte:head>
  <title>Partenaires Communautés - DiMarket</title>
  <meta name="description" content="Programme d'affiliation pour les communautés et groupes. Gagnez 10 000 FCFA par vendeur référé." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Hero Section -->
  <PartnerHero
    title="🌍 Devenez Partenaire Communauté"
    subtitle="Votre groupe, votre réseau, c'est une ressource précieuse. Transformez votre communauté en source de revenus et d'opportunités en partageant DiMarket."
    ctaLabel="Commencer Maintenant"
    ctaHref="https://wa.me/781878234?text=Salut%20DiMarket%2C%20je%20dirige%20une%20communauté%20et%20suis%20intéressé%20par%20le%20partenariat%20communautés."
  />

  <!-- What is This Program Section -->
  <InfoSection
    title="Programme de Partenariat Communautés"
    content="Vous avez un groupe WhatsApp actif, une association, une page Facebook engagée ? C'est l'opportunité parfaite. Présentez DiMarket à votre communauté et gagnez 10 000 FCFA par personne que vous référez et qui devient un vendeur actif.<br><br><strong>Aucun effort compliqué</strong>. Vous partagez les ressources que nous fournissons, et nous gérons le reste. C'est aussi simple que ça."
  />

  <!-- Benefits Section -->
  <BenefitsSection
    title="Avantages du Partenariat Communautés"
    benefits={benefits}
  />

  <!-- Gain Calculator -->
  <GainBar />

  <!-- How It Works Section -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        Comment Ça Marche ?
      </h2>
      
      <div class="space-y-6">
        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-300 text-gray-900 font-bold text-lg">
              1
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Créez Votre Lien Unique</h3>
            <p class="text-gray-700">Vous recevez un lien de parrain unique que vous partagez avec votre communauté. Chaque personne qui s'inscrit via ce lien est enregistrée comme votre référencement.</p>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-300 text-gray-900 font-bold text-lg">
              2
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Partagez les Ressources</h3>
            <p class="text-gray-700">Utilisez nos templates préparés, images, vidéos et messages pour promouvoir DiMarket. Nous faisons le travail créatif, vous gérez juste la promotion.</p>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-300 text-gray-900 font-bold text-lg">
              3
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Attendez la Fin de la Période de Essai</h3>
            <p class="text-gray-700">Chaque vendeur a 1 mois gratuit. Après cette période, s'il continue, vous recevez votre commission de 10 000 FCFA.</p>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-300 text-gray-900 font-bold text-lg">
              4
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Recevez Votre Paiement</h3>
            <p class="text-gray-700">Les commissions sont versées mensuellement via Wave, directement sur votre compte. Pas de frais, pas de conditions cachées.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Success Stories Section -->
  <section class="my-16 sm:my-20 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-yellow-200">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        📈 Cas d'Usage : Communautés à Succès
      </h2>
      
      <div class="bg-white rounded-lg p-6 sm:p-8 border border-yellow-200">
        <div class="mb-4">
          <span class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Exemple Réaliste</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Groupe WhatsApp de 2 000 Femmes Entrepreneures
        </h3>
        <p class="text-gray-700 mb-6">
          <strong>Scénario :</strong> Vous animez un groupe WhatsApp avec 2 000 femmes entrepreneures. Vous présentez DiMarket et partagez le lien avec votre groupe.
        </p>
        
        <div class="bg-yellow-50 rounded-lg p-4 sm:p-6 border border-yellow-200 mb-6">
          <h4 class="font-bold text-gray-900 mb-4 text-lg">Mois 1 (Période d'Essai) :</h4>
          <ul class="space-y-2 text-gray-700">
            <li>✓ 30 femmes créent des comptes DiMarket</li>
            <li>✓ Elles construisent leurs collections</li>
            <li>✓ Elles testent la plateforme</li>
            <li>✓ 0 FCFA de commission (période d'essai)</li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
          <h4 class="font-bold text-gray-900 mb-4 text-lg">À Partir du Mois 2 :</h4>
          <div class="space-y-3 text-gray-700">
            <div class="flex justify-between items-center">
              <span>20 femmes deviennent vendeurs payants</span>
              <span class="font-bold">20 × 10 000 FCFA</span>
            </div>
            <div class="border-t-2 border-green-200 pt-3 flex justify-between items-center text-lg font-bold text-green-700">
              <span>Vos gains mensuels</span>
              <span>200 000 FCFA</span>
            </div>
          </div>
        </div>

        <p class="text-gray-600 text-sm mt-6 italic">
          💡 Avec une communauté engagée, vous pouvez facilement générer 200k → 500k FCFA/mois en promotion passive.
        </p>
      </div>
    </div>
  </section>

  <!-- Resources Section -->
  <section class="my-16 sm:my-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
        📦 Ressources Incluses
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">📱</div>
          <h3 class="font-bold text-gray-900 mb-2">Messages Prêts</h3>
          <p class="text-gray-700 text-sm">Messages WhatsApp pre-rédigés, convaincants, prêts à copier-coller dans votre groupe.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">🎥</div>
          <h3 class="font-bold text-gray-900 mb-2">Vidéos Explicatives</h3>
          <p class="text-gray-700 text-sm">Vidéos courtes montrant comment fonctionne DiMarket et les avantages pour les vendeurs.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">🖼️</div>
          <h3 class="font-bold text-gray-900 mb-2">Banners & Images</h3>
          <p class="text-gray-700 text-sm">Images attrayantes pour partager sur Facebook, Instagram, et autres réseaux sociaux.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">📊</div>
          <h3 class="font-bold text-gray-900 mb-2">Tableau de Bord</h3>
          <p class="text-gray-700 text-sm">Suivez en temps réel vos référencements, gains, et statistiques de conversion.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">🤝</div>
          <h3 class="font-bold text-gray-900 mb-2">Support Dédié</h3>
          <p class="text-gray-700 text-sm">Un gestionnaire vous aide à optimiser votre stratégie et répond à vos questions rapidement.</p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-lg p-6">
          <div class="text-3xl mb-4">🎯</div>
          <h3 class="font-bold text-gray-900 mb-2">Stratégies Éprouvées</h3>
          <p class="text-gray-700 text-sm">Nous partageons les stratégies et tactiques qui ont fonctionné pour d'autres communautés.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <PartnerCTA
    title="Transformez Votre Communauté en Revenu"
    subtitle="Commencez dès maintenant avec zéro frais d'inscription"
    message="Nous cherchons des leaders de communautés motivés prêts à faire une différence. Si vous avez un groupe actif et engagé, c'est l'opportunité parfaite."
    ctaLabel="Rejoindre le Programme"
    ctaHref="https://wa.me/781878234?text=Salut%20DiMarket%2C%20je%20dirige%20une%20communauté%20avec%20[nombre]%20membres%20et%20suis%20intéressé%20par%20le%20programme%20d%27affiliation%20communautés."
  />
</div>
