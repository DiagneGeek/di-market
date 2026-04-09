<script lang="ts">
  import Input from "$lib/components/Input.svelte"
  import Button from "$lib/components/Button.svelte"

  interface Form {
    phone: string;
    password: string;
    error?: string;
  }

  interface Props {
    form: Form;
  }

  const {form} : Props = $props()
</script>

<svelte:head>
  <title>Inscription pour les partenaires - DiMarket</title>
  <meta name="description" content="Rejoignez le programme de partenariat de DiMarket et commencez à gagner des commissions en aidant les vendeurs à réussir sur notre plateforme." />
</svelte:head>

<h1 class="relative left-1/2 -translate-x-1/2 flex justify-center">
  <p class="text-2xl w-full text-center">Commencez à aider les vendeurs</p>
</h1>
<h2 class="text-lg text-center mx-auto">Tout en etant rémunéré</h2>

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
 <input type="hidden" name="type" value="register" />
 <Button label="S'inscrire" />
</form>

<p class="text-sm mx-auto text-center">
  Vous avez deja un compte ? 
  <a href="/partenaires/connexion" class="highlight text-secondary">Connectez-vous</a>
</p>