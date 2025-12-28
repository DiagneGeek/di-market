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