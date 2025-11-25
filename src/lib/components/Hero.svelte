<script lang="ts">
    const  {children} = $props()
</script>

<div class="w-full min-h-[80svh] my-4 flex flex-col items-center bg-bg-2">
    {@render children()}
</div>
