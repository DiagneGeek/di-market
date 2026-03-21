<script lang="ts">
    const  {children} = $props()
</script>

<div class="min-h-[70svh] relative w-full sm:min-h-[50vh] my-6 sm:my-8 flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden border-b-4 border-card border-l-0">
<div class="absolute inset-0 rounded-xl ring-1 ring-white/50"></div>
    <div class="relative z-10 text-center max-w-4xl px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
        {@render children()}
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back-main to-transparent"></div>
</div>
