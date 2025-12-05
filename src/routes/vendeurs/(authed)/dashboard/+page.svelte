<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
    import {productCatagories} from "./categories"
	import type { Article } from '$lib/types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
  const products: Article[] | any = data.products 
    
  let modalIsOpen = $state(false)

  

  const addProduct = async (e: Event) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const imgInput = form.querySelector("#image-input") as HTMLInputElement
    const file = imgInput?.files?.[0];
      if (!file) return alert("Veuillez selectionner une image");
     formData.append("image", file)
     formData.append("seller_id", data?.user?.id?.toString() as string)
    
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
      window.location.reload()
    }
  }
</script>

<h1>Bienvenue <span class="text-3xl italic text-secondary">{data.user.name}</span></h1>

{#snippet insight(heading: string, subheadng: string)}
    <div class="flex flex-col gap-1 w-[100px]">
        <p class="text-xl font-bold text-amber-600 italic">{heading}</p>
        <p>{subheadng}</p>
    </div>
{/snippet}

<div
 class="flex items-center justify-between px-4  border-card border-2 rounded-3xl py-2">
  {@render insight(data.products ? data.products.length.toString() : '0', "produits")}
  <Button onclick={() => modalIsOpen = true}>Ajouter un produit</Button>
</div>

<div class="w-full flex justify-center my-8">
    <div class="w-full max-w-[900px] border-card border-2 rounded-3xl flex justify-center gap-4 flex-wrap p-4">
        {#each data.products as product}
            <ArticleCard
              title={product.title}
              seller={data.user.name}
              slug={product.slug}
              price={product.price}
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
     placeholder="Nom de votre produits"
     required 
    />
    <Input 
     label="Prix" 
     name="price"
     type="number"
     placeholder="Prix de votre produits"
     required 
    />
    
    <label class="max-w-full flex gap-2 items-center" for="image-input">
       <Button type="button" size="sm">Ajouter un image</Button>
    </label>
     <input 
      type="file"
      id="image-input"
      accept="image/*"
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
      placeholder="Decrivez votre produit"
      name="description"
      class="w-full"
    />
 </div>
</Modal>
