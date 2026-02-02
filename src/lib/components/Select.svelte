<script lang='ts'>
    const {options, label} = $props()
</script>

<div>
 <span class="text-xs font-semi-bold text-gray">{label}</span>
 <select
  class="p-2 rounded-xl bg-input">
   {#each options as option}
     <option value={option}>
       {option}
     </option>
   {/each}
 </select>
</div>