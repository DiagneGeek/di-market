<script lang="ts">
  import Hero from "$lib/components/Hero.svelte"
  import ArticleCard from "$lib/components/ArticleCard.svelte"

  const {data} = $props()
</script>

<Hero>
<h1>
  Bienvenue dans la boutique de 
  <span class="highlight">
   {data?.seller?.name}
  </span>
</h1>
</Hero>

<h2 class="mb-4">Mes produits</h2>


