 <script lang="ts">
    import logo from "$lib/images/logo.png"
    const {children} = $props()
 </script>
 
 <header class="flex justify-between items-center p-4 border-b border-b-slate-200 backdrop-blur-md fixed top-0 left-0 w-full">
     <a href="/" class="font-bold">
       <img 
       class="w-24"
       src={logo} alt="DiMarket">
     </a>
	 <nav class="flex items-center gap-2 justify-end *:text-text">
		{@render children()}
	 </nav>
</header>
