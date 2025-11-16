<script lang="ts">
    const  {children} = $props()
</script>

<div class="w-full my-4 flex flex-col items-center bg-bg-2">
    {@render children()}
</div>