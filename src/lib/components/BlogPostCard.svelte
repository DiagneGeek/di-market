<script lang="ts">
  import { trimText } from "$lib/composables/trim";
  import Button from "$lib/components/Button.svelte";
  const { title, description, date, image, slug, type="blog", tags="" } = $props();

  // Format date to a readable format
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<article
  class="group flex flex-col justify-between overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fadeIn w-full sm:w-[280px] h-auto sm:h-[420px]"
>
  <div class="flex flex-col gap-0 flex-1">
    <a href="/ressources/{type}/{slug}" class="relative h-[200px] overflow-hidden rounded-t-2xl">
      {#if image}
        <img
          src={image}
          alt={title}
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      {:else}
        <div
          class="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center"
        >
          <span class="text-slate-400 text-sm">Image non disponible</span>
        </div>
      {/if}
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>

    <div class="flex flex-col gap-0 p-2 flex-1">
      <h2 style="margin-top: 4px; margin-bottom: 0px !important;" class="group-hover:text-primary transition-colors duration-200">
        <span class="text-lg">{trimText(title, 50)}</span>
      </h2>
      <div class="-translate-y-0 text-[12px] text-gray-500 font-medium flex items-center gap-2">
        {#each tags.split(",").map((t: string) => t.trim()) as tag}
          <span class="p-1 px-3 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/5">
            {tag}
          </span>
        {/each}
        <span>{formattedDate}</span>
      </div>
      <p class="text-sm">
        {trimText(description, 100)}
      </p>
    </div>
  </div>

  <a href="/ressources/{type}/{slug}" class="w-full flex justify-end px-4 pb-5">
    <Button
     class="flex items-center gap-1 highlight"
     size="sm"
     variant="outline"
    >
      Lire la suite 
      <img src="/icons/arrow-right.svg" class="w-3" alt=">"/>
    </Button>
  </a>
</article>
