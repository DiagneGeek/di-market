<script lang="ts">
    const props = $props()
</script>

<textarea 
  {...props}
  class={`bg-yellow-50 p-3 min-h-[80px] rounded-2xl ${props.class || ""}`}></textarea>