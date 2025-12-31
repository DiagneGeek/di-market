 <script lang="ts">
    import logo from "$lib/images/logo.png"
    const {children} = $props()
 </script>
 
 <header class="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 backdrop-blur-md bg-white/90 fixed top-0 left-0 w-full z-50 shadow-sm">
    <a href="/" class="font-bold hover:scale-105 transition-transform duration-200">
       <img 
       class="w-20 sm:w-24"
       src={logo} alt="DiMarket">
     </a>
	 <nav class="flex items-center gap-2 sm:gap-4 justify-end">
		{@render children()}
	 </nav>
</header>
