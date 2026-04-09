<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/components/Button.svelte";
  import GainBar from "$lib/components/GainBar.svelte";
  import PartnerCTA from "$lib/components/PartnerCTA.svelte";
  import ScrollHighlight from "$lib/components/ScrollHighlight.svelte";

  const benefits = [
    {
      icon: "💼",
      title: "Revenu Récurrent",
      description: "1 000 FCFA par mois pendant un an par client vendeur actif, chaque mois. Pour chaque client que vous aidez."
    },
    {
      icon: "📈",
      title: "Synergie Parfaite",
      description: "Complément naturel à vos services web/digital. Vos clients obtiennent une solution complète."
    },
    {
      icon: "⚙️",
      title: "API Complète",
      description: "Intégration white-label complète. Votre marque, notre puissance. Documentation et support pro."
    },
    {
      icon: "🎯",
      title: "Zéro Complexité",
      description: "Partagez un lien simple ou intégrez via API. Nous gérons le reste. Vous gagnez."
    }
  ];

  let clientCount = $state(15);
  const conversionRate = 0.60; // 60% of clients become sellers
  const activeAfterTrial = 0.85; // 85% stay active after trial
  const monthlyVendors = () => Math.floor(clientCount * conversionRate);
  const activeVendors = () => Math.floor(monthlyVendors() * activeAfterTrial);
  const monthlyEarnings = () => activeVendors() * 1000;
  const yearlyEarnings = () => monthlyEarnings() * 12;
</script>

<svelte:head>
  <title>Partenaires Agences - DiMarket</title>
  <meta name="description" content="Programme pour les agences digitales. Gagnez 1 000 FCFA par mois pendant un an par client vendeur référé. Intégration simple ou white-label." />
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- HERO SECTION -->
  <Hero>
    <p class="mx-auto text-xs text-center h-full mb-4 border border-card bg-primary/50 py-2 rounded-full">
      <span class="scale-[2] h-full mr-2 animate-pulse inline-block">●</span>Pour les agences digitales
    </p>

    <h1 class="mb-6 leading-tight">
      Transformez vos clients<br />
      <span class="font-fraunces bg-secondary">En source de revenus</span>
    </h1>

    <p class="leading-relaxed mx-auto">
      Vous avez des clients web ? Proposez-leur DiMarket comme solution de vente en ligne. Gagnez 1 000 FCFA par mois pendant un an par client qui devient un vendeur actif, chaque mois.
    </p>

    <div class="bg-white rounded-2xl p-8 mb-12 max-w-md mx-auto">
      <div class="flex gap-1 flex-col">
        <Button
          label="Rejoindre le Programme"
          onclick={() => window.location.href = '/partenaires/commencer'}
        />
      </div>
      <p class="text-xs text-gray-500 mt-2">
      Aucun frais. Commencez maintenant.
      </p>
    </div>

    <!-- Stats Pills -->
    <div class="flex flex-wrap justify-center gap-8 text-center">
      {#each [
        { icon: '🏢', text: '<strong class="font-fraunces text-lg">Pour les agences</strong><br> Et prestataires' },
        {
          icon: '💰',
          text: '<strong class="font-fraunces text-lg">1 000 FCFA/mois</strong><br> Par client actif'
        },
        { icon: '🚀', text: '<strong class="font-fraunces text-lg">Revenu Récurrent</strong><br> Chaque mois' }
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

  <!-- PROBLEM SECTION-->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Vous avez des clients web<br/>
      <span class="font-fraunces opacity-70">mais vous ne monétisez que une fois</span>
    </h2>
    <p class="text-center text-gray-600 mb-12 text-lg">
      Et vos clients leur coûtent gros pour vendre
    </p>

    <div class="max-w-2xl mx-auto space-y-4 px-4">
      <ScrollHighlight once>
        <p class="text-lg">
          Vous créez de beaux sites web pour vos clients ; vous leur faites peut-être du SEO. Mais après, c'est fini.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Vos clients vous paient une seule fois pour le site, puis ils partent se débrouiller tout seuls.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Pendant ce temps, vos clients luttent pour vendre en ligne. Ils payent des commissions ridicules à des marketplaces, ou ils n'arrivent pas à organiser leurs ventes.
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg">
          Vous pourriez les aider... mais ce n'est pas vraiment votre métier, n'est-ce pas ?
        </p>
      </ScrollHighlight>

      <ScrollHighlight once>
        <p class="text-lg text-secondary font-semibold">
          Et si vous pouviez leur proposer une solution prête, ET en être rémunéré chaque mois ?
        </p>
      </ScrollHighlight>
    </div>
  </Section>

  <!-- SOLUTION SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Le Partenariat DiMarket Pour Agences
    </h2>

    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-card rounded-2xl p-6 sm:p-8">
        <div class="flex gap-4 items-start">
          <span class="text-4xl flex-shrink-0">1️⃣</span>
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Vous présentez DiMarket à vos clients</h3>
            <p class="text-gray-700">
              Pendant vos réunions de suivi ou via email. "Voici comment vous pouvez commencer à vendre en ligne rapidement."
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
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ils s'inscrivent via votre lien</h3>
            <p class="text-gray-700">
              Simple. Vous partagez votre lien de parrain unique. Chaque client qui s'inscrit via ce lien vous est associé.
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
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ils vendent. Vous gagnez. Chaque mois.</h3>
            <p class="text-gray-700">
              Après la période d'essai, chaque client actif vous rapporte 1 000 FCFA mensuels pendant un an. Revenus récurrents, zéro effort additionnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- BENEFITS SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Pourquoi Ça Marche Pour Vous
    </h2>
    <p class="text-center text-gray-600 mb-12">
      C'est simple, complémentaire, et rentable
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
      Basé sur le nombre de clients que vous avez
    </p>

    <div class="max-w-2xl mx-auto bg-white border-2 border-card rounded-2xl p-8">
      <div class="mb-8">
        <label for="clients" class="block text-sm font-semibold text-gray-700 mb-4">
          Nombre de clients que vous avez :
        </label>
        <input
          id="clients"
          type="range"
          bind:value={clientCount}
          min="5"
          max="100"
          step="1"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="text-center mt-4">
          <p class="text-2xl font-bold font-fraunces text-primary">{clientCount} clients</p>
        </div>
      </div>

      <!-- Breakdown -->
      <div class="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À 60% qui deviennent vendeurs :</span>
          <span class="font-bold">{monthlyVendors()} nouveaux/mois</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-700">À 85% rétention :</span>
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

  <!-- INTEGRATION SECTION -->
  <Section isForLanding={true} class="py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      Deux Façons D'Intégrer
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Choisissez ce qui correspond à votre workflow
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">📱 Simple : Lien Direct</h3>
        <p class="text-gray-700 mb-6">
          Partagez un lien. Zéro intégration. Zéro code. Vos clients cliquent, s'inscrivent, et commencent à vendre.
        </p>
        <div class="space-y-3 text-sm text-gray-700 mb-6">
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Setup en 5 minutes</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Aucune maintenance</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Parfait pour commencer</span>
          </div>
        </div>
        <Button label="Commencer" onclick={() => window.location.href = '/partenaires/commencer'} />
      </div>

      <div class="bg-white border-2 border-primary rounded-2xl p-6 sm:p-8 relative">
        <div class="absolute top-4 right-4 bg-primary text-gray-900 px-3 py-1 rounded-full text-xs font-bold">PRO</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">⚙️ Pro : White-Label API</h3>
        <p class="text-gray-700 mb-6">
          Intégrez DiMarket directement dans votre plateforme. Votre marque, votre UI, notre puissance.
        </p>
        <div class="space-y-3 text-sm text-gray-700 mb-6">
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Marketplace sous votre marque</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>API complète et documentée</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-green-600 font-bold">✓</span>
            <span>Support développeur 24/7</span>
          </div>
        </div>
        <Button label="Discuter d'une Intégration" onclick={() => window.location.href = 'https://wa.me/221781878234'} />
      </div>
    </div>
  </Section>

  <!-- USE CASE SECTION -->
  <Section isForLanding={true} class="bg-primary/10 py-20 rounded-2xl">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
      Cas Réal : Agence Web Standard
    </h2>

    <div class="max-w-4xl mx-auto">
      <div class="bg-white border-2 border-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <p class="text-sm text-gray-600 font-bold mb-2">SITUATION</p>
          <p class="text-lg text-gray-900">
            Vous êtes une agence web avec 20 clients PME/petits commerces. Vous les servez bien, mais une fois le site livré, il n'y a pas de nouvelles missions.
          </p>
        </div>

        <div class="border-t pt-6">
          <p class="text-sm text-gray-600 font-bold mb-2">ACTION</p>
          <p class="text-lg text-gray-900">
            Lors de votre prochaine réunion de suivi, vous mentionnez DiMarket. "Vous vendiez sur WhatsApp avant. Vous pouvez maintenant vendre avec une vraie plateforme, directement depuis votre site."
          </p>
        </div>

        <div class="border-t pt-6">
          <p class="text-sm text-gray-600 font-bold mb-2">RÉSULTAT (MOIS 2+)</p>
          <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p class="text-sm text-gray-600 mb-2">12 de vos 20 clients deviennent vendeurs actifs</p>
            <p class="text-3xl font-bold text-green-700">12 × 1 000 FCFA = <strong>12 000 FCFA/mois</strong></p>
            <p class="text-sm text-gray-600 mt-3">144 000 FCFA/an. Sur les mêmes clients.</p>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- HOW TO SUCCEED SECTION -->
  <Section isForLanding={true} class="bg-gray-50 py-20">
    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
      💡 Comment Réussir
    </h2>
    <p class="text-center text-gray-600 mb-12">
      Les agences partenaires qui gagnent le plus font ceci
    </p>

    <div class="max-w-4xl mx-auto space-y-4">
      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">1. Positionnez-le Pendant les Réunions de Suivi</h3>
        <p class="text-gray-700 text-sm">
          C'est le moment parfait. "Voici comment vous pouvez transformer votre présence en ligne."
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">2. Offrez une Démonstration Simple</h3>
        <p class="text-gray-700 text-sm">
          Montrez la création d'une collection en 5 minutes. Vos clients voient la valeur immédiatement.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">3. Utilisez Notre Support</h3>
        <p class="text-gray-700 text-sm">
          Vos clients rencontrent un problème ? Vous pouvez nous appeler. Nous supportons vos clients aussi.
        </p>
      </div>

      <div class="bg-white border border-card rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 class="font-bold text-gray-900 mb-2">4. Suivez Leurs Progrès</h3>
        <p class="text-gray-700 text-sm">
          Partagez le lien du dashboard DiMarket avec vos clients. Ils voient leurs ventes augmenter en temps réel.
        </p>
      </div>
    </div>
  </Section>

  <!-- GAIN CALCULATOR -->
  <div id="gain-calculator">
    <GainBar />
  </div>

  <!-- FINAL CTA -->
  <PartnerCTA
    title="Prêt à Monétiser Vos Clients ?"
    subtitle="Transformez-les en source de revenus récurrents"
    message="Rejoignez notre programme de partenaires agences. Nous vous fournissons tous les outils et support dont vous avez besoin."
    ctaLabel="Rejoindre le Programme"
    ctaHref="/partenaires/commencer"
  />
</div>
