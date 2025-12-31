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
       <span class="bg-secondary rotate-[12deg] bg-card p-2">Repensez</span><br>
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
       <span class="font-semibold italic text-sm">
          DiMarket est une plateforme Africaine qui a pour mission de
       développer l'activité des commerçants</span> en leurs permettant 
       d'avoir leurs propres boutiques en ligne et tout l'outillage autour 
       pour vous aider à prendre les bonnes décisions
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
  <h2>Qu'est ce que vous apporte DiMarket ?</h2>
  <p>De la creation de la boutique jusqu'au processus de vente, <strong>Nous sommes là</strong></p>
  <div class="flex gap-4 flex-wrap justify-center mt-4">
  {#each [
    {
        title: "Créez votre propre boutiques en ligne",
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
        text: "Démarquez vous de la masse. Avec une boutique en ligne, une vraie, vos potentiels clients sauront que vous êtes differents, plus organisé, donc plus apte à acheter",
        image: "trust"
    },
    {
      title: "Donnez aux clients, les infos qu'ils ont besoin",
      text: "Pour chaque produit, vos futurs clients pourront voir l'image du produit, son nom, sa description, son prix et plus encore, tout ça dans une page dédié",
      image: "info"
    },
    {
      title: "Analysez vos performances, puis améliorez",
      text: "DiMarket vous offre plusieurs outils pour analyser l'état de vos produits comme le nombre dr visite d'une page, le taux de conversion, le temps passer et bien d'autres informations",
      image: "data-analysis"
    },
    {
      title: "Pas juste une boutique,  un écosysteme",
      text: "DiMarket ne vous permet pas juste de créer une boutique,  mais de pouvoir analyser, faire des promotions, mais aussi avoir des suggestions d'axe d'amélioration",
      image: "ecosystem"
    },
    {
      title: "Une boutique découvrable par Google",
      text: "DiMarket est optimisé pour google afin de faire apparaître votre boutique et vos produits dans les résultats de recherche google, c'est cool non ?",
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
            description: "Juste un clique et vous pourrez partager vos produits sur vos reseaux, et i vous voulez, vous préférez les publicités, rediriger juste vers l'url de la page"
          },
          {
            name: "Analysez et ameliorez",
            description: "Rien n'est parfait au premier coup, c'est pourquoi nous avons fait pour vous des outils pour analyser vos performances et les améliorer en consequences"
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
      title="Minimal"
      price="0 fcfa"
      period=""
      features={[
        "Créez votre boutique",
        "Ajoutez jusqu'a 15 produits",
        "Partagez vos produits sur vos réseaux"
      ]}
    >
     <a href="/vendeurs/inscription">
      <Button variant="neutral">Créer une boutique</Button>
     </a>
     <p class="font-bold italic py-1">2 semaine d'essaie gratuit du plan Premium</p>
    </PricingCard>
    <PricingCard
      title="Premium"
      price="15k fcfa"
      highlighted={true}
      freeTrial={true}
      period="/mois"
      features={[
         "Tout sur le plan Basic",
         "Produits illimités",
         "Badge de vendeur vérifié",
         "Prioritaire dans les résultats",
         "Possiblité d'ajouter plusieurs images pour un produit",
         "Informations sur la performance (cliques, conversions...)",
         "Suggestions d'améliorations personnalisés",
         "Possiblité de definir des objectifs de ventes",
         "Possiblité de faire des reductions",
         "Service clients plus reactif"
      ]}
    >
    <a href="/vendeurs/inscription">
      <Button variant="secondary">Créer une boutique Proffesionnelle</Button>
    </a>
      <p class="py-1 font-bold">Avec deux semaines d'essaie gratuit</p>
    </PricingCard>
    <PricingCard 
      title="Entreprise"
      price=""
      period=""
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
