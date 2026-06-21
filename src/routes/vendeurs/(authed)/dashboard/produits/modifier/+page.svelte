
<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidateAll } from "$app/navigation"
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Button from '$lib/components/Button.svelte';
	import { productCatagories } from '../categories';
	import type { Product } from '$lib/types';
	import { useToast} from "$lib/composables/useToast"

	let { data } = $props();

	let slug = $page.url.searchParams.get('slug');
	let product: Product | undefined = $derived(data.products.find((p: Product) => p.slug === slug));

	let title = $state('');
	let description = $state('');
	let price = $state('');
	let category = $state('');
	let previewUrl = $state('');

	// Initialize values when product changes
	$effect(() => {
		if (product) {
			title = product.title || '';
			description = product.description || '';
			price = product.price || '';
			category = product.category || '';
			previewUrl = product.image || '';
		}
	});

	let selectedImage: File | null = $state(null);

	interface Detail {
		name: string,
		value: string
	}

	let details: Detail[] = $state.raw([]);

	// Initialize details from existing product
	$effect(() => {
		if (product?.details) {
			try {
				const parsed = typeof product.details === 'string' ? JSON.parse(product.details) : product.details;
				if (Array.isArray(parsed)) {
					details = [...parsed];
				}
			} catch (e) {
				console.error('Error parsing details:', e);
			}
		}
	});

	function handleImageChange(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		selectedImage = files && files.length ? files[0] : null;
		
		if (selectedImage) {
			previewUrl = URL.createObjectURL(selectedImage);
		} else {
			previewUrl = product?.image || '';
		}
	}

	let isSubmitting = $state(false);

	const updateProduct = async (e: Event) => {
		e.preventDefault();
		isSubmitting = true;
		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("id", product?.id as string);

		// Add details - filter out empty ones
		const validDetails = details.filter(detail => detail.name.trim() && detail.value.trim())
		if (validDetails.length > 0) {
			formData.append("details", JSON.stringify(validDetails))
		}
		

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
	  class="flex flex-col gap-4 p-4 bg-card rounded-2xl mx-auto max-w-md mt-4">
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

		<div class="flex flex-col gap-1">
			<label for="image" class="text-xs font-semi-bold text-gray">Image</label>
			{#if previewUrl}
				<img src={previewUrl} alt="Aperçu" class="w-32 h-32 object-cover rounded" />
			{/if}
			<input
				id="image"
				name="image"
				type="file"
				accept="image/*"
				onchange={handleImageChange}
				class="border border-gray-300 rounded-xl p-2 bg-input"
			/>
		</div>

		<div class="p-2 rounded-2xl shadow">
			<h3>Détails (optionnels)</h3>
			<p class="text-gray-500 text-[13px]">
				Vous pouvez ajouter des détails à votre produit (marque, état, modèle, taille etc) pour répondre aux questions et donner plus d'informations à vos clients.
			</p>

			{#each details as detail, index}
				<div class="flex gap-1 flex-wrap my-4 w-full max-w-[400px]">
					<Input 
						placeholder="ex: Modèle"
						value={detail.name}
						oninput={(e: Event) => {
							details[index].name = (e.target as HTMLInputElement).value
						}}
					/>
					<Input
						placeholder="ex: iPhone 14"
						value={detail.value}
						oninput={(e: Event) => {
							details[index].value = (e.target as HTMLInputElement).value
						}}
					/>
					<Button
						type="button"
						variant="danger"
						onclick={() => {
							details.splice(index, 1)
							details = [...details]
						}}
						label="Supprimer"
					/>
				</div>
				<hr class="w-full border-gray-300">
			{/each}
			<Button
				type="button"
				variant="sober"
				onclick={() => {
					details.push({name: "", value: ""})
					details = [...details]
				}}
				label="Ajouter un détail"
				class="mt-2"
			/>
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

