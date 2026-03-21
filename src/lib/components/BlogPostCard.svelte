<script lang="ts">
  import { trimText } from "$lib/composables/trim";
  import Button from "$lib/components/Button.svelte";
  const { title, date, image, slug, type="blog" } = $props();

  // Format date to a readable format
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<article
  class="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fadeIn w-full sm:w-[280px] h-auto sm:h-[420px] shadow-lg"
>
  <div class="flex flex-col gap-0 flex-1">
    <div class="relative h-[200px] overflow-hidden rounded-t-2xl">
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
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <div class="flex flex-col gap-3 p-5 flex-1">
      <h2 class="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {trimText(title, 50)}
      </h2>
      <p class="text-sm text-gray-500 font-medium">{formattedDate}</p>
    </div>
  </div>

  <a href="/ressources/{type}/{slug}" class="w-full px-5 pb-5">
    <Button
     class="w-full"
     variant="sober"
    >
      Lire l'article
    </Button>
  </a>
</article>
