<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  const {data} = $props()
  const sellers = data.sellers || []
</script>

<svelte:head>
  <title>Decouvrez toutes les boutiques créées avec DiMarket</title>
  <meta name="description" content="Explorer les boutiques de nos illustres vendeurs" />
</svelte:head>

<Hero>
<h1>Decouvrez Nos Illustres Vendeurs</h1>
</Hero>

{#if data.error}
  <h3>Une erreur c'est produite</h3>
   <p>{JSON.stringify(data.error)}</p>
{/if}

<section class="flex justify-center gap-4 flex-wrap">
  {#each sellers as seller}
   <div class="bg-card p-4 rounded-2xl shadow w-[300px] flex flex-col gap-6">
     <h2 class="text-secondary">{seller.name}</h2>
     <p class="flex p-2 rounded-xl bg-bg-2 justify-between">
       <span>Telephone:</span>
       <span>{seller.phone}</span>
     </p>

     <a 
       class="highlight"
         href="/boutiques/{seller.id}"
    >
       Decouvrir sa boutique
      </a>
   </div>
  {/each}
</section>
