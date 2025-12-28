<script lang="ts">
  import SuggestionCard from "$lib/components/SuggestionCard.svelte";
  import Button from "$lib/components/Button.svelte";

  const { data } = $props();
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold mb-6">Nos suggestions pour améliorer votre boutique</h1>

  {#if !isPremium}
  <div class="my-8 flex items-center flex-col gap-4">
    <h2>Vous avez perdu l'accès aux suggestions</h2>
    <p>Vous n'avez plus accès aux Suggestions car vous ne faites plus des utilisateurs Premium</p>
   <a 
     href="https://wa.me/781878234/?text=Salut DiMarket, j'aimerais récupérer les outils proffessionnels que me donne le plan Premium"
   >
    <Button>Récupérer mon plan Premium</Button>
   </a>
</div>
{:else}

  {#if data.suggestions && data.suggestions.length > 0}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each data.suggestions as suggestion}
        <SuggestionCard
          title={suggestion.title}
          description={suggestion.description}
          type={suggestion.type}
        >
          {#if suggestion.cta}
            <a href={suggestion.cta.href}>
              <Button variant="primary">
                {suggestion.cta.text}
              </Button>
            </a>
          {/if}
        </SuggestionCard>
      {/each}
    </div>
  {/if}

  {#if data.productSuggestions && data.productSuggestions.length > 0}
    <h2 class="text-2xl font-bold mb-4 mt-8">Suggestions par produit</h2>
    {#each data.productSuggestions as productSug}
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">{productSug.product}</h3>
        <div class="grid gap-4 md:grid-cols-2">
          {#each productSug.suggestions as suggestion}
            <SuggestionCard
              title={suggestion.title}
              description={suggestion.description}
              type={suggestion.type}
            >
              {#if suggestion.cta}
                <a href={suggestion.cta.href}>
                  <Button variant="primary">
                    {suggestion.cta.text}
                  </Button>
                </a>
              {/if}
            </SuggestionCard>
          {/each}
        </div>
      </div>
    {/each}
  {/if}



  {#if (isPremium && (!data.suggestions || data.suggestions.length === 0) && (!data.productSuggestions || data.productSuggestions.length === 0))}
    <div class="text-center py-12">
      <h2 class="text-xl font-semibold mb-4">Félicitations !</h2>
      <p class="text-gray-600">Votre boutique est en excellente forme. Continuez comme ça !</p>
    </div>
  {/if}

{/if}
</div>
