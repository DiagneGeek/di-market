<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Section from "$lib/components/Section.svelte";

   const {data} = $props()
</script>

<Section>
<h1 class="text-cente w-full ">Incription</h1>

<div class="w-full flex flex-col gap-4 justify-center h-90svh items-center mt-4">
  <form 
   method="POST"
   class="bg-card rounded-lg w-[300px] py-8 flex flex-col items-center gap-4 *:w-[250px]">
    <Input 
      type="text" 
      minlength="3"
      placeholder="Le nom de votre boutique..."
      name="name"
      label="nom de votre boutique"
      required
      />
     <Input 
      type="number" 
      minlength="9"
      maxlength="9"
      placeholder="Votre numero de telephone..."
      name="phone"
      label="Numero Whatsapp"
      required
      />
    <Input 
      type="password" 
      placeholder="Mot de passe"
      minlength="6"
      maxlength="20"
      name="password"
      label="Mot de passe"
      required/>
      {#if data.submitError !== "null"}
        <p class="text-red-400 text-[12px]">{data.submitError}</p>
      {/if}
      <Button class="mt-2">Creer ma boutique</Button>
  </form>

  <p class="text-center w-full">
    deja un compte?
     <a class="text-secondary highlight italic" href="/vendeurs/connection">Se connecter</a>
  </p>
</div>
</Section>

