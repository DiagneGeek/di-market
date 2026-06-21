<script lang="ts">
  import Button from "$lib/components/Button.svelte"
  import { useToast } from "$lib/composables/useToast"
  import type { Product } from "$lib/types"
  import { slide, fade } from "svelte/transition"

  const { data } = $props()
  const toast = useToast()

  let step: 1 | 2 = $state(1)
  let selectedProducts = $state<{ product: Product; quantity: number }[]>([])
  
  let clientForm = $state({
    name: "",
    phone: "",
    address: "",
    status: "En attente"
  })

  let isSubmitting = $state(false)

  const products = $derived.by(() => data.products || [])

  const availableProducts = $derived.by(() =>
    products.filter((p: Product) => !selectedProducts.some((s) => s.product.id === p.id))
  )

  const totalPrice = $derived.by(() =>
    selectedProducts.reduce((sum: number, item) => sum + Number(item.product.price || 0) * item.quantity, 0)
  )

  const statuses = ["En attente", "Confirmée", "En cours", "Livrée", "Annulée"]

  function toggleProduct(product: Product) {
    const existing = selectedProducts.find((s) => s.product.id === product.id)
    if (existing) {
      selectedProducts = selectedProducts.filter((s) => s.product.id !== product.id)
    } else {
      selectedProducts = [...selectedProducts, { product, quantity: 1 }]
    }
  }

  function updateQuantity(productId: string | number | undefined, quantity: number) {
    selectedProducts = selectedProducts.map((item) =>
      item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  }

  function nextStep() {
    if (selectedProducts.length === 0) {
      toast.show("Sélectionnez au moins un produit", "error", 3000)
      return
    }
    step = 2
  }

  function previousStep() {
    step = 1
  }

  async function submitOrder(e: Event) {
    e.preventDefault()
    isSubmitting = true

    if (!clientForm.name || !clientForm.phone) {
      toast.show("Veuillez remplir le nom et le téléphone", "error", 3000)
      isSubmitting = false
      return
    }

    try {
      const response = await fetch("/vendeurs/dashboard/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientName: clientForm.name,
          clientPhone: clientForm.phone,
          clientAddress: clientForm.address,
          status: clientForm.status,
          items: selectedProducts.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: Number(item.product.price || 0)
          })),
          total: totalPrice
        })
      })

      if (!response.ok) {
        const error = await response.json()
        toast.show(error.message || "Erreur lors de la création de la commande", "error", 3000)
        return
      }

      toast.show("Commande créée avec succès!", "success", 3000)
      // Reset
      selectedProducts = []
      clientForm = { name: "", phone: "", address: "", status: "En attente" }
      step = 1
      window.location.href = "/vendeurs/dashboard/commandes"
    } catch (err) {
      toast.show(err instanceof Error ? err.message : "Erreur réseau", "error", 3000)
    } finally {
      isSubmitting = false
    }
  }
</script>

<div class="max-w-6xl mx-auto py-8">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold">Ajouter une commande</h1>
      <p class="text-gray-500 mt-2">Étape {step} sur 2</p>
    </div>
    <Button variant="outline" onclick={() => window.history.back()}>← Retour</Button>
  </div>

  <!-- Step 1: Product Selection -->
  {#if step === 1}
    <div class="space-y-6">
      <!-- Progress -->
      <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-primary w-1/2 transition-all duration-500"></div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-4">Sélectionnez les produits</h2>
        <p class="text-gray-600 mb-6">
          {selectedProducts.length} produit{selectedProducts.length !== 1 ? "s" : ""} sélectionné{selectedProducts.length !== 1 ? "s" : ""}
          {selectedProducts.length > 0 && ` • Total: ${totalPrice.toFixed(2)} FCFA`}
        </p>
      </div>

      {#if selectedProducts.length > 0}
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <h3 class="font-semibold text-lg mb-4">Produits sélectionnés</h3>
          <div class="space-y-4">
            {#each selectedProducts as item (item.product.id)}
              <div
                class="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200"
                transition:slide={{ duration: 300 }}
              >
                {#if item.product.image}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    class="w-16 h-16 object-cover rounded"
                  />
                {/if}
                <div class="flex-1">
                  <h4 class="font-semibold">{item.product.title}</h4>
                  <p class="text-gray-600">{Number(item.product.price || 0).toFixed(0)} FCFA</p>
                </div>
                <div class="flex items-center gap-3">
                  <button
                    onclick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    class="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onchange={(e) =>
                      updateQuantity(item.product.id, parseInt((e.target as HTMLInputElement).value) || 1)
                    }
                    class="w-12 text-center border rounded px-2 py-1"
                    min="1"
                  />
                  <button
                    onclick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    class="w-8 h-8 flex items-center justify-center border rounded bg-white hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onclick={() => toggleProduct(item.product)}
                  class="text-red-500 hover:text-red-700 font-semibold"
                >
                  ✕
                </button>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if availableProducts.length > 0}
        <div>
          <h3 class="font-semibold text-lg mb-4">Produits disponibles</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each availableProducts as product (product.id)}
              <button
                onclick={() => toggleProduct(product)}
                class="bg-card border-2 border-gray-200 hover:border-primary rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {#if product.image}
                  <img
                    src={product.image}
                    alt={product.title}
                    class="w-full h-32 object-cover"
                  />
                {/if}
                <div class="p-3">
                  <h4 class="font-semibold text-sm truncate text-left">{product.title}</h4>
                  <p class="text-primary font-bold text-sm mt-1">{Number(product.price || 0).toFixed(0)} FCFA</p>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {:else if selectedProducts.length > 0}
        <div class="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p class="text-green-800">Tous les produits sont sélectionnés!</p>
        </div>
      {:else}
        <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <p class="text-yellow-800">Aucun produit disponible</p>
        </div>
      {/if}

      <div class="flex gap-4 justify-end mt-8">
        <Button variant="outline" onclick={() => window.history.back()}>Annuler</Button>
        <Button onclick={nextStep} disabled={selectedProducts.length === 0}>
          Continuer vers les infos client →
        </Button>
      </div>
    </div>
  {/if}

  <!-- Step 2: Client Information -->
  {#if step === 2}
    <div class="space-y-6" transition:fade={{ duration: 300 }}>
      <!-- Progress -->
      <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-primary w-full transition-all duration-500"></div>
      </div>

      <form onsubmit={submitOrder} class="max-w-2xl">
        <h2 class="text-2xl font-semibold mb-6">Infos du client</h2>

        <!-- Order Summary -->
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
          <h3 class="font-semibold text-lg mb-4">Résumé de la commande</h3>
          <div class="space-y-3">
            {#each selectedProducts as item (item.product.id)}
              <div class="flex justify-between text-sm">
                <span>{item.product.title} × {item.quantity}</span>
                <span class="font-semibold">{(Number(item.product.price || 0) * item.quantity).toFixed(2)} FCFA</span>
              </div>
            {/each}
            <hr class="my-3" />
            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span class="text-primary">{totalPrice.toFixed(2)} FCFA</span>
            </div>
          </div>
        </div>

        <!-- Client Form -->
        <div class="space-y-4 mb-8">
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Nom du client *
            </label>
            <input
              id="name"
              type="text"
              bind:value={clientForm.name}
              placeholder="Ex: Ahmed Ndiaye"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              id="phone"
              type="tel"
              bind:value={clientForm.phone}
              placeholder="Ex: +221 77 123 45 67"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
              Adresse de livraison
            </label>
            <textarea
              id="address"
              bind:value={clientForm.address}
              placeholder="Ex: Rue 123, Dakar"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            ></textarea>
          </div>

          <div>
            <label for="status" class="block text-sm font-semibold text-gray-700 mb-2">Statut de la commande</label>
            <select id="status" bind:value={clientForm.status} class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
              {#each statuses as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onclick={previousStep}
            disabled={isSubmitting}
          >
            ← Retour à la sélection
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Création en cours..." : "Créer la commande"}
          </Button>
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    --transition-duration: 300ms;
  }
</style>
