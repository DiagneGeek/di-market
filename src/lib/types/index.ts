export interface Article {
  id?: number
  created_at?: any,
  title: string,
  description: string,
  price: string,
  slug?: string,
  category: string,
  image: string
  seller_id?: number
}

export interface User {
  id?: number,
  created_at?: any,
  name: string,
  phone: string,
  password?: string,
  plan: string,
  credits: number
}