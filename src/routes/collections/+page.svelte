<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  const {data} = $props()
  const sellers = data.sellers || []
</script>

<svelte:head>
  <title>Decouvrez toutes les collections créées avec DiMarket</title>
  <meta name="description" content="Explorer les collections de nos illustres vendeurs" />
</svelte:head>
  
<Hero>
  <div class="space-y-4">
    <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Découvrez Nos Illustres Vendeurs
    </h1>
    <p class="mx-auto">
      Explorez une sélection curatée des meilleures collections créées avec DiMarket. Trouvez les produits et services de qualité de nos vendeurs vérifiés.
    </p>
  </div>
  <div class="my-2 flex justify-center gap-4">
    {#each [
      {
        value: `+${sellers.length}`,
        name: "Vendeurs"
      },
      {
        value: sellers.map((s: any) => s.Products.length).reduce((acc: any, cur: any) => acc + cur),
        name: "Produits Ajoutés"
      }
    ] as insight}
      <div class="p-8 border-l">
        <p class="text-xl font-bold">{insight.value}</p>
        <p>{insight.name}</p>
      </div>
    {/each}
  </div>
</Hero>

{#if data.error}
  <div class="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
    <h3 class="font-semibold text-red-800">Une erreur s'est produite</h3>
    <p class="text-red-700 text-sm mt-1">{JSON.stringify(data.error)}</p>
  </div>
{/if}

<section class="py-8">
  {#if sellers.length === 0}
    <div class="text-center py-12">
      <p class="text-secondary/60 text-lg">Aucun vendeur disponible pour le moment.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each sellers as seller}
        <div class="bg-card border border-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
          <!-- Header with gradient -->
          <div class="h-16 rounded-2xl flex justify-center items-center border border-primary m-4 bg-gradient-to-br from-primary to-secondary/20 relative">
                <h2 class="text-lg font-bold text-primary">{seller.name}</h2>
          </div>

          <!-- Content -->
          <div class="p-4 w-full flex flex-col gap-4">
            <!-- Contact Info -->
            <div class="flex flex-wrap gap-8">
              {#if seller.phone}
                <div class="flex gap-3">
                  <span class=" text-lg font-medium">📱</span>
                  <div class="flex-1">
                    <p class="text-xs">Téléphone</p>
                    <p class="text-sm font-medium text-secondary">{seller.phone}</p>
                  </div>
                </div>
              {/if}
              
              {#if seller.Products}
                <div class="flex gap-3">
                  <span class="font-medium"><svg viewBox="0 0 24 24" class="size-6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g fill="none" fill-rule="evenodd" id="页面-1" stroke="none" stroke-width="1"> <g id="导航图标" transform="translate(-325.000000, -80.000000)"> <g id="编组" transform="translate(325.000000, 80.000000)"> <polygon fill="#FFFFFF" fill-opacity="0.01" fill-rule="nonzero" id="路径" points="24 0 0 0 0 24 24 24"></polygon> <polygon id="路径" points="22 7 12 2 2 7 2 17 12 22 22 17" stroke="#212121" stroke-linejoin="round" stroke-width="1.5"></polygon> <line id="路径" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="2" x2="12" y1="7" y2="12"></line> <line id="路径" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="12" x2="12" y1="22" y2="12"></line> <line id="路径" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="22" x2="12" y1="7" y2="12"></line> <line id="路径" stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="17" x2="7" y1="4.5" y2="9.5"></line> </g> </g> </g> </g></svg></span>
                  <div class="flex-1">
                    <p class="text-xs">Nombre de produit</p>
                    <p class="text-sm font-medium text-secondary break-all">{seller.Products.length}</p>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Stats or badges -->
            {#if seller.created_at}
              <div class="pt-2 border-t-[0.5px] border-gray">
                <p class="text-gray text-[12px]">
                  Membre depuis {new Date(seller.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: "2-digit" })}
                </p>
              </div>
            {/if}
          </div>

          <!-- Action Button -->
          <div class="p-6 pt-0">
            <a 
              href="/collections/{seller.id}"
              class="w-full highlight block text-center py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Découvrir la collection →
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>
