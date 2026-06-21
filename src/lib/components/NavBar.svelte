<script lang="ts">
   import logo from "$lib/images/logo.png"
   import Button from "$lib/components/Button.svelte"

   const { children } = $props()
   
   let headerWidth = $state(0)
   let navWidth = $state(0)
   let nav = $state(null)
   const navHeight = $derived(nav?.clientHeight || 0)
   let showMobileMenu = $derived(false)
   let mobileNavOpen = $state(false)
   $effect(() => showMobileMenu = navWidth > headerWidth * 0.7)
</script>


<header 
   bind:clientWidth={headerWidth}
   bind:this={nav}
   class="flex justify-between items-center px-2 sm:px-4 py-3 border-b border-gray-200 backdrop-blur-lg md:backdrop-blur-md bg-white/40 fixed top-0 left-0 w-full max-w-full font-[500] z-50 shadow-sm"
>
   <a href="/" class="font-bold hover:scale-105 transition-transform duration-200">
      <img 
         class="w-20 sm:w-24"
         src={logo} 
         alt="DiMarket"
      >
   </a>
   
   {#if !showMobileMenu}
      <nav 
         bind:clientWidth={navWidth}
         class="flex items-center gap-2 text-xs md:gap-2 justify-end [a:hover]:underline [a:hover]:decoration-secondary"
      >
         {@render children()}
         <a href="/vendeurs/connection">
          <Button variant="outlineBorder" size="sm">Se connecter</Button>
         </a>
      </nav>
   {:else}
   <div>
      <button onclick={() => mobileNavOpen = !mobileNavOpen}>☰</button>
      <nav class="hidden flex flex-col gap-2 text-sm fixed left-0 w-full h-screen bg-back-main/90 backdrop-blur-2xl p-2 *:p-2 *:border-b *:border-gray-200" class:hidden={!mobileNavOpen} style="top: {navHeight}px;">
         {@render children()}
      </nav>
      <a href="/vendeurs/connection">
        <Button variant="outlineBorder" size="sm">Se connecter</Button>
      </a>
    </div>
   {/if}
</header>
