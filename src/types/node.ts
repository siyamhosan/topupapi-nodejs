import { number, object, string } from 'zod'

export const Node = object({
  id: number(),
  endPoint: string(),
  connectionToken: string(),
  createdAt: string()
})

export const NodeAddDto = object({
  endPoint: string().ip(),
  connectionToken: string()
})
