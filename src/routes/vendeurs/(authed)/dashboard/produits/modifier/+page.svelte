
<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidateAll } from "$app/navigation"
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Button from '$lib/components/Button.svelte';
	import { productCatagories } from '../categories';
	import type { Article } from '$lib/types';
	import { useToast} from "$lib/composables/useToast"

	let { data } = $props();

	let slug = $page.url.searchParams.get('slug');
	let product: Article | undefined = data.products.find((p: Article) => p.slug === slug);

	if (!product) {
		// Handle error, but for now assume it exists
	}

	let title = product?.title || '';
	let description = product?.description || '';
	let price = product?.price || '';
	let category = product?.category || '';

	let isSubmitting = $state(false);

	const updateProduct = async (e: Event) => {
		e.preventDefault();
		isSubmitting = true;
		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("id", product?.id as string);

		try {
			const response = await fetch('/vendeurs/dashboard/api/update', {
				method: 'PUT',
				body: formData
			});
			if (response.ok) {
				useToast().show("Produit modifié avec succès", "success", 5000)
				// Success, maybe redirect or show message
				goto(`/products/${product?.slug}?from=/vendeurs/dashboard/produits/${product?.slug}`)
				//invalidateAll()
			} else {
				alert('Erreur lors de la modification');
			}
		} catch (error) {
			alert('Erreur réseau');
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="flex flex-start">
<Button 
  onclick={() => history.back()}
  size="sm" 
  variant="outline">
  &lt Retour
</Button>
</div>

<div class="text-xl *:text-xl"><h2>Modifiez votre produit</h2></div>

{#if product}
	<form 
	  onsubmit={updateProduct} 
	  class="flex flex-col gap-4 p-4 bg-card rounded-2xl">
		<Input 
		  label="Titre" 
		  value={title} 
		  name="title" 
		  required />
		<Textarea 
		  label="Description" 
		  value={description} 
		  name="description" 
		  required />
		<Input 
		  label="Prix" 
		  type="number" 
		  value={price} 
		  name="price" 
		  required />
		<div class="flex flex-col gap-1">
			<label for="category" class="text-xs font-semi-bold text-gray">Catégorie</label>
			<select 
			   id="category" 
			   name="category"
			   class="border border-gray-300 rounded-xl p-4 bg-input" 
			   required>
				{#each productCatagories as cat}
					<option value={cat} selected={category === cat}>{cat}</option>
				{/each}
			</select>
		</div>
		<Button type="submit" disabled={isSubmitting}>
			{#if isSubmitting}
				Modification...
			{:else}
				Modifier le produit
			{/if}
		</Button>
	</form>
{:else}
	<p>Produit non trouvé.</p>
{/if}

