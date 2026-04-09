<script lang="ts">
	import Button from "./Button.svelte";

    let {
         type: inputType = "text", 
         "class": _class,
         label,
         validity,
         value = $bindable(),
         oninput,
         ...rest
    } : {
        type?: string,
        _class?: string,
        label?: string,
        value?: any,
        oninput?: any,
        validity?: {
          when: (value: any) => boolean,
          message: string,
          ref?: any,
          autohighlight?: () => boolean
        },
        [key: string]: any
    } = $props()

    let type = $state(inputType)

    let isHide = $state(true)

    let isValid: boolean | null = $state(validity?.autohighlight?.() ? false : null)

    const checkValidity = (value: any) => {
      if (!validity) {
        isValid = true
        return
      }
      isValid = validity.when(value)
    }
  
    if (validity?.ref) {
      $effect(() => {
        validity.ref(isValid)
      })
    }
  
  if (validity?.autohighlight) {
    $effect(() => {
      if (validity?.autohighlight?.()) {
        checkValidity(value)
      }
    })
  }

 const onInput = (e: Event) => {
  const val = (e.target as any).value
  checkValidity(val)
  oninput ? oninput(e) : null
  value = val
 }
</script>

{#snippet openedEye()}
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
       <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
{/snippet}

{#snippet closedEye()}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
{/snippet}
{validity?.autohighlight?.()}
<div class="flex flex-col justify-center gap-1">
{#if label || inputType === "password"}
 <div class="flex items-end justify-between ">
    <span class="text-xs font-semi-bold text-gray">{label}</span>
    <div>
      {#if inputType === "password"}
        <Button 
          type="button"
          variant="neutral" 
          onclick={() => {
            isHide = !isHide
            type = type === "password" ? "text" : "password"
          }}
          size="sm" 
          class="flex items-center gap-1" >
          
        {#if isHide}
         Afficher
          {@render openedEye()}
        {:else}
          Masquer
          {@render closedEye()}
        {/if}
        </Button>
      {/if}
    </div>
 </div>
 {/if}
<input 
 type={type}
 class={`p-3 rounded-2xl ${_class} bg-input border ${isValid === false && validity ? "border-red-500 border-2" : isValid === true && validity ? "border-green-500 border-2" : "border-gray-300"}`}
 {value}
 {...rest}
 oninput={onInput}
 >
{#if validity}
 <p class="text-xs text-red-400">{isValid === false ? validity?.message : ""}</p>
 {/if}
 </div>