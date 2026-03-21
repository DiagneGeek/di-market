<script lang="ts">
    import Hero from "$lib/components/Hero.svelte";
    import Button from "$lib/components/Button.svelte"
    import Input from "$lib/components/Input.svelte"
    import BlogPostCard from "$lib/components/BlogPostCard.svelte";
import { getPosts } from '$lib/composables/getPosts'

  const posts = getPosts()
const modules = import.meta.glob('/src/content/blog/*.md', { eager: true })

</script>

<Hero>
    <h1>Recevez des <span class="font-fraunces opacity-50">conseils et astuces</span> pour devenir le meilleur</h1>
    <p>
        Bienvenue dans notre section dédiée aux vendeurs ! Ici, vous trouverez une mine d'information à propos de la vente en ligne
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
    {#each posts as post}
      <BlogPostCard 
        title={post.title}
        date={post.date}
        image={post.image}
        slug={post.slug}
      />
    {/each}
  </div>
</div>