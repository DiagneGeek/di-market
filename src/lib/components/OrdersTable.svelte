<script lang="ts">
  import type { Order } from "$lib/types"

  interface Props {
    orders: Order[]
  }

  const { orders = [] } = $props()

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "En attente" },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmée" },
      shipped: { color: "bg-blue-100 text-blue-800", label: "Expédiée" },
      delivered: { color: "bg-emerald-100 text-emerald-800", label: "Livrée" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Annulée" }
    }
    return statusMap[status] || { color: "bg-gray-100 text-gray-800", label: status }
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
</script>

<div class="bg-card rounded-lg overflow-hidden border border-gray-200">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-back-main border-b border-gray-200">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Commande</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Articles</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Adresse</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each orders as order}
          <tr class="hover:bg-back-main transition-colors">
            <td class="px-4 py-3 text-sm font-medium text-primary">#{order.id}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{formatDate(order.created_at)}</td>
            <td class="px-4 py-3 text-sm text-gray-600">
              {order.Order_Items?.length || 0} article{order.Order_Items?.length !== 1 ? 's' : ''}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={order.address}>
              {order.address}
            </td>
            <td class="px-4 py-3 text-sm">
              <span class="px-2 py-1 rounded-full {getStatusBadge(order.status).color} font-semibold text-xs">
                {getStatusBadge(order.status).label}
              </span>
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
