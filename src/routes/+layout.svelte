<script lang="ts">
	import "../app.css"
	import Button from "$lib/components/Button.svelte"
	import NavBar from "../lib/components/NavBar.svelte";
	import { page } from "$app/stores"
	let { children } = $props();
</script>

<div class="app">
	<NavBar>
	{#if !["/vendeurs/connection", "/vendeurs/inscription", "/partenaires/connexion", "/partenaires/inscription"].includes($page.url.pathname)}
	  {#if $page.url.pathname !== "/"}	  
	  <a href="/panier">Panier</a>
      <a href="/collections">Collections</a>
	  <a href="/products">Produits</a>
	  <a href="/ressources">
	    Ressources
	 </a>
	 {:else}
	  <a href="/vendeurs/connection">
	    <Button size="md">Se connecter</Button>
	  </a>
	 {/if}
	 {/if}
	</NavBar>

	<main class="mb-12 {!$page.url.pathname.startsWith("/ressources/") ? "mt-24 sm:mt-28 px-4" : "mt-12 px-4"} max-w-7xl mx-auto w-full min-h-[60vh]">
		{@render children()}
	</main>

	<footer class="bg-gray-50 border-t w-full flex justify-center border-gray-200 mt-16">
		<div class="max-w-7xl mx-auto px-6 py-8">
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
							<li><a href="/ressources/guides" class="hover:underline">Guides</a></li>
							<li><a href="/ressources/tutoriels" class="hover:underline">Tutoriels</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
