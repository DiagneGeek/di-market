<script lang="ts">
	import "../app.css"
	import NavBar from "../lib/components/NavBar.svelte";
	let { children } = $props();
</script>

<div class="app">
	<NavBar>
      <a href="/vendeurs">Pour les vendeurs</a>
	  <a href="/boutiques">Boutiques</a>
	</NavBar>

	<main class="mb-6 mt-24 *:text-center">
		{@render children()}
	</main>

	<footer>
		
	</footer>
</div>