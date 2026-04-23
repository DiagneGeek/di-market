<script lang="ts">
    import Hero from "$lib/components/Hero.svelte";
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import BlogPostCard from "$lib/components/BlogPostCard.svelte";
    import { getGuides } from '$lib/composables/getGuides'

  const guides = getGuides()
</script>

<Hero>
    <h1>Explorez nos <span class="font-fraunces opacity-50">guides complets</span></h1>
    <p>
        Des guides exhaustifs pour maîtriser tous les aspects de votre activité commerciale en ligne
    </p>
    <br>
   <div class="p-4 rounded-2xl bg-white shadow-lg backdrop-blur-sm flex gap-4 justify-center flex-wrap items-center">
    <Input 
      placeholder="Rechercher..."
      class="flex-1 w-full"
    />
    <Button class="w-full sm:w-auto" variant="neutral">Rechercher</Button>
    </div>
</Hero>

<div class="max-w-7xl mx-auto px-4 py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each guides as guide}
      <BlogPostCard 
        title={guide.title}
        date={guide.date}
        image={guide.image}
        slug={guide.slug}
        type="guides"
        tags={guide?.tags || ""}
        description={guide.description}
      />
    {/each}
  </div>
</div>