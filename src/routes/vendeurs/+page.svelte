<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import Section from "$lib/components/Section.svelte";
	import Steps from "$lib/components/Steps.svelte";

</script>

<svelte:head>
    <title>Créez votre boutiques en ligne et gagner des clients a travers internet</title>
    <meta name="description" content="DiMarket est un marketplace senegalais qui vous permet de creer votre propre boutiques en ligne et profiter d'internet et de google pour gagner jusqu'a 3x plus de clients">

  <meta property="og:title" content={`DiMarket - Créez votre boutiques en ligne gratuitement et facilitez le processus de vente`} />
  <meta property="og:description" content="DiMarket est un marketplace senegalais qui vous permet de creer votre propre boutiques en ligne et facilitez la manière dont vos potentiels clients achètent" />
  <meta property="og:image" content="https://dimarket.biz/dimarket-landing.jpg" />
  <meta property="og:type" content="website" />
</svelte:head>


<div class="h-[70svh]">
<Hero>
    <h1>
       Vendez  <span class="text-secondary italic">Vos produits</span><br> sur internet,
        Sans devoir payer une fortune !
    </h1>
    <p>
        DiMarket est un marketplace qui permet aux vendeurs senegalais comme vous 
        d'avoir une boutique en ligne
    </p>
    <a href="/vendeurs/inscription">
    <Button class="my-4">Créer ma boutique (gratuitement)</Button>
    </a>
</Hero>
</div>

<div class="flex justify-center items-center mt-4">
   <video
      class="w-full max-w-[600px] rounded-2xl border-2 border-card"
      src="/demo-for-sellers.mp4"
      poster="/demo-poster.jpg"
      controls
    ></video>
</div>

<Section isForLanding={true}>
    <h2>Ajouter juste vos produits; Et Nous faisons le reste !</h2>
    <p>
        DiMarket ne vous donne pas seulement la possibilte d'avoir une boutique en ligne, 
        mais vous aide aussi pour trouver des clients via notre optimization pour google et les multiples opportunitiés qu'il crée (ex: publicité Facebook, Instagram, partenariat...)
    </p>
</Section>

{#snippet featureCard(name: string, text: string)}
    <div class="bg-card p-4 rounded-lg w-[300px]">
      <h3 class="highlight italic">{name}</h3>
      <p>{text}</p>
    </div>
{/snippet}

<Section isForLanding={true}>
  <h2>Ce que nous vous offrons</h2>
  <div class="flex gap-4 flex-wrap justify-center mt-4">
  {#each [
    {
        title: "Créez votre propre boutiques en ligne",
        text: "DiMarket vous permet de creer votre propre boutique e-commerce en creant juste un compte, ajouter VOS produits comme vous le voulez et vendez à qui veut"
    },
    {
        title: "Gagner des clients via Google",
        text: "Notre site est optimiser pour Google, vous prmettant de gagner des clients meme en dormant"
    },
    {
        title: "Transformer les visiteurs en acheteur",
        text: "Nous permettons a vos futurs clients de vous contacter via whatsapp et de discuter de votre produit en cliquant juste sur un bouton reduisant ainsi la friction"
    }
  ] as feature}
    {@render featureCard(feature.title, feature.text)}
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
            name: "Creer votre compte",
            description: "Inscrivez vous en tant que vendeur gratuitement en quelques secondes"
          },
          {
            name: "Ajoutez vos produits",
            description: "Une fois connecté à DiMarket, ajouter vos produits pour qu'ils soit visible dans notre page d'accueuil"
          },
          {
            name: "Gagner des clients et de l'argent",
            description: "Faites voir au monde ce que vous vendez, et on s'occupe du reste pour que l'argent tombe dans vos poches"
          }
        ]
      }
    />
</Section>


<Section isForLanding={true} class="">
    <div class="flex flex-col gap-2 items-center border-4 border-card px-4 py-8 rounded-2xl">
    <h2 class="text-3xl">Ne rattez pas cette occasion !</h2>
    <p>
        Crée ta boutique en ligne et demarque toi par rapport aux autres
    </p>
    <a href="/vendeurs/inscription">
    <Button class="mt-2">M'inscrire</Button>
    </a>
    </div>
</Section>
