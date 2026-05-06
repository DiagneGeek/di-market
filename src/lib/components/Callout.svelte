<script lang="ts">
  const { children } = $props()
</script>

<div class="bg-secondary/60 rounded-2xl p-6 w-full">
 <div class="m-4 flex items-center gap-2">
    <img src="/icons/apostrophe.svg" alt="''" />
 </div>
{@render children()}
</div>