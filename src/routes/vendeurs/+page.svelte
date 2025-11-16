<script lang="ts">
	import Button from "../../components/Button.svelte";
	import Hero from "../../components/Hero.svelte";
	import Section from "../../components/Section.svelte";

</script>

<svelte:head>
    <title>Creez votre boutiques en ligne et gagner des clients a travers internet</title>
    <meta name="description" content="DiMarket est un arketplace senegalais qui vous permet de creer votre propre boutiques en ligne et profiter d'internet et de google pour gagner jusqu'a 3x plus de clients">
</svelte:head>


<div class="h-[70svh]">
<Hero>
    <h1>
       Vendez  <span class="text-secondary italic">Vos produits</span> sur internet,<br>
        Meme en dormant
    </h1>
    <p>
        DiMarket est un marketplace qui permet aux vendeurs senegalais comme vous 
        d'avoir une boutique en ligne et de profiter de notre influence pour gagner de nouveaux clients
    </p>
    <a href="/vendeurs/inscription">
    <Button _class="my-4">Je veux avoir ma boutique en ligne</Button>
    </a>
</Hero>
</div>

<Section isForLanding={true}>
    <h2>Ajouter juste vos produits; Et Nous faisons le reste !</h2>
    <p>
        DiMarket ne vous donne pas seulement la possibilte d'avoir une boutique en ligne, 
        mais vous aide aussi pour trouver des clients via notre optimization pour google et notre presence en ligne
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
        title: "Ayez votre propre boutiques en ligne",
        text: "DiMarket vous permet de creer votre propre boutique e-commerce en creant juste un compte, ajouter modifier et supprimer VOS produits comme vous le voulez"
    },
    {
        title: "Gagner des clients via Google",
        text: "Notre site est optimiser pour Google, vous prmettant de gagner des clients meme en dormant"
    },
    {
        title: "Des clients qui viennent de nos reseaux",
        text: "Profiter de notre influence sur les reseaux pour figurer dans nos posts et story pour gagner des dizaines de clients en un jours"
    },
    {
        title: "Transformer les visiteurs en acheteur",
        text: "Nous permettons a vos futurs clients de vous contacter via whatsapp et de discuter de votre produit"
    }
  ] as feature}
    {@render featureCard(feature.title, feature.text)}
  {/each}
</div>
</Section>

{#snippet step(index: number, step: {name: string, description: string})}
    <div class="flex flex-col items-center gap-2">
        <p class="w-3 h-3 rounded-full bg-slate-50">{index + 1}</p>
    </div>
{/snippet}

<Section isForLanding={true}>
  <div class="w-full flex flex-col items-center bg-slate-900 p-6">
    <h2>
        <span class="text-slate-50 text-3xl">
        Comment je commence ?
        </span>
    </h2>


    <Button>Je commence !</Button>
  </div>
</Section>