<script lang="ts">
	import { page } from '$app/state';
	import Button from '../lib/components/Button.svelte';
</script>

<h1>{page.status}: {page.error?.message}</h1>
<a href="{page.url.pathname}" class={page.status === 404 ? "hidden" : "my-4"}>
    <Button>Recharger la page</Button>
</a>
<a href="/">
    <Button>Aller à l'accueil</Button>
</a>

{#if page.url.pathname.startsWith("/vendeurs")}
  <a href="/vendeurs/dashboard" class="m-4">
    <Button>Acceder à mon tableau de bord</Button>
  </a>
{/if}
{#if page.url.pathname.startsWith("/partenaires")}
  <a href="/partenaires/dashboard" class="m-4">
    <Button>Acceder à mon tableau de bord</Button>
  </a>
{/if}