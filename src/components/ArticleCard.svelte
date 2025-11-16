<script lang="ts">
	import { trimText } from "$lib/composables/trim";
	import Button from "./Button.svelte";

    const {title, seller, price, slug, img: imgSrc} = $props()
</script>

<article
  class="flex flex-col justify-between p-3 rounded-3xl bg-card gap-2 w-[280px] h-[350px] border-red-400"
>
 <div class="flex flex-col gap-2">
   <img 
     src={imgSrc} 
     alt={title} 
     class="w-full h-[180px] rounded-2xl"
    />
    <h2 class="text-2xl font-bold text-red-400">{trimText(title, 35)}</h2>
</div>
    <div class="flex flex-col justify-start mt-1 *:w-full">
        <p class="text-[12px] text-gray-400">By {seller}</p>
      
        <div class="flex justify-between items-center">
          <p>{price}fcfa</p>
          <a href={`/products/${slug}`}>
            <Button variant="neutral">Voir plus</Button>
          </a>
        </div>
    </div>
</article>