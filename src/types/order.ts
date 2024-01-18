import { number, object, string } from 'zod'
import { SupportedGame } from './init'

export const Order = object({
  id: number(),
  game: SupportedGame,
  userId: number(),
  node_id: number(),
  uid: string(),
  amount: string(),
  callbackUrl: string(),
  state: number()
})

export const OrderPostDto = object({
  game: SupportedGame,
  amount: string(),
  uid: string(),
  quantity: number(),
  callbackUrl: string()
})

export const OrderPlaceResponse = object({
  massage: string(),
  orderId: number(),
  order: Order
})
