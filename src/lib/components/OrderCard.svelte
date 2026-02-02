<script lang="ts">
  import type { Order } from "$lib/types"

  interface Props {
    title: string
    ordersCount: number
    previousOrdersCount?: number
    period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo"
    orders?: Order[]
  }

  const { title, ordersCount, previousOrdersCount = 0, period, orders = [] } = $props()

  const format = (n: number) => n.toLocaleString('fr-FR')

  const percentChange = $derived.by(() => {
    if (previousOrdersCount === 0) return null
    const change = ((ordersCount - previousOrdersCount) / previousOrdersCount) * 100
    return change
  })

  const getPeriodLabel = (p: string) => {
    const labels: Record<string, string> = {
      oneDayAgo: "dernière 24h",
      sevenDaysAgo: "7 derniers jours",
      thirtyDaysAgo: "30 derniers jours",
      oneYearAgo: "12 derniers mois"
    }
    return labels[p] || p
  }

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
</script>

<div class="bg-card rounded-lg p-4 border border-gray-200">
  <div class="mb-4">
    <h3 class="text-sm font-semibold text-gray-600">{title}</h3>
    <p class="text-3xl font-bold text-primary mt-2">{format(ordersCount)}</p>
    
    {#if previousOrdersCount !== undefined && previousOrdersCount > 0}
      <div class="mt-2 text-xs">
        {#if percentChange !== null}
          <span class={percentChange >= 0 ? "text-green-600" : "text-red-600"}>
            {percentChange >= 0 ? "↑" : "↓"} {Math.abs(percentChange).toFixed(1)}%
          </span>
        {/if}
        <span class="text-gray-500"> vs {getPeriodLabel(period)} précédente</span>
      </div>
    {/if}
  </div>

  {#if orders && orders.length > 0}
    <div class="mt-6 border-t border-gray-200 pt-4">
      <p class="text-xs font-semibold text-gray-600 mb-3">Dernières commandes</p>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        {#each orders.slice(0, 5) as order}
          <div class="flex items-center justify-between text-xs bg-back-main rounded p-2">
            <div>
              <p class="font-medium">#{order.id}</p>
              <p class="text-gray-500">{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
            </div>
            <span class="px-2 py-1 rounded-full {getStatusBadge(order.status).color} text-xs font-semibold">
              {getStatusBadge(order.status).label}
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
