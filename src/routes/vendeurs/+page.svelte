<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import Section from "$lib/components/Section.svelte";
	import Steps from "$lib/components/Steps.svelte";
  import PricingCard from "$lib/components/PricingCard.svelte"
</script>

<svelte:head>
    <title>Créez votre boutiques en ligne !</title>
    <meta name="description" content="DiMarket est un marketplace qui vous permet de créer votre propre boutique en ligne afin d'avoir un business plus proffessionnel et un processus de vente facilité">

  <meta property="og:title" content={`DiMarket - Créez votre boutiques e-commerce optimisée pour l'Afrique et facilitez le processus de vente`} />
  <meta property="og:description" content="DiMarket est un marketplace qui vous permet de créer votre propre boutiques en ligne et facilitez la manière dont vos potentiels clients achètent" />
  <meta property="og:image" content="https://dimarket.biz/dimarket-landing.jpg" />
  <meta property="og:type" content="website" />
</svelte:head>


<div class="h-[67svh]">
<Hero>
    <h1>
      <p class="text-3xl">
       <span class="bg-secondary rotate-[20deg] bg-card p-2">Repensez</span><br>
       La manière dont vous vendez !
      </p>
</h1>
    <p>
       Créez votre propre boutique e-commerce et entourez vous
        d'un veritable écosystème d'outils 
       pour analyser, interpreter et ameliorer vos permormances.
    </p>
    <div class="w-full flex items-center flex-col justify-center gap-2 mt-2">
    <a href="/vendeurs/inscription">
    <Button class="my-4">Créer ma boutique</Button>
    </a>
    <a href="#tarifs">
      <Button size="md" variant="neutral">Voir nos Tarifs</Button>
    </a>
  </div>
</Hero>
</div>

<Section isForLanding={true}>
    <h2>C'est quoi DiMarket ?</h2>
    <p>
       <span class="font-bold italic text-[15px] text-[#000] text-md">
          DiMarket est une plateforme Africaine qui a pour mission de
       développer l'activité des commerçants en ligne</span> en vous permettant 
       d'avoir votre propres boutiques en ligne et tout l'outillage autour 
       pour vous aider à être plus productifs, proffessionnel et prendre les bonnes décisions tout en gagnant du temps. Le rêve quoi, non ?
    </p>
</Section>

{#snippet featureCard(image: string, name: string, text: string)}
    <div class="bg-card p-4 rounded-lg w-[300px]">
     <img 
         class="w-full rounded-lg h-[250px]"
         src="/illustrations/{image}.svg" 
         alt={name} />
      <h3 class="highlight italic">{name}</h3>
      <p>{text}</p>
    </div>
{/snippet}

<Section isForLanding={true}>
  <h2>Qu'est ce que DiMarket va changer pour vous ?</h2>
  <p>Un commerce organisé, digne de confiance et un futur vous moins débordé•e</p>
  <div class="flex gap-4 flex-wrap justify-center mt-4">
  {#each [
    {
        title: "Créez votre propre boutique en ligne",
        text: "Créez votre boutique en ligne en quelques minutes et ajoutez des produits en illimités",
        image: "online-store"
    },
    {
        title: "Partagez vos produits",
        text: "DiMarket est fait pour partager votre boutique et vos produits dans tout vos reseaux sociaux en un clique",
        image: "sharing"
    },
    {
        title: "Soyez plus proffessionnel au yeux de vos clients",
        text: "Démarquez vous de la masse. Avec une boutique en ligne, une vraie, vos potentiels clients sauront que vous êtes differents, plus organisé, donc plus apte à acheter chez vous",
        image: "trust"
    },
    {
      title: "Montrez votre respect envers vos clients",
      text: "Pour chaque produit, vos futurs clients pourront voir l'image du produit, son nom, sa description, son prix et plus encore, tout ça dans une page dédié afin de leur faciliter la tache à eux mais aussi à vous car vous n'aurez plus à répéter les mêmes conversations à chaque fois",
      image: "info"
    },
    {
      title: "Analysez vos performances, puis améliorez",
      text: "Au lieu de devoir déviner ce qui marche ou pas, DiMarket vous offre plusieurs outils pour analyser différents informations clés sur vos produits. Fini le tâtonnement",
      image: "data-analysis"
    },
    {
      title: "Pas juste une boutique,  un écosysteme",
      text: "DiMarket ne vous permet pas juste de créer une boutique,  mais de pouvoir analyser, faire des promotions, mais aussi avoir des suggestions d'axes d'améliorations",
      image: "ecosystem"
    },
    {
      title: "Une boutique découvrable par Google",
      text: "DiMarket est optimisé pour google afin de faire apparaître votre boutique et vos produits dans les résultats de recherche google",
      image: "search"
    }
  ] as feature}
    {@render featureCard(feature.image, feature.title, feature.text)}
  {/each}
</div>
</Section>

<Section isForLanding={true}>
    <h2 class="highlight">
        Comment je commence ?
    </h2>

    <Steps 
      steps={
        [
          {
            name: "Créez votre compte",
            description: "Inscrivez vous en tant que vendeur en quelques minutes: nom, numero, mot de passe et voilà"
          },
          {
            name: "Ajoutez vos produits",
            description: "Une fois connecté à DiMarket, remplissez votre boutique avec les produits que vous commercialisez"
          },
          {
            name: "Partager votre boutique et vos produits",
            description: "Juste un clique et vous pourrez partager vos produits sur vos reseaux, et si vous préférez les publicités, redirigez juste vers l'url de la page"
          },
          {
            name: "Analysez et ameliorez",
            description: "Rien n'est parfait du premier coup, c'est pourquoi nous avons fait pour vous des outils pour analyser vos performances et pouvoir savoir ce qui merite d'être amélioré"
          },
        ]
      }
    />
</Section>

<div class="h-[30px]" id="tarifs"></div>

<Section isForLanding={true}>
  <h2>Nos Tarifs</h2>
  <p>Investissez pour atteindre un business plus mature, stable et facile à gerer</p>

  <div class="flex justify-center gap-4 flex-wrap my-4">
    <PricingCard 
      title="Amateur"
      price="0 fcfa"
      period=""
      features={[
        "Créez votre boutique",
        "Ajoutez jusqu'a 15 produits",
        "Partagez vos produits sur vos réseaux"
      ]}
    >
     <a href="/vendeurs/inscription">
      <Button variant="neutral">Créer ma boutique</Button>
     </a>
     <p class="font-bold italic py-1">1mois d'essaie gratuit du plan Premium</p>
    </PricingCard>
    <PricingCard
      title="Premium"
      price="7k fcfa"
      highlighted={true}
      freeTrial={true}
      period="/mois"
      features={[
         "Tout sur le plan Basic",
         "Produits illimités",
         "Badge de vendeur vérifié",
         "Signe de professionnalisme chez vos clients",
         "Confiance accrue",
         "Prioritaire dans les résultats",
         //"Possiblité d'ajouter plusieurs images pour un produit",
         "Informations sur la performance (cliques, conversions...)",
         "Gestions des commandes",
         "Conseils pour améliorer vos ventes",
         "Possiblité de faire des promotions ",
         "Service clients plus reactif",
         "Du temps gagner pour l'acquisition de clients...",
         "Et pour les livraisons",
      ]}
    >
    <a href="/vendeurs/inscription">
      <Button variant="secondary">Essayer Gratuitement</Button>
    </a>
      <p class="py-1 font-bold italic">30 jours d'essaie gratuit</p>
    </PricingCard>
    <PricingCard 
      title="Entreprise"
      price="+99.000 fcfa"
      period="/mois"
      features={[
        "Tout sur Premium",
        "Accompagnement",
        "Extra services"
      ]}
    >
    <a 
      class="flex justify-center"
      href="https://wa.me/781878234?text=Salut l'équipe DiMarket. J'aimerais créer une boutique chez vous. Peut on en discuter ?">
    <Button variant="neutral">Contactez nous</Button>
    </a>
   </PricingCard>
  </div>
</Section>


<Section isForLanding={true} class="">
    <div class="flex flex-col gap-2 items-center border-4 border-card px-4 py-8 rounded-2xl">
    <h2 class="text-3xl">Ne rattez pas cette occasion !</h2>
    <p>
        Douze personnes nous font déjà confiance, pourquoi pas vous ?
    </p>
    <a href="/vendeurs/inscription">
    <Button class="mt-2">Commencer mon essaie de deux semaines</Button>
    </a>
    </div>
</Section>
