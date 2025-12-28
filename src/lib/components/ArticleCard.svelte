<script lang="ts">
  import { trimText } from "../composables/trim";
  import Button from "./Button.svelte";

  const {title, seller, price, slug, img: imgSrc, id = null, description = null} = $props()
</script>

<article
  class="flex flex-col justify-between p-3 rounded-3xl bg-card gap-2 w-[280px] h-[350px] border-red-400"
>
 <div class="flex flex-col gap-2">
   <img 
     src={imgSrc} 
     alt={title} 
     class="w-full h-[180px] rounded-2xl object-cover"
    />
    <h2 class="text-xl font-bold text-red-400">{trimText(title, 35)}</h2>
</div>
    <div class="flex flex-col justify-start mt-1 *:w-full">
      
        <div class="flex justify-between items-center">
          <p>{Number(price).toLocaleString("fr-FR")}fcfa</p>
          <a href={`${id ? "/vendeurs/dashboard/produits" : "/products"}/${slug}`}>
            <Button variant="neutral">{id ? "Gérer >" : "Voir plus"}</Button>
          </a>
        </div>
    </div>
  </article>