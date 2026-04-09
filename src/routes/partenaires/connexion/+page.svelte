<script lang="ts">
  import Input from "$lib/components/Input.svelte"
  import Button from "$lib/components/Button.svelte"

  const {form} = $props()
</script>

<svelte:head>
  <title>Connexion pour les partenaires - DiMarket</title>
  <meta name="description" content="Connectez-vous à votre compte partenaire pour gérer vos filleuls, suivre vos commissions et accéder à des outils exclusifs sur DiMarket." />
</svelte:head>

<h1 class="relative left-1/2 -translate-x-1/2 flex justify-center">
  <p class="text-2xl w-full text-center">Connectez-vous à votre compte partenaire</p>
</h1>

<form
   method="POST"
   class="my-4 flex flex-col gap-4 bg-card max-w-md p-4 rounded-2xl mx-auto"
>
 <Input
    label="Numero de téléphone (wave)"
    placeholder="Entrez votre numéro de téléphone"
    name="phone"
    type="number"
    value={form?.phone || ""}
 />
 <Input
    type="password"
    label="Mot de passe"
    placeholder="Entrez votre mot de passe"
    name="password"
    value={form?.password || ""}
 />
 {#if form?.error}
   <p 
     class="bg-red-100 text-orange-600 p-2 rounded">
      {form.error}
    </p>
 {/if}
 <input type="hidden" name="type" value="login" />
 <Button label="Se connecter" />
</form>

<p class="text-sm mx-auto text-center">
  Vous n'avez pas encore de compte ? 
  <a href="/partenaires/inscription" class="highlight text-secondary">Inscrivez-vous</a>
</p>