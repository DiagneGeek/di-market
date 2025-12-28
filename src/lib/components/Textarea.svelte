<script lang="ts">
    let {
      value = $bindable(),
      ...props
    } = $props()
</script>

<textarea 
  {value}
  {...props}
  class={`bg-input border border-gray-300 p-3 min-h-[80px] rounded-2xl ${props.class || ""}`}></textarea>