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
      })
                                       
      if ($page.url.searchParams.has("identified")) {
       const search = $page.url.searchParams
         posthog.identify("partner-"+search.get("phone"), {
           phone: search.get("phone"),
           partnerid: search.get("partnerid")
         })
       }
     }

                                                                                                                                              
     const {children, data} = $props()

     const tabIs = (tab: string) => {                 
         const path = $page.url.pathname;
         if(tab === "") return path === "/partenaires/dashboard/" || path === "/partenaires/dashboard"
        return path.startsWith("/partenaires/dashboard/" + tab)
     }
     const activeStyle = "text-secondary scale-105 border-b-2 border-secondary pb-1 font-semibold"
</script>

<NavBar>
    <a href="/partenaires/parametres">Paramètres</a>
</NavBar>

{#if !$page.url.pathname.startsWith("/partenaires/parametres")}
 <div 
   class="flex w-full gap-3 justify-center my-8 border-b border-slate-200 p-2 mx-auto text-xs *:transition-all *:duration-200"
 >
    <a href="/partenaires/dashboard" class={tabIs("") ? activeStyle : "text-slate-500 hover:text-secondary"}>Accueil</a>
    <a href="/partenaires/dashboard/filleuls" class={tabIs("filleuls") ? activeStyle : "text-slate-500 hover:text-secondary"}>Filleuls</a>
    <a href="/partenaires/dashboard/paiements" class={tabIs("paiements") ? activeStyle : "text-slate-500 hover:text-secondary"}>Paiements</a>
</div>
{/if}

<main>
 {@render children()}
  <Toast />
</main>