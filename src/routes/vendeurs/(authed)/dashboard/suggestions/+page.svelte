<script lang="ts">
  import SuggestionCard from "$lib/components/SuggestionCard.svelte";
  import ShareCollectionCard from "$lib/components/ShareCollectionCard.svelte";
  import Button from "$lib/components/Button.svelte";

  const { data } = $props();
</script>

<div class="py-6">
  <h1 class="text-3xl font-bold mb-6">Nos suggestions pour améliorer votre collection</h1>
  <br><br>
  {#if !data.isPremium}
  <div class="mt-[140px] flex items-center justify-center flex-col gap-4">
    <h2 class="text-2xl text-center">Vous avez perdu l'accès aux suggestions 😔</h2>
    <p>Vous n'avez plus accès aux Suggestions car vous ne faites plus partie des utilisateurs Premium</p>
   <a 
     href="https://wa.me/781878234/?text=Salut DiMarket, j'aimerais récupérer les outils proffessionnels que me donne le plan Premium"
   >
    <Button>Récupérer l'accès Premium</Button>
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
              <Button variant="neutral">
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

  {#if data.isPremium && (!data.suggestions || data.suggestions.length === 0) && (!data.productSuggestions || data.productSuggestions.length === 0)}
    <div class="text-center py-12 mb-12">
      <h2 class="text-xl font-semibold mb-4">Félicitations !</h2>
      <p class="text-gray-600 mb-8">Votre collection est en excellente forme. Continuez comme ça !</p>
      <div class="max-w-2xl mx-auto">
        <ShareCollectionCard 
          sellerId={data.user?.id}
          sellerName={data.user?.name}
          productCount={data.products?.length || 0}
        />
      </div>
    </div>
  {/if}

{/if}
</div>
