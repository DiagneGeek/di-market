<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
    import {productCatagories} from "./categories"
	import type { Article } from '$lib/types';
	import type { PageProps } from './$types';
    import { page } from "$app/stores"
	import { invalidateAll } from '$app/navigation';
  import { useToast } from "$lib/composables/useToast"

	let { data }: PageProps = $props();
  const products: Article[] | any = data.products
  let hasFile = $state(false)
  let descriptionLength = $state(0)

    if ($page.url.searchParams.get("reload")){
      invalidateAll()
    }

    const toast = useToast()
  const message = "Si tu veux créer ta collection en ligne gratuitement sans commision, clique sur le lien: https://dimarket.biz/vendeurs"
    
  let modalIsOpen = $state(false)

  async function resizeImage(file: any, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
        width *= ratio;
        height *= ratio;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob failed'));
        }, file.type, 0.8);
      };
      img.onerror = reject;
    });
  }

  const addProduct = async (e: Event) => {
    e.preventDefault()
    if (descriptionLength < 40) toast.show("Il est conseiller d'avoir des descriptions plus détaillés", "info", 6000)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const imgInput = form.querySelector("#image-input") as HTMLInputElement
    const file = imgInput?.files?.[0];
      if (!file) return alert("Veuillez selectionner une image");
     const resized: any = await resizeImage(file)
     formData.append("image", resized)
     formData.append("seller_id", data?.user?.id?.toString() as string)
     formData.append("user", JSON.stringify(data?.user))
     formData.append("products", JSON.stringify(data?.products))
    
    try {
      const res = await fetch("/vendeurs/dashboard/api/add", {
         method: "POST",
         body: formData
      })
      if (!res.ok) {
         const errorData = await res.json().catch(() => null)
        throw new Error(JSON.stringify(errorData))
      }
      
    } catch (error) {
      alert(`Erreur lors de l'ajout du produit: ${error}`)
    } finally {
      modalIsOpen = false
      toast.show("Produit ajouté", "success", 5000)
      location.reload()
    }
  }
</script>

<h1>Mes Produits</h1>

{#snippet insight(heading: string, subheadng: string)}
    <div class="flex flex-col items-center  gap-1 w-[100px]">
        <p class="text-xl font-bold text-amber-600 italic">{heading}</p>
        <p>{subheadng}</p>
    </div>
{/snippet}

<div
 class="flex items-center justify-between px-4  border-card border-2 rounded-3xl py-2">
  {@render insight(data.products ? data.products.length.toString() : '0', "produits")}
  <Button onclick={() => modalIsOpen = true}>Ajouter un produit</Button>
</div>
<a href="/collections/{data.user.id}" class="my-4 flex justify-center items-center">
  <Button variant="neutral">Voir Ma Collection</Button>
</a>

<div class="w-full flex justify-center my-8">
    <div class="w-full max-w-[900px] border-card border-2 rounded-3xl flex justify-center gap-4 flex-wrap p-4">
        {#each data.products as product}
            <ArticleCard
              title={product.title}
              seller={data.user.name}
              slug={product.slug}
              price={product.price}
              description={product.description}
              img={product.image}
              id={product.id}
            ></ArticleCard>

        {:else}
          <p>Aucun produits</p>
        {/each}
       
    </div>
</div>
<Modal onSubmit={addProduct} open={modalIsOpen} close={() => modalIsOpen = false}>
  <div class="flex flex-col items-center gap-4">
    <Input 
     label="Nom du produit" 
     name="title"
     minlength="5"
     placeholder="Nom de votre produit"
     required 
    />
    <Input 
     label="Prix" 
     name="price"
     type="number"
     placeholder="Prix de votre produit"
     required 
    />
    
    <label class="max-w-full flex gap-2 items-center" for="image-input">
       <Button 
         onclick={() => {
            const el = document.querySelector("#image-input") as HTMLInputElement
            if (el) el.click()
          }}
         type="button" 
         size="sm">{hasFile ? "Ajouté 👍" : "Ajouter une image"}</Button>
    </label>
     <input 
      type="file"
      id="image-input"
      accept="image/*"
      class="hidden"
      onchange={() => hasFile = true}
      required 
     />

    <div>
        <Input 
         list="categories" required
         name="category"
         placeholder="Choisir une categorie"></Input>
        <datalist id="categories">
            {#each productCatagories as category}
                <option value={category}></option>
            {/each}
        </datalist>
    </div>

    <Textarea 
      placeholder="Decrivez votre produit (minimum 40 lettres et symboles)"
      name="description"
      class="w-full"
      oninput={({target} : {target: HTMLTextAreaElement}) => descriptionLength = target?.value.trim().length}
    />
    <p class="w-full mt-[-8px] text-right px-4 {descriptionLength < 40 ? "text-red-400" : "text-green-400"}">{descriptionLength} caractère(s)</p>
 </div>
</Modal>
