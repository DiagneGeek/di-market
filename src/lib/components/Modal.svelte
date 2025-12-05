<script lang="ts">
	import Button from "./Button.svelte";

  const {children, open, close, onSubmit} = $props()
  let btnText = $state("Continuer")

  const close2 = (e: Event) => {
    if (e.currentTarget === e.target) {
        close()
    }
  }

  const handleSubmit = (...rest: any) => {
    btnText = "En cours..."
    onSubmit(...rest)
  }
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
     class="fixed w-full h-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
     onclick={close2}
     >
       <form onsubmit={onSubmit} class="w-[300px] bg-card rounded-3xl shadow p-4 flex flex-col items-center gap-8">
        <div>
         {@render children()}
        </div>
        <div class="w-full flex justify-around items-center">
            <Button 
              onclick={close} 
              variant="neutral" 
              type="button">Cancel</Button>
            <Button 
              variant="secondary" 
              type="submit"
              label={btnText}
            />
        </div>
       </form>
    </div>
{/if}