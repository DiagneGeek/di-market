<script lang="ts">
    import Hero from "$lib/components/Hero.svelte";
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import BlogPostCard from "$lib/components/BlogPostCard.svelte";
    import { getTutorials } from '$lib/composables/getTutorials'

  const tutorials = getTutorials()
</script>

<Hero>
    <h1>Découvrez nos <span class="font-fraunces opacity-50">tutoriels</span> pratiques</h1>
    <p>
        Apprenez étape par étape comment optimiser votre activité de vente en ligne grâce à nos tutoriels détaillés
    </p>
    <br>
   <div class="p-4 rounded-2xl bg-white shadow-lg backdrop-blur-sm flex gap-4 justify-center flex-wrap items-center">
    <Input 
      placeholder="Rechercher..."
      class="flex-1 w-full m-0"
    />
    <Button class="w-full sm:w-auto m-0" variant="neutral">Rechercher</Button>
    </div>
</Hero>

<div class="max-w-7xl mx-auto px-4 py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each tutorials as tutorial}
      <BlogPostCard 
        title={tutorial.title}
        date={tutorial.date}
        image={tutorial.image}
        slug={tutorial.slug}
        type="tutoriels"
        tags={tutorial?.tags || ""}
        description={tutorial.description}
      />
    {/each}
  </div>
</div>