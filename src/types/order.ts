import { number, object, string } from 'zod'
import { SupportedGame } from './init'

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
  order: object({
    id: number(),
    game: SupportedGame,
    userId: number(),
    node_id: number(),
    uid: string(),
    callbackUrl: string(),
    state: number()
  })
})
