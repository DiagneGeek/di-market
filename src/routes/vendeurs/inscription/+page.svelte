<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Hero from "$lib/components/Hero.svelte";

   const {data, form} = $props()
</script>

<svelte:head>
  <title>Page d'inscription pour DiMarket</title>
  <meta name="description" content="Créez votre collection en ligne en moins d'une minute avec DiMarket" />
</svelte:head>

<Hero>
  <div class="text-center mb-8 animate-slideInFromLeft" style="animation-delay: 0ms;">
    <h1 class="italic text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Créez votre Collection</h1>
    <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">Rejoignez DiMarket en quelques minutes et commencez à vendre vos produits à des milliers de clients</p>
  </div>

  <div class="w-full max-w-md mx-auto px-4 sm:px-0 animate-scaleIn" style="animation-delay: 100ms;">
    <form 
     method="POST"
     class="bg-white rounded-2xl py-8 px-6 sm:px-8 flex flex-col items-center gap-5 shadow-lg border border-gray-100">
      <Input 
        type="text" 
        minlength="3"
        placeholder="Le nom de votre Collection..."
        name="name"
        label="Nom de votre Collection"
        value={form?.name ?? ""}
        class="w-full"
        required
        />
       <Input 
        type="number" 
        minlength="9"
        maxlength="9"
        placeholder="Votre numéro de téléphone..."
        name="phone"
        label="Numéro WhatsApp (sans le +XXX)"
        value={form?.phone ?? ""}
        class="w-full"
        required
        />
      <Input 
        type="password" 
        placeholder="Mot de passe"
        minlength="6"
        maxlength="20"
        name="password"
        value={form?.password ?? ""}
        label="Mot de passe"
        class="w-full"
        required/>
         {#if form?.error}
          <p class="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg w-full text-center">{form?.error}</p>
        {/if}
        <Button class="w-full mt-4">Créer ma collection</Button>
    </form>

    <p class="text-center mt-6 text-gray-600">
      Vous avez déjà un compte ?
       <a class="text-secondary font-semibold hover:underline" href="/vendeurs/connection">Se connecter</a>
    </p>
  </div>
</Hero>

