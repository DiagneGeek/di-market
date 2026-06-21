<script lang="ts">
    const { children } = $props()
</script>


<div 
  class="bg-gradient-to-tr from-primary/10 to-secondary/30 rounded-2xl p-6 w-full  my-2">
  <div class="m-4 flex items-center gap-1">
    <img class="size-6 not-illustration" src="/icons/lamp.svg" alt="💡" />
    <span class="text-lg font-bold
    ">Conseil</span>
  </div>
  {@render children()}
</div>
