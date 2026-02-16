export interface Article {
  id?: number | string,
  created_at?: any,
  title: string,
  description: string,
  price: string,
  slug?: string,
  category: string,
  image: string,
  seller_id?: number | string,
  views: number,
  wsapp_open: number,
  discount: number | null,
  discount_type: string | null,
  discount_end: any
}

export interface User {
  id?: number,
  created_at?: any,
  name: string,
  phone: string,
  password?: string,
  plan: string,
  trial_ends_at: any
}

export interface Event {
  seller_id: number | string
  type: string,
  created_at: any,
  product_id?: number | string
}

export interface Buyer {
  id?: number,
  name: string,
  phone: number,
  auth_credential: string
}

export interface OrderItem {
  id?: number,
  order_id: number | string,
  product_id: number | string,
  created_at?: any,
  quantity?: number,
  price_at_the_time?: number | string
}

export interface Order {
  id?: number | string,
  created_at?: any,
  address: string,
  address_info: string,
  status: string,
  seller_id: number | string,
  buyer_id: number | string,
  Order_Items?: OrderItem[]
}