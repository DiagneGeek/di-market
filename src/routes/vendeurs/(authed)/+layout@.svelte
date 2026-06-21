<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
  import {page} from "$app/stores"
	import Toast from '$lib/components/Toast.svelte';
import posthog from 'posthog-js'
import { browser } from '$app/environment';

  if (browser) {
      posthog.init(
        'phc_9jWIHnBxG3UB30XPaefs17euzBn9bBiXlsu2UWShlSP',
        {
            api_host: 'https://us.i.posthog.com',
            defaults: '2025-11-30',
            person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
        }
      )
     if ($page.url.searchParams.has("identified")) {
        const search = $page.url.searchParams
        posthog.identify("seller-"+search.get("phone"), {
          phone: search.get("phone"),
          collection: search.get("collection")
		})
	 }
   }

  
  const {children, data} = $props()

  const tabIs = (tab: string) => {
   const path = $page.url.pathname
   if(tab === "") return path === "/vendeurs/dashboard" || path === "/vendeurs/dashboard/"
   return path.startsWith("/vendeurs/dashboard/" + tab)
  }

  const activeStyle = "text-secondary scale-105 border-b-2 border-secondary pb-1 font-semibold"
  const message = "Si tu veux professionaliser la manière dont tu vends et de disposer des outils qui te permettront de progresser dans ton business, clique sur le lien: https://dimarket.biz/vendeurs"
</script>

<div>
<NavBar>
  <a href="/vendeurs/profile">
    <Button variant="neutral" size="sm">
      Profile 
     <span class="bg-secondary/25 p-2 shadow rounded-full font-bold">
        {data.user.name.slice(0, 2).toUpperCase()}
     </span>
    </Button>
  </a>
</NavBar>

{#if !$page.url.pathname.startsWith("/vendeurs/profile")}
<nav 
  class="flex w-full flex-wrap gap-4 justify-center my-8 border-b border-slate-200 p-2 mx-2 text-xs *:transition-all *:duration-200">
  <a href="/vendeurs/dashboard" class={tabIs("") ? activeStyle : ""}>Accueil</a>
  <a href="/vendeurs/dashboard/produits" class={tabIs("produits") ? activeStyle : ""}>Produits</a>
  <a href="/vendeurs/dashboard/commandes" class={tabIs("commandes") ? activeStyle : ""}>Commandes</a>
  <a href="/vendeurs/dashboard/suggestions" class={tabIs("suggestions") ? activeStyle : ""}>Suggestions</a>
  {#if data.daysLeft !== null && data.daysLeft <= 5}
    <a href="/vendeurs/dashboard/renouveler" class={tabIs("renouveler") ? activeStyle : ""}>Renouveler</a>
  {/if}

  <!-- <a href="/vendeurs/dashboard/affliation" class={tabIs("affliation") ? activeStyle : ""}>Affliation</a> -->
</nav>
{/if}

<Toast />

<main>
{@render children()}
</main>
</div>