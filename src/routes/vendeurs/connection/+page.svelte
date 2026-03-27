<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Hero from "$lib/components/Hero.svelte";

   const {data} : {
    data: {
        submitError: string
    }
   } = $props()
</script>

<svelte:head>
  <title>Connectez vous à DiMarket</title>
  <meta name="description" content="Connectez-vous à votre collection DiMarket et gérez vos produits et commandes" />
</svelte:head>

<Hero>
  <div class="text-center mb-8 animate-slideInFromLeft" style="animation-delay: 0ms;">
    <h1 class="italic text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Bienvenue dans votre collection</h1>
    <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">Connectez-vous pour gérer vos produits, commandes et développer votre activité</p>
  </div>

  <div class="w-full max-w-md mx-auto px-4 sm:px-0 animate-scaleIn" style="animation-delay: 100ms;">
    <form 
     method="POST"
     class="bg-white rounded-2xl py-8 px-6 sm:px-8 flex flex-col items-center gap-5 shadow-lg border border-gray-100">
       <Input 
        minlength="7"
        placeholder="Votre numéro de téléphone..."
        name="phone"
        type="tel"
        label="Numéro de Téléphone"
        class="w-full"
        required
        />
      <Input 
        type="password" 
        placeholder="Mot de passe"
        minlength="6"
        maxlength="20"
        name="password"
        label="Mot de Passe"
        class="w-full"
        required/>
        {#if data.submitError !== "null"}
          <p class="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg w-full text-center">{data.submitError}</p>
        {/if}
        <Button class="w-full mt-4">Me connecter</Button>
    </form>

    <p class="text-center mt-6 text-gray-600">
      Pas encore de compte?
       <a class="text-secondary font-semibold hover:underline" href="/vendeurs/inscription">M'inscrire</a>
    </p>
  </div>
</Hero>