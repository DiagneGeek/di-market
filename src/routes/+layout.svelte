<script lang="ts">
	import "../app.css"
	import NavBar from "../lib/components/NavBar.svelte";
	let { children } = $props();
</script>

<div class="app">
	<NavBar>
      <a href="/vendeurs" class="text-[14px]">Pour les vendeurs</a>
	</NavBar>

	<main class="mb-6 mt-24 px-[20px] *:text-center">
		{@render children()}
	</main>

	<footer>
		
	</footer>
</div>
