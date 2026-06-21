<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import ShareCollectionCard from '$lib/components/ShareCollectionCard.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { productCatagories } from './categories';
	import type { Product } from '$lib/types';
	import type { PageProps } from './$types';
	import { browser } from '$app/environment';

	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { useToast } from '$lib/composables/useToast';

	let { data }: PageProps = $props();

	if ($page.url.searchParams.has('reload')) {
		window.location.href = '/vendeurs/dashboard/produits';
	}
	const products: Product[] | any = data.products.sort((a: Product, b: Product) => {
		return (
			parseInt(new Date(b.created_at).getTime().toString()) -
			parseInt(new Date(a.created_at).getTime().toString())
		);
	});
	const toast = useToast();
	const message =
		'Si tu veux créer ta collection en ligne gratuitement sans com mision, clique sur le lien: https://dimarket.biz/vendeurs';
</script>

<h1>Mes Produits</h1>

{#snippet insight(heading: string, subheadng: string)}
	<div class="flex w-[100px] flex-col items-center gap-1">
		<p class="text-xl font-bold text-amber-600 italic">{heading}</p>
		<p>{subheadng}</p>
	</div>
{/snippet}

<div class="flex items-center justify-between rounded-3xl border-2 border-card px-4 py-2">
	{@render insight(data.products ? data.products.length.toString() : '0', 'produits')}
	<a href="/vendeurs/dashboard/produits/ajouter">
		<Button>Ajouter un produit</Button>
	</a>
</div>

<div class="my-8 flex w-full justify-center">
	<div
		class="justi fy-center flex w-full max-w-[900px] flex-wrap gap-4 rounded-3xl border-2 border-card p-4"
	>
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
			<h2 class="text-2xl">Créez vos premiers produits</h2>
			<p>
				Avant de pouvoir voir n'importe quelle changement, vous aurez d'ab ord besoin d'ajouter vos
				produits à DiMarket
			</p>
			<a href="/vendeurs/dashboard/produits/ajouter">
				<Button>Ajouter mes produits</Button>
			</a>
		{/each}
	</div>
</div>
