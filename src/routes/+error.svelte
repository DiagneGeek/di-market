<script lang="ts">
	import { page } from '$app/state';
	import Button from '../lib/components/Button.svelte';
</script>

<h1>{page.status}: {page.error?.message}</h1>
<a href="/vendeurs/dashboard">
    <Button>Recharger la page</Button>
</a>