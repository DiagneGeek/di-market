import { getDates } from "./getDates"
import type { Event, Product, Order } from "$lib/types"

export interface AnalyticsData {
  views: Event[]
  addToCart: Event[]
  productViews: Record<string, number>
  topProducts: Product[]
  previousViews: Event[]
  previousAddToCart: Event[]
  conversionRate: number
  previousConversionRate: number
  orders: Order[]
  previousOrders: Order[]
  totalOrderAmount: number
  previousTotalOrderAmount: number
  ordersCount: number
  previousOrdersCount: number
}

export function useAnalytics(
  events: Event[],
  products: Product[],
  period: "oneDayAgo" | "sevenDaysAgo" | "thirtyDaysAgo" | "oneYearAgo",
  orders: Order[] = []
): AnalyticsData {
  const periods = getDates()

  const periodDurations = {
    oneDayAgo: 1 * 24 * 60 * 60 * 1000,
    sevenDaysAgo: 7 * 24 * 60 * 60 * 1000,
    thirtyDaysAgo: 30 * 24 * 60 * 60 * 1000,
    oneYearAgo: 365 * 24 * 60 * 60 * 1000,
  }

  // Current period
  const eventsInThisPeriod = events?.filter(
    (event: Event) => new Date(event.created_at) >= new Date(periods[period])
  ) || []

  const views = eventsInThisPeriod.filter(
    (event: Event) => event.type === "product_view"
  )

  const addToCart = eventsInThisPeriod.filter(
    (event: Event) => event.type === "add_to_cart"
  )

  const productViews = views.reduce((acc: any, event: Event) => {
    if (event.product_id) {
      acc[event.product_id] = (acc[event.product_id] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const topProducts = products?.sort(
    (a: Product, b: Product) =>
      (productViews[b.id || 0] || 0) - (productViews[a.id || 0] || 0)
  ).slice(0, 5) || []

  // Previous period for comparison
  const previousStart = new Date(
    periods[period].getTime() - periodDurations[period]
  )
  const previousEnd = periods[period]

  const previousEventsInPeriod = events?.filter((event: Event) => {
    const d = new Date(event.created_at)
    return d >= previousStart && d < previousEnd
  }) || []

  const previousViews = previousEventsInPeriod.filter(
    (event: Event) => event.type === "product_view"
  )

  const previousAddToCart = previousEventsInPeriod.filter(
    (event: Event) => event.type === "add_to_cart"
  )

  // Conversion rates
  const conversionRate =
    views.length > 0 ? (addToCart.length / views.length) * 100 : 0
  const previousConversionRate =
    previousViews.length > 0
      ? (previousAddToCart.length / previousViews.length) * 100
      : 0

  // Orders data
  const ordersInThisPeriod = orders?.filter((order: Order) => {
    const orderDate = new Date(order.created_at)
    return orderDate >= new Date(periods[period])
  }) || []

  const previousOrdersInPeriod = orders?.filter((order: Order) => {
    const orderDate = new Date(order.created_at)
    return orderDate >= previousStart && orderDate < previousEnd
  }) || []

  return {
    views,
    addToCart,
    productViews,
    topProducts,
    previousViews,
    previousAddToCart,
    conversionRate,
    previousConversionRate,
    orders: ordersInThisPeriod,
    previousOrders: previousOrdersInPeriod,
    totalOrderAmount: ordersInThisPeriod.length,
    previousTotalOrderAmount: previousOrdersInPeriod.length,
    ordersCount: ordersInThisPeriod.length,
    previousOrdersCount: previousOrdersInPeriod.length,
  }
}
