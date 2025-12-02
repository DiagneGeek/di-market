<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  const sellers = []
</script>

<Hero>
<h1>Decouvrez Nos Illustres Vendeurs</h1>
</Hero>

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
         href="/boutiques/{seller.name}?id={seller.id}"
    >
       Decouvrir sa boutique
      </a>
   </div>
  {/each}
</section>
