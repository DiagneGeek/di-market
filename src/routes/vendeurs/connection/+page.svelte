<script lang="ts">
	import Button from "../../../components/Button.svelte";
	import Input from "../../../components/Input.svelte";
	import Section from "../../../components/Section.svelte";

   const {data} : {
    data: {
        submitError: string
    }
   } = $props()
</script>

<Section>
<h1 class="text-cente w-full ">Connection</h1>

<div class="w-full flex flex-col gap-8 justify-center h-90svh items-center mt-4">
  <form 
   method="POST"
   class="bg-card rounded-lg w-[300px] py-12 flex flex-col items-center gap-4 *:w-[250px]">
     <Input 
      minlength="9"
      maxlength="9"
      placeholder="Votre numero de telephone..."
      name="phone"
      type="tel"
      label="Numero de Telephone"
      required
      />
    <Input 
      type="password" 
      placeholder="Mot de passe"
      minlength="6"
      maxlength="20"
      name="password"
      label="Mot De Passe"
      required/>
      {#if data.submitError !== "null"}
        <p class="text-red-400">{data.submitError}</p>
      {/if}
      <Button class="mt-2">Me connecter</Button>
  </form>

  <p class="text-center w-full">
    Pas encore de compte?
     <a class="text-secondary highlight italic" href="/vendeurs/inscription">M'inscrire</a>
  </p>
</div>
</Section>