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

	<main class="mb-6 mt-24 px-[20px] *:text-center">
		{@render children()}
	</main>

	<footer>
		
	</footer>
</div>
