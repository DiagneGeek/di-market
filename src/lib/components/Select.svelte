<script lang='ts'>
    const {options, label, border = true, onchange = null, default: _default = ''} = $props()
</script>

<div>
 <span class="text-xs font-semi-bold text-gray">{label}</span>
 <select
  value={_default}
  onchange={onchange ? (e: Event) => onchange((e.target as HTMLSelectElement).value) : null}
  class="p-2 rounded-xl bg-input {border ? 'border border-gray-300' : ''}">
   {#each options as option}
     <option value={option}>
       {option}
     </option>
   {/each}
 </select>
</div>