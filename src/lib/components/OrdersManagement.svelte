<script lang="ts">
  import Button from "$lib/components/Button.svelte"
  import type { Order } from "$lib/types"
  import { enhance } from "$app/forms"

  interface OrderWithBuyer extends Order {
    buyer?: {
      id: number | string
      name: string
      phone: number
      auth_credential?: string
    }
  }

  interface Props {
    orders: OrderWithBuyer[]
  }

  const { orders = [] } = $props()

  const statuses = [
    { value: "En attente", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
    { value: "Confirmée", label: "Confirmée", color: "bg-green-100 text-green-800" },
    { value: "Expédiée", label: "Expédiée", color: "bg-blue-100 text-blue-800" },
    { value: "Livrée", label: "Livrée", color: "bg-emerald-100 text-emerald-800" },
    { value: "Annulée", label: "Annulée", color: "bg-red-100 text-red-800" }
  ]

  const getStatusBadge = (status: string) => {
    return statuses.find(s => s.value === status) || { value: status, label: status, color: "bg-gray-100 text-gray-800" }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAddress = (address: string) => {
    const parts = address.split('|')
    const locality = parts[0].split(",")[0]
    return locality || parts[0] || address
  }
</script>

<!-- Desktop View -->
<div class="hidden md:block bg-card rounded-lg overflow-hidden border border-gray-200">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-back-main border-b border-gray-200">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Adresse</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Articles</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each orders as order (order.id)}
          <tr class="hover:bg-back-main transition-colors">
            <td class="px-4 py-3 text-sm font-medium text-primary cursor-pointer hover:underline">
              <a href="/vendeurs/dashboard/commandes/{order.id}">#{order.id}</a>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              <div class="font-medium">{order.buyer?.name || 'N/A'}</div>
              <div class="text-xs text-gray-500">{order.address_info || ''}</div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              <a href="tel:{order.buyer?.phone}" class="text-primary hover:underline">
                {order.buyer?.phone || 'N/A'}
              </a>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 max-w-xs">
              <div class="truncate" title={order.address}>
                {formatAddress(order.address)}
              </div>
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {order.Order_Items?.length || 0}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {formatDate(order.created_at)}
            </td>
            <td class="px-4 py-3 text-sm">
              <span class="px-2 py-1 rounded-full {getStatusBadge(order.status).color} font-semibold text-xs">
                {getStatusBadge(order.status).label}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <a href="/vendeurs/dashboard/commandes/{order.id}">
                <Button size="sm" variant="neutral">Voir</Button>
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if orders.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500">Aucune commande pour cette période</p>
    </div>
  {/if}
</div>

<!-- Mobile View -->
<div class="md:hidden space-y-3">
  {#each orders as order (order.id)}
    <div class="bg-card border border-gray-200 rounded-lg overflow-hidden">
      <!-- Header Section -->
      <div class="bg-back-main border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <a href="/vendeurs/dashboard/commandes/{order.id}" class="font-bold text-primary hover:underline">
          Commande #{order.id}
        </a>
        <span class="px-2 py-1 rounded-full {getStatusBadge(order.status).color} font-semibold text-xs whitespace-nowrap ml-2">
          {getStatusBadge(order.status).label}
        </span>
      </div>

      <!-- Body Section -->
      <div class="p-4 space-y-3">
        <!-- Customer Info -->
        <div class="border-b border-gray-100 pb-3">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Client</p>
          <p class="text-sm font-semibold text-gray-800">{order.buyer?.name || 'N/A'}</p>
          {#if order.buyer?.phone}
            <a href="tel:{order.buyer?.phone}" class="text-xs text-primary hover:underline">
              📞 {order.buyer?.phone}
            </a>
          {/if}
        </div>

        <!-- Delivery Address -->
        <div class="border-b border-gray-100 pb-3">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Adresse</p>
          <p class="text-sm text-gray-700">{formatAddress(order.address)}</p>
        </div>

        <!-- Date and Items Row -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</p>
            <p class="text-sm text-gray-700">{formatDate(order.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Articles</p>
            <p class="text-sm font-semibold text-primary">{order.Order_Items?.length || 0}</p>
          </div>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="border-t border-gray-200 px-4 py-3 bg-back-main">
        <a href="/vendeurs/dashboard/commandes/{order.id}" class="block w-full">
          <Button class="w-full" size="md">Voir détails</Button>
        </a>
      </div>
    </div>
  {/each}

  {#if orders.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500">Aucune commande pour cette période</p>
    </div>
  {/if}
</div>
