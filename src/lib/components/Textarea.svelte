<script lang="ts">
    let {
      value = $bindable(),
      label = "",
      ...props
    } = $props()
</script>

<div class="w-full">
  <div class="w-full flex justify-start px-2">
    <p class="text-xs text-gray">{label}</p>
  </div>
<textarea 
  {value}
  {...props}
  class={`bg-input border border-gray-300 p-3 min-h-[80px] rounded-2xl ${props.class || ""}`}></textarea>
</div>