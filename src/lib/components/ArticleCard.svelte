<script lang="ts">
  import { trimText } from "../composables/trim";
  import Button from "./Button.svelte";

  const {title, seller, price, slug, img: imgSrc, id = null, description = null} = $props()
</script>

<article
  class="flex flex-col justify-between p-4 md:p-5 rounded-2xl bg-card gap-3 w-full sm:w-[280px] h-auto sm:h-[350px] card-shadow border border-gray-100/50 animate-fadeIn"
>
 <div class="flex flex-col gap-3 flex-1">
   <img 
     src={imgSrc} 
     alt={title} 
     class="w-full h-[160px] sm:h-[180px] rounded-xl object-cover transition-transform duration-300 hover:scale-105"
    />
    <h2 class="text-base sm:text-lg font-semibold text-heading leading-tight line-clamp-2">{trimText(title, 35)}</h2>
    {#if description}
      <p class="text-xs sm:text-sm text-gray-600 line-clamp-2 flex-grow">{description}</p>
    {/if}
</div>
    <div class="flex flex-col justify-end gap-3 w-full">
      <div class="flex justify-between items-center">
        <p class="text-xl sm:text-sm font-semibold text-primary">{Number(price).toLocaleString("fr-FR")} fcfa</p>
      </div>
      <a href={`${id ? "/vendeurs/dashboard/produits" : "/products"}/${slug}`} class="w-full">
        <Button variant="neutral" class="w-full">{id ? "Gérer" : "Voir plus"}</Button>
      </a>
    </div>
  </article>