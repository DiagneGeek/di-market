<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/components/Button.svelte";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";
  import ScrollHighlight from "$lib/components/ScrollHighlight.svelte";

  const benefits = [
    {
      icon: "🎯",
      title: "Alignement Naturel",
      description: "DiMarket s'aligne avec vos valeurs : support local, commerce éthique, et être utile à votre communauté."
    },
    {
      icon: "📱",
      title: "Ressources Prêtes",
      description: "Templates WhatsApp, images, vidéos et guides. Nous vous donnont tout pour vous voir réussir."
    },
    {
      icon: "💬",
      title: "Effet Réseau",
      description: "Vos membres qui réussissent amènent leurs amis. La croissance s'accélère."
    },
    {
      icon: "🏆",
      title: "Status et Reconnaissances",
      description: "En aidant les vendeurs de votre communauté à gagner du temps et organiser leurs commandes, vous sortez de la case de simple admin et devenez un leader respecté et apprécié"
    }
  ];

  let memberCount = $state(50);
  const conversionRate = 0.25; // 25% conversion
  const activeAfterTrial = 0.70; // 70% stay active
  const monthlyVendors = () => Math.floor(memberCount * conversionRate);
  const activeVendors = () => Math.floor(monthlyVendors() * activeAfterTrial);
  const monthlyEarnings = () => activeVendors() * 1000;
  const yearlyEarnings = () => monthlyEarnings() * 12;
</script>

<svelte:head>
  <title>Partenaires Communautés - DiMarket</title>
  <meta name="description" content="Programme d'affiliation pour les communautés. Aider vos membres à réussir ET générez du revenu." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- HERO SECTION -->
  <Hero>
    <p class="mx-auto text-xs text-center h-full mb-4 border border-card bg-primary/50 py-2 rounded-full">
      <span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Pour les leaders de communautés
    </p>

    <h1 class="mb-6 leading-tight">
      Aidez votre communauté à réussir<br />
      <span class="font-fraunces bg-secondary">Et gagnez ensemble</span>
    </h1>

    <p class="leading-relaxed mx-auto">
      Vous animez un groupe WhatsApp, une communauté Telegram, ou un réseau d'entrepreneurs ? Aidez-les à vendre en ligne avec DiMarket, et gagnez 1 000 FCFA par mois pendant un an chaque fois qu'un de vos membres devient un vendeur actif.
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
        { icon: '👥', text: '<strong class="font-fraunces text-lg">Pour les leaders</strong><br> De communautés' },
        {
          icon: '💰',
          text: '<strong class="font-fraunces text-lg">1 000 FCFA/mois</strong><br> Par membre'
        },
        { icon: '🚀', text: '<strong class="font-fraunces text-lg">Croissance exponentielle</strong><br> Effet réseau' }
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

      Aujourd'hui, beaucoup passent leurs journées à répondre aux mêmes messages, à répéter les mêmes infos dans Whatsapp et essayer de gérer les commandes manuellement. 
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
      Vous animez une <span class="font-fraunces opacity-70">communauté de vendeurs</span>
    </h2>
    <p class="text-center text-gray-600 mb-12 text-lg">
      Mais vous les aidez sans être rémunéré
    </p>

    <div class="max-w-2xl mx-auto space-y-4 px-4">
      <ScrollHighlight>
        <p class="text-lg">
          Votre communauté est votre fierté. Vous adorez voir des personnes réussir grâce à vous.
        </p>
      </ScrollHighlight>

      <ScrollHighlight>
        <p class="text-lg">
          Mais à la fin du mois, vous avez aidé des dizaines de membres à devenir plus fortunés… et vous, vous n'avez rien.
        </p>
      </ScrollHighlight>

      <ScrollHighlight>
        <p class="text-lg">
          Pendant ce temps, vos membres cherchent une solution pour organiser leurs ventes. Ils demandent "Comment je fais pour vendre en ligne plus simplement?"
        </p>
      </ScrollHighlight>

      <ScrollHighlight>
        <p class="text-lg text-secondary font-semibold">
          Et si c'était vous qui pouviez les donner la solution ? ET en être rémunéré ?
        </p>
      </ScrollHighlight>
    </div>
  </Section>

  <!-- SOLUTION SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Comment Ça Marche Pour Vous
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">1️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous créez votre lien unique</h3>
            <p class="text-gray-700">
              Nous vous donnons un lien qui vous représente. Chaque personne qui s'inscrit via ce lien vous est associée.
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
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous partagez avec votre communauté</h3>
            <p class="text-gray-700">
              Présentez DiMarket à votre communauté. Partagez dans votre groupe Facebook, WhatsApp, Telegram, ou lors de vos sessions. Nous fournissons les resources.
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
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vos membres s'inscrivent et réussissent</h3>
            <p class="text-gray-700">
              Chaque membre crée une collection, reçoit des commandes, et va ainsi gagner du temps et de l'argent.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>

      <div class="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">4️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous gagnez 1 000 FCFA par mois par vendeur actif</h3>
            <p class="text-gray-700">
              Après la période d'essai, chaque membre actif vous rapporte 1 000 FCFA mensuels pendant un an. Plus ils réussissent, plus vous gagnez.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- BENEFITS SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Avantages pour le Leader
    </h2>
    <p class="text-center text-gray-600 mb-12">
      C'est plus que juste de l'argent
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
      Basé sur la taille de votre communauté
    </p>

    <div class="max-w-2xl mx-auto bg-white border-2 border-card rounded-2xl p-8">
      <div class="mb-8">
        <label for="members" class="block text-sm font-semibold text-gray-700 mb-4">
          Nombre de membres dans votre communauté :
        </label>
        <input
          id="members"
          type="range"
          bind:value={memberCount}
          min="10"
          max="1000"
          step="10"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="text-center mt-4">
          <p class="text-2xl font-bold font-fraunces text-primary">{memberCount} membres</p>
        </div>
      </div>

      <!-- Breakdown -->
      <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À ~25% conversion :</span>
          <span class="font-bold">{monthlyVendors()} nouveaux/mois</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À 70% rétention :</span>
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

  <!-- USE CASE SECTION -->
  <Section isForLanding={true} class="bg-primary/10 py-20 rounded-2xl">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Cas Réels : Les Meilleures Communautés
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Exemple 1</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">👩‍💼 Groupe de Femmes Entrepreneures (2 000 membres)</h3>
        <p class="text-gray-700 mb-4">
          Vous présentez DiMarket aux femmes de votre groupe. Elles adorent. 30 d'entre elles deviennent des vendeurs actifs.
        </p>
        <div class="bg-green-50 border-l-4 border-green-500 p-4">
          <p class="text-sm font-bold text-gray-900">À partir du mois 2 :</p>
          <p class="text-xl font-bold text-green-700">30 × 1 000 FCFA = <strong>30 000 FCFA</strong></p>
        </div>
      </div>

      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="inline-block bg-yellow-300 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">Exemple 2</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">📱 Réseau Telegram de Créateurs de Contenu (500 membres)</h3>
        <p class="text-gray-700 mb-4">
          Les créateurs veulent monétiser leur audience. DiMarket leur permet de créer une store et vendre. 25 deviennent vendeurs.
        </p>
        <div class="bg-green-50 border-l-4 border-green-500 p-4">
          <p class="text-sm font-bold text-gray-900">À partir du mois 2 :</p>
          <p class="text-xl font-bold text-green-700">25 × 1 000 FCFA = <strong>25 000 FCFA/mois</strong></p>
        </div>
      </div>
    </div>
  </Section>

  <!-- FINAL CTA -->
  <PartnerCTA
    title="Prêt à Aider Votre Communauté ?"
    subtitle="Et à générer du revenu en le faisant"
    message="Rejoignez notre programme de partenaires et commencez à monétiser votre leadership communautaire."
    ctaLabel="Rejoindre le Programme"
    ctaHref="/partenaires/commencer"
  />
</div>
