<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

    const {children, data} = $props()
</script>

<div>
<NavBar>
  <a href="/vendeurs/profile">
    <Button variant="neutral">
      Profile 
     <span class="bg-secondary/25 p-2 shadow rounded-full font-bold">
        {data.user.name.slice(0, 2).toUpperCase()}
     </span>
    </Button>
  </a>
</NavBar>

<main>
{@render children()}
</main>
</div>
