<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Section from '$lib/components/Section.svelte';
    import {productCatagories} from "./categories"
	import type { Article } from '$lib/types';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
    const products: Article[] | any = data.products 
    

    let modalIsOpen = $state(false)

    const addProduct = () => {

    }
</script>

<h1>Bienvenue, <span class="text-3xl italic text-secondary">{data.user.name}</span></h1>

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
            ></ArticleCard>

        {:else}
          <p>Aucun produits</p>
        {/each}
       
    </div>
</div>
<Modal open={modalIsOpen} onConfirm={addProduct} close={() => modalIsOpen = false}>
  <div class="flex flex-col items-center gap-4">
    <Input 
     label="Nom du produit" 
     name="name"
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
    
    <label class="flex gap-2 items-center">
        image <Button size="sm">Importer l'image</Button>
     <input 
      name="image"
      type="file"
      class="hidden"
      required 
     />
    </label>

    <div>
        <Input list="categories" placeholder="Rechercher une categorie"></Input>
        <datalist id="categories">
            {#each productCatagories as category}
                <option value={category}></option>
            {/each}
        </datalist>
    </div>
 </div>
</Modal>