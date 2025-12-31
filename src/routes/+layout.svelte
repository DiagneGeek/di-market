<script lang="ts">
	import "../app.css"
	import Button from "$lib/components/Button.svelte"
	import NavBar from "../lib/components/NavBar.svelte";
	import { page } from "$app/stores"
	let { children } = $props();
</script>

<div class="app">
	<NavBar>
	{#if !["/vendeurs/connection", "/vendeurs/inscription"].includes($page.url.pathname)}
	  <a href="/boutiques">Boutiques</a>
	  {#if $page.url.pathname !== "/vendeurs"}
      <a href="/vendeurs" class="text-[14px]">
	    <Button size="sm">Créer ma boutique</Button>
	 </a>
	 {:else}
	  <a href="/vendeurs/connection">
	    <Button size="md">Se connecter</Button>
	  </a>
	 {/if}
	 {/if}
	</NavBar>

	<main class="mb-12 mt-24 sm:mt-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
		{@render children()}
	</main>

	<footer class="bg-gray-50 border-t border-gray-200 mt-16">
		<div class="max-w-7xl mx-auto px-6 py-8">
			<div class="text-center text-gray-600">
				<p>&copy; 2025 DiMarket. Tous droits réservés.</p>
				<p class="text-sm mt-2">La plateforme qui réunit vos boutiques préférées</p>
			</div>
		</div>
	</footer>
</div>
