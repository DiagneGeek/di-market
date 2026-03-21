 <script lang="ts">
    import logo from "$lib/images/logo.png"
    const {children} = $props()
 </script>
 
 <header class="flex justify-between items-center px-2 sm:px-4 py-3 border-b border-gray-200 backdrop-blur-md bg-white/60 fixed top-0 left-0 w-full font-[500] z-50 shadow-sm">
    <a href="/" class="font-bold hover:scale-105 transition-transform duration-200">
       <img 
       class="w-20 sm:w-24"
       src={logo} alt="DiMarket">
     </a>
	 <nav class="flex items-center gap-2 text-xs md:gap-2 justify-end">
		{@render children()}
	 </nav>
</header>
