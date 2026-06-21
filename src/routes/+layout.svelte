<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/Button.svelte';
	import NavBar from '../lib/components/NavBar.svelte';
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<div class="app">
	<NavBar>
		{#if !['/vendeurs/connection', '/vendeurs/inscription', '/partenaires/connexion', '/partenaires/inscription'].includes($page.url.pathname)}
			{#if $page.url.pathname === '/'}
				<a href="/commencer">Commencer</a>
				<a href="/ressources">Ressources</a>
			{:else if $page.url.pathname === '/commencer'}
				<span></span>
			{:else}
				<a href="/ressources">Ressources</a>
				<a href="/panier">Ma liste</a>
			{/if}
		{/if}
	</NavBar>

	<main
		class="mb-12 {!$page.url.pathname.startsWith('/ressources/')
			? 'mt-24 px-4 sm:mt-28'
			: 'mt-12 px-2'} mx-auto min-h-[60vh] w-full max-w-7xl"
	>
		{@render children()}
	</main>

	<footer class="mt-16 flex w-full justify-center border-t border-gray-200 bg-gray-50">
		<div class="mx-auto max-w-7xl px-6 py-8">
			<div class="text-center text-gray-600">
				<p>&copy; 2026 DiMarket. Tous droits réservés</p>
				<p class="mt-2">
					<a href="#" class="text-secondary hover:underline">Conditions d'utilisation</a>
					<span class="mx-2">|</span>
					<a href="#" class="text-secondary hover:underline">Politique de confidentialité</a>
				</p>
				<div class="my-4 flex justify-center gap-8">
					<div>
						<h4>Liens utiles</h4>
						<ul class="mt-2 space-y-1 text-left">
							<li><a href="/vendeurs/connection" class="hover:underline">Connexion Vendeurs</a></li>
							<li><a href="/partenaires" class="hover:underline">Espace Partenaires</a></li>
							<li><a href="/collections" class="hover:underline">Collections</a></li>
							<li><a href="/products" class="hover:underline">Produits</a></li>
						</ul>
					</div>

					<div>
						<h4>Ressources</h4>
						<ul class="mt-2 space-y-1 text-left">
							<li><a href="/ressources" class="hover:underline">Toutes nos ressources</a></li>
							<li><a href="/ressources/blog" class="hover:underline">Blog</a></li>
							<li><a href="/ressources/tutoriels" class="hover:underline">Tutoriels</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
