<script lang="ts">
  const { children } = $props();
  let showAll = $state(false)
</script>


<div class="relative max-w-4xl border-2 border-card rounded-xl overflow-hidden pt-2 ">
  <p class="w-full {showAll ? "h-auto" : "h-28"} text-left overflow-hidden p-2">
    {@render children()}
  </p>
  {#if !showAll}
    <div class="absolute z-0 bottom-[30px] left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
  {/if}
  <button
    onclick={() => showAll = !showAll}
    class="bg-card relative z-1 mt-4 cursor-pointer p-2 w-full rounded-xl">
     {showAll ? "Voir moins" : "Voir plus"}
  </button>
</div>
