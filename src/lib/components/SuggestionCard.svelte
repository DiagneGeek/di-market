<script lang="ts">
    const {
      title, 
      description, 
      children,
      type = 'normal'
    } = $props()
</script>

<div 
 class="w-full p-4 rounded-2xl {type === 'urgent' ? 'bg-red-50 border border-red-200' : type === 'positive' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}">
  <h3 
    class="text-xl font-bold my-4">
    {title}
  </h3>
  <p class="mb-4 text-gray">
    {description}
  </p>
  {@render children()}
</div>