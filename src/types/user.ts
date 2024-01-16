import { object, z } from 'zod'
import { UserRole } from './init'

export const UserRegisterDto = z.object({
  name: z.string()
})

export const MerchantRegisterDto = z.object({
  userId: z.number(),
  profitRate: z.number()
})

export const MerchantUpdateDto = z.object({
  userId: z.number(),
  profitRate: z.number()
})

export const MerchantRemoveDto = z.object({
  userId: z.number()
})

export const User = object({ id: z.number(), name: z.string(), role: UserRole })

export const UserRegisterResponse = User.and(object({ token: z.string() }))

export const Merchant = User.and(
  object({
    profitRate: z.string(),
    supplierId: z.number()
  })
)
