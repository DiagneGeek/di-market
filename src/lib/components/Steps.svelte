<script lang="ts">
    const {steps, ...rest} = $props()
</script>


{#snippet step(index: number, content: {name: string, description: string})}
     <div class="flex flex-col items-center gap-2 w-[300px] bg-linear-to-b from-transparent to-secondary/25 p-4 rounded-xl">
         <p class="w-6 h-6 flex justify-center items-center font-bold rounded-full bg-slate-50">{index + 1}</p>
         <h3><span class="text-secondary">{content.name}</span></h3>
         <p class="text-t-white">{content.description}</p>
     </div>
{/snippet}

<div class="w-full my-8 flex flex-col bg-neutral-950 items-center gap-16 px-4 py-12 rounded-3xl relative overflow-hidden" {...rest}>
    {#each steps as _step, index}
        {@render step(index, _step)}
      {/each}
</div>