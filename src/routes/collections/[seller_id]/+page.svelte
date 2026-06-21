<script lang="ts">
  import Hero from "$lib/components/Hero.svelte"
  import ArticleCard from "$lib/components/ArticleCard.svelte"
  import Button from "$lib/components/Button.svelte"
  import Input from "$lib/components/Input.svelte"
  import Select from "$lib/components/Select.svelte"
  import { goto, invalidateAll  } from '$app/navigation'

  const {data} = $props()

  let showAdvancedSearch = $state(false)

  // Filter state - initialized from URL params
  let searchQuery = $state(data.initialFilters?.recherche || '')
  let selectedCategory = $state(data.initialFilters?.category || 'Tout')
  let minPrice = $state(data.initialFilters?.minPrice?.toString() || '')
  let maxPrice = $state(data.initialFilters?.maxPrice?.toString() || '')
  let sortBy = $state(data.initialFilters?.sortBy || '')

  // Derived states for the variants
  let newestVariant = $derived(sortBy === 'newest' ? 'sober' : 'outlineBorder');
  let oldestVariant = $derived(sortBy === 'oldest' ? 'sober' : 'outlineBorder');
  let priceAscVariant = $derived(sortBy === 'price-asc' ? 'sober' : 'outlineBorder');
  let priceDescVariant = $derived(sortBy === 'price-desc' ? 'sober' : 'outlineBorder');

  //et categoryButtonVariant = $derived(selectedCategory === category ? "default" : "neutral")
  // Price range presets
  const pricePresets: { [key: string]: [number, number] } = {
    '0 - 5000': [0, 5000],
    '5000 - 10000': [5000, 10000],
    '10000 - 20000': [10000, 20000],
    '20000 - 50000': [20000, 50000],
    '50000 - 100000': [50000, 100000],
    '100000+': [100000, Infinity],
  }

  // Update URL when filters change
  const updateFilters = () => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('recherche', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (sortBy) params.set('sortBy', sortBy)

    const queryString = params.toString()
    const url = queryString ? `?${queryString}` : '.'
    
    goto(url, { replaceState: true,  noScroll: true})
  }

  // Handle filter changes
  const handleSearchChange = (e: Event) => {
    //searchQuery = (e.target as HTMLInputElement)?.value || ''
    updateFilters()
  }

  const handleCategoryChange = (category: string) => {
    selectedCategory = category
    updateFilters()
  }

  const handlePricePreset = (preset: string) => {
    if (preset === 'Selectionner') {
      minPrice = ''
      maxPrice = ''
    } else {
      const [min, max] = pricePresets[preset]
      minPrice = min.toString()
      maxPrice = max === Infinity ? '' : max.toString()
    }
    updateFilters()
  }

  const handleSortChange = (value: string) => {
    sortBy = value === sortBy ? '' : value
    updateFilters()
  }

  const clearFilters = () => {
    searchQuery = ''
    selectedCategory = 'Tout'
    minPrice = ''
    maxPrice = ''
    sortBy = ''
    //invalidateAll()
    goto(window.location.href.split("?")[0], { replaceState: true})
  }

  const share = async (e: Event) => {
    const {target} = e
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Découvrez la collection de ${data.seller.name} chez DiMarket` || document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // fallback (copy link)
      navigator.clipboard.writeText(window.location.href);
    }
  };
</script>

<svelte:head>
  <title>DiMarket - Bienvenue chez {data.seller.name}</title>
</svelte:head>

<Hero>
<h1>
  Bienvenue dans la collection<br>
  <span class="highlight italic">
   {data?.seller?.name}
  </span>
</h1>
<div class="flex justify-center items-center gap-4 mt-8">
<Button
  onclick={share}
 >
   Partager sur les reseaux
 </Button>
  <Button 
    variant="neutral"
    onclick={() => navigator.clipboard.writeText(window.location.href)}
  >
    Copier le lien
  </Button>
 </div>
</Hero>

<!-- ========= Search Bar =========== -->
 <div class="flex flex-col items-center gap-2 w-full max-w-[500px] mx-auto mb-2 p-2 border-2 border-card rounded-2xl pb-3 border-b border-slate-100">
   <div class="flex mx-auto items-center justify-center gap-2 w-[95%]">
       <Input 
            type="search"
            placeholder="Rechercher un produit..."
            bind:value={searchQuery}
            class="flex-1"
        />
       <Button onclick={handleSearchChange}>
           Rechercher
       </Button>
   </div>

  {#if showAdvancedSearch}

  <div class="w-[90%] animate-fadeIn">
     <p class="font-bold mb-2">Catégories:</p>        
    <div class="overflow-x-auto rounded-full flex items-center max-w-[90%] gap-2 py-2">
     {#each data.allCategories as category}
      {@const variant = selectedCategory === category ? "sober" : "neutral"}
         <Button
             size="sm"
             variant={variant}
             onclick={() => handleCategoryChange(category)}
          >
            {category}
         </Button>
      {/each}
     </div>
    </div>
  
  <div class="w-[90%] animate-fadeIn my-2" >
    <p class="font-bold mb-2">Prix</p>
    <p class="text-gray-500 text-xs mb-2">Intervalle personnalisé</p>
    <div class="flex gap-2 items-center max-w-full ml-2 my-2">
      <Input
        type="number"
        placeholder="ex: 5000"
        label="min"
        value={minPrice}
        onchange={(e: Event) => {
          minPrice = (e.target as HTMLInputElement).value
          updateFilters()
        }}
        class="w-32"
      />
      <span class="text-gray-500">à</span>
      <Input 
        type="number"
        placeholder="ex: 90000"
        label="max"
        value={maxPrice}
        onchange={(e: Event) => {
          maxPrice = (e.target as HTMLInputElement).value
          updateFilters()
        }}
        class="w-32"
      />
    </div>
    <p class="text-gray-500 text-xs mb-2">Présélectionnés</p>
    <div>
      <Select 
        options={["Selectionner", ...Object.keys(pricePresets)]}
        default="Selectionner"
        label="Intervalles pré-sélectionnés"
        onchange={handlePricePreset}
      />
    </div>
  </div>

  <div class="w-[90%] animate-fadeIn my-2">
    <p class="font-bold mb-2">Trier</p>
    <div class="flex gap-2 flex-wrap">
      <Button 
        size="sm" 
        variant={newestVariant}
        onclick={() => handleSortChange('newest')}
      >
        Nouveaux d'abord
      </Button>
      <Button 
        size="sm" 
        variant={oldestVariant}
        onclick={() => handleSortChange('oldest')}
      >
        Anciens d'abord
      </Button>
      <Button 
        size="sm" 
        variant={priceAscVariant}
        onclick={() => handleSortChange('price-asc')}
      >
        Prix croissant
      </Button>
      <Button 
        size="sm" 
        variant={priceDescVariant}
        onclick={() => handleSortChange('price-desc')}
      >
        Prix décroissant
      </Button>
    </div>
  </div>

  <Button
    size="sm"
    variant="neutral"
    onclick={clearFilters}
    class="mt-2"
  >
    Réinitialiser les filtres
  </Button>
  {/if}

  <Button 
     class="flex items-center gap-1 opacity-60 mt-4"
     size="sm"
     onclick={() => showAdvancedSearch = !showAdvancedSearch}
     variant="outlineBorder">
    {showAdvancedSearch ? 'Masquer' : 'Recherches avancées'}
    <img src="/icons/plus.svg" alt="+" class="size-6"/>
  </Button>
 </div>
<!-- ========== /search bar -->

<section class="w-full flex justify-center gap-8 md:px-20 flex-wrap my-12">
    {#each data.products as product}
       <ArticleCard
         title={product.title}
         price={product.price}
         slug={product.slug}
         seller={product.seller_id}
         description={product.description}
         img={product.image}
        />
        {:else}
         <p class="text-gray-500">Aucun produit disponible pour cette collection.</p>
    {/each}
  </section>

