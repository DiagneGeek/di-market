<script lang="ts">
  import Button from "$lib/components/Button.svelte"
  import Select from "$lib/components/Select.svelte"
  import type { Order, OrderItem } from "$lib/types"
  import { enhance } from "$app/forms"
	import { invalidateAll } from "$app/navigation";

  interface OrderWithDetails extends Order {
    buyer?: {
      id: number | string
      name: string
      phone: number
    }
    Order_Items?: Array<
      OrderItem & {
        product?: {
          id: number | string
          title: string
          price: string
          image: string
        }
      }
    >
  }

  interface Props {
    order: OrderWithDetails
  }

  const { data } = $props()
  const order = data.order

  let isEditingStatus = $state(false)
  let editingStatus = $state(order.status)

  const statuses = [
    "En attente",
    "Confirmée",
    "En cours",
    "Livrée",
    "Annulée"
  ]

  const statusColors: Record<string, string> = {
    "En attente": "bg-yellow-100 text-yellow-800",
    "Confirmée": "bg-green-100 text-green-800",
    "En cours": "bg-blue-100 text-blue-800",
    "Livrée": "bg-emerald-100 text-emerald-800",
    "Annulée": "bg-red-100 text-red-800"
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: string) => {
    return parseInt(price.replace(/\./g, "")).toLocaleString("fr-FR")
  }

  const calculateTotal = () => {
    return (order.Order_Items || []).reduce((sum: number, item: any) => {
      const price = item.price_at_the_time || 0
      return sum + price
    }, 0)
  }

  const parseAddress = (address: string) => {
    const parts = address.split('|')
    const [locality] = parts[0].split(",")
    return {
      location: parts[0] || '',
      locality: locality || "",
      country: parts[1] || '',
      name: parts[2] || ''
    }
  }

  const whatsappMessage = () => {
    const text = `Bonjour ${order.buyer?.name}, voici les détails de votre commande #${order.id}. ${
      (order.Order_Items || []).map((item: any) => `${item.product?.title}`).join(', ')
    }. Total: ${calculateTotal()} FCFA. Merci pour votre confiance!`
    return encodeURIComponent(text)
  }
</script>

<div class="max-w-6xl mx-auto py-4">
  <!-- Header Section -->
  <div class="mb-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
      <div>
        <h1 class="text-4xl font-bold text-heading">Commande #{order.id}</h1>
        <p class="text-gray-600 mt-1 text-sm">{formatDate(order.created_at)}</p>
      </div>
      
      <div class="flex items-center gap-3">
        {#if isEditingStatus}
          <form 
            action="/vendeurs/dashboard/commandes?/updateStatus" 
            method="POST" 
            use:enhance={() => {
              return ({ update }) => {
                  isEditingStatus = false
                  update()
                  invalidateAll()
                  order.status = editingStatus
              }
            }}
            class="flex gap-2 items-center">
            <input type="hidden" name="orderId" value={order.id} />
            <select 
              bind:value={editingStatus}
              name="status"
              class="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm font-medium"
            >
              {#each statuses as status}
                <option value={status}>{status}</option>
              {/each}
            </select>
            <Button 
              type="submit" 
              size="sm"
              variant="neutral">
              Enregistrer
            </Button>
            <Button 
               type="button" 
               variant="outline"
               onclick={() => isEditingStatus = false} 
               size="sm">
              Annuler
            </Button>
          </form>
        {:else}
          <div class="flex items-center gap-3">
            <span class="px-4 py-2 rounded-full {statusColors[order.status]} font-semibold text-sm">
              {order.status}
            </span>
            <Button 
              onclick={() => isEditingStatus = true} 
              size="sm" 
              variant="sober">
              Modifier
            </Button>
          </div>
        {/if}
      </div>
    </div>
    <div class="h-1 bg-gradient-to-r from-primary to-secondary rounded-full w-12"></div>
  </div>

  <!-- Main Grid Layout -->
  <div class="w-full gap-6 mb-6">
    <section class="my-8 flex flex-col md:flex-row md:justify-center gap-6 md:w-full">
      <!-- Customer Info Card -->
      <div class="bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-2xl p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
              <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 00.896.904A9.75 9.75 0 1021.75 12c0 .341.029.682.087 1.02a.75.75 0 101.485-.212A11.25 11.25 0 1020.25 12a.75.75 0 00-1.5 0A9.75 9.75 0 013.75 20.104z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-heading">Client</h2>
        </div>
        <div class="space-y-3">
          <div>
            <p class="text-xs uppercase tracking-wide text-gray-600 font-semibold">Nom</p>
            <p class="text-lg font-semibold text-gray-900">{order.Buyers?.name}</p>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-2">Contact</p>
            <div class="flex gap-2">
              <a href="tel:{order.Buyers?.phone}">
               <Button variant="sober" class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                  <path d="M15.863 13.29c-1.165-1.165-3.633-1.133-4.634-.132l-.707.707c-.195.195-.512.195-.707 0l-4.243-4.243c-.195-.195-.195-.512 0-.707l.707-.707c1.001-1.001.968-3.469-.132-4.634-1.165-1.165-3.633-1.133-4.634.132l-1.414 1.414C-1.005 5.887.019 9.477 3.172 12.63l8.485 8.485c3.153 3.153 6.743 4.177 9.192 1.728l1.414-1.414c1.265-1.265 1.297-3.633.132-4.634zm-1.414 1.414l-.707.707c-1.001 1.001.132 3.633 1.297 4.798 1.165 1.165 3.797.298 4.798-.703l.707-.707c1.001-1.001-1.132-3.633-2.297-4.798-1.165-1.165-3.797.298-4.798.703z"/>
                </svg>
                Appeler
                </Button>
              </a>
              <a href="https://wa.me/{order.Buyers?.phone}" target="_blank">
               <Button variant="outlineBorder" class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a9.87 9.87 0 00-5.031 1.378c-.355.228-.69.539-.897.910-.095.15-.147.315-.147.485 0 .819.487 1.53 1.243 1.91.192.099.384.159.58.159.424 0 .834-.159 1.172-.472.208-.192.402-.478.555-.822.12-.279.233-.543.29-.716.168-.525.401-.935.69-1.27.29-.336.666-.577 1.08-.687.415-.11.836-.11 1.237 0 .4.11.773.35 1.063.686.29.336.523.746.691 1.271.057.173.17.437.29.716.153.344.347.63.555.822.338.313.748.472 1.172.472.196 0 .388-.06.58-.159.756-.38 1.243-1.091 1.243-1.91 0-.17-.052-.335-.147-.485-.206-.371-.542-.682-.897-.91a9.87 9.87 0 00-5.031-1.378Z"/>
                </svg>
                WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Address Info Card -->
      <div class="bg-card rounded-2xl p-6 hover:shadow-sm transition-shadow">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.75.75 0 00.723 0l.028-.015.071-.041a60.856 60.856 0 002.503-1.333 37.831 37.831 0 006.406-5.307 37.826 37.826 0 006.14-7.645A11.856 11.856 0 0023.75 10.5c0-6.35-4.601-11.757-10.5-11.757-5.899 0-10.5 5.407-10.5 11.757 0 1.541.25 3.028.75 4.469a37.828 37.828 0 001.491 3.474 37.854 37.854 0 002.503 1.333z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-heading">Livraison</h2>
        </div>
        <div class="space-y-2 text-sm">
          <p class="font-semibold text-gray-900 text-base">{parseAddress(order.address).locality}</p>
          <p class="text-gray-600">{parseAddress(order.address).country}</p>
          <details class="text-gray-600">
            <summary class="cursor-pointer hover:text-gray-900 font-medium">Voir les détails complets</summary>
            <div class="mt-2 p-2 bg-white rounded border border-amber-200 text-xs text-gray-700">
              <p>{parseAddress(order.address).location}</p>
            </div>
          </details>
          {#if order.address_info}
            <div class="mt-3 p-3 bg-white rounded-lg border-l-4 border-secondary">
              <p class="text-xs text-gray-600 font-semibold">Info supplémentaire</p>
              <p class="text-gray-900 text-sm mt-1">{order.address_info}</p>
            </div>
          {/if}
        </div>
      </div>
  </section>

    <!-- Right Column: Products & Total -->
    <div class="lg:col-span-2">
      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.15 9.538A3.75 3.75 0 005.378 15H19.5a.75.75 0 000-1.5H5.378a2.25 2.25 0 100 4.5h14.143a.75.75 0 000 1.5H5.378A3.75 3.75 0 104.503 8.587l.589-2.605a.75.75 0 00-.722-.994H2.25z"/>
              <circle cx="18.75" cy="20.25" r="1.5"/>
              <circle cx="9" cy="20.25" r="1.5"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-heading">Articles de la Commande</h2>
        </div>
        
        <div class="space-y-3 mb-6">
          {#each order.Order_Items || [] as item}
            <div class="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-150 hover:border-gray-300 hover:shadow-sm transition-all">
              {#if item.product?.image}
                <img 
                  src={item.product.image} 
                  alt={item.product?.title}
                  class="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              {/if}
              <div class="flex-1 flex flex-col flex-wrap justify-between">
                <div>
                  <p class="font-semibold text-gray-900 text-base">{item.product?.title}</p>
                  <p class="text-sm text-gray-600 mt-1">Article #{item.product_id}</p>
                </div>
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <p class="text-secondary font-bold text-lg">
                    {formatPrice((item.price_at_the_time / item.quantity).toString() || '0')} FCFA 
                    <span class="text-xs text-gray">{item.price_at_the_time * item.quantity < item.product.price * item.quantity ? "(reduction)" : ""}</span>
                  </p>
                  <br>
                  <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">Quantité: {item.quantity}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Total Section -->
        <div class="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border-2 border-primary/20">
          <div class="flex justify-between items-center">
            <p class="text-gray-700 font-semibold">Total de la Commande:</p>
            <p class="text-3xl font-bold text-primary">{formatPrice(calculateTotal().toString())} FCFA</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="flex flex-col md:flex-row gap-3 md:justify-center">
    <a href="tel:{order.Buyers?.phone}">
      <Button class="w-full md:w-auto" size="lg">
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path d="M15.863 13.29c-1.165-1.165-3.633-1.133-4.634-.132l-.707.707c-.195.195-.512.195-.707 0l-4.243-4.243c-.195-.195-.195-.512 0-.707l.707-.707c1.001-1.001.968-3.469-.132-4.634-1.165-1.165-3.633-1.133-4.634.132l-1.414 1.414C-1.005 5.887.019 9.477 3.172 12.63l8.485 8.485c3.153 3.153 6.743 4.177 9.192 1.728l1.414-1.414c1.265-1.265 1.297-3.633.132-4.634zm-1.414 1.414l-.707.707c-1.001 1.001.132 3.633 1.297 4.798 1.165 1.165 3.797.298 4.798-.703l.707-.707c1.001-1.001-1.132-3.633-2.297-4.798-1.165-1.165-3.797.298-4.798.703z"/>
          </svg>
          Appeler le Client
        </span>
      </Button>
    </a>
    <a href="https://wa.me/{order.Buyers?.phone}" target="_blank">
      <Button class="w-full md:w-auto" variant="secondary" size="lg">
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a9.87 9.87 0 00-5.031 1.378c-.355.228-.69.539-.897.910-.095.15-.147.315-.147.485 0 .819.487 1.53 1.243 1.91.192.099.384.159.58.159.424 0 .834-.159 1.172-.472.208-.192.402-.478.555-.822.12-.279.233-.543.29-.716.168-.525.401-.935.69-1.27.29-.336.666-.577 1.08-.687.415-.11.836-.11 1.237 0 .4.11.773.35 1.063.686.29.336.523.746.691 1.271.057.173.17.437.29.716.153.344.347.63.555.822.338.313.748.472 1.172.472.196 0 .388-.06.58-.159.756-.38 1.243-1.091 1.243-1.91 0-.17-.052-.335-.147-.485-.206-.371-.542-.682-.897-.91a9.87 9.87 0 00-5.031-1.378Z"/>
          </svg>
          Contacter via WhatsApp
        </span>
      </Button>
    </a>
    <a href="/vendeurs/dashboard/commandes">
      <Button class="w-full md:w-auto" variant="outline" size="lg">
        <span class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Retour aux Commandes
        </span>
      </Button>
    </a>
  </div>
</div>