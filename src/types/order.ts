import { number, object, string, z } from "zod";
import { SupportedGame } from "./init";

export const Order = object({
  id: number(),
  game: SupportedGame,
  userId: number(),
  node_id: number(),
  uid: string(),
  amount: string(),
  callbackUrl: string(),
  state: number(),
});

export const OrderPostDto = object({
  game: SupportedGame,
  amount: string(),
  uid: string(),
  quantity: number(),
  callbackUrl: string(),
});

export const OrderPlaceResponse = object({
  massage: string(),
  orderId: number(),
  order: Order,
});

export const OrderCombinationBarkerPostDto = object({
  amount: string(),
  game: SupportedGame,
});

export const OrderCombinationBarkerResponse = object({
  combinations: number().array(),
});

export const sequenceStateSchema = z.object({
  index: z.number(),
  sequenceId: z.number(),
  pageUrl: z.string().url(),
  pageOpened: z.boolean(),
  stockAmount: z.number(),
  stockSerial: z.string(),
  stockSerialType: z.string(),
  stockUseSuccess: z.boolean(),
  stockAlreadyUsed: z.boolean(),
  stockAlreadyUseProof: z.string().url(),
  stockTyped: z.boolean(),
  stockEntered: z.boolean(),
  applyBackUp: z.boolean(),
  backupStockSerial: z.string(),
  backupStockSerialType: z.string(),
  backupStockUseSuccess: z.boolean(),
  backupStockAlreadyUsed: z.boolean(),
  backupStockAlreadyUseProof: z.string().url(),
  backupStockTyped: z.boolean(),
  backupStockEntered: z.boolean(),
  paymentSuccess: z.boolean(),
  paymentProof: z.string().url(),
  retryCount: z.number(),
});

export const sequenceSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  stock_id: z.number(),
  backUpStock_id: z.number(),
  stockAccountId: z.number(),
  amount: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
});

export const orderSchema = z.object({
  game: z.string(),
  amount: z.string(),
  uid: z.string(),
  callbackUrl: z.string().url(),
  id: z.number(),
  userId: z.number(),
  node_id: z.number(),
  state: z.number(),
  sequences: z.array(sequenceSchema),
  user: userSchema,
});

export const orderStateSchema = z.object({
  id: z.number(),
  browserLaunched: z.boolean(),
  pageOpened: z.boolean(),
  portalUrl: z.string().url(),
  loggedIn: z.boolean(),
  loggedInUser: z.string(),
  proceedToPayUrl: z.string().url(),
  orderSuccess: z.boolean(),
  orderFailed: z.boolean(),
  orderFailedMessage: z.string(),
  orderFailedErrorCode: z.number(),
  orderFailedProof: z.string().url(),
  took: z.number(),
});

export const orderStatusObj = z.object({
  status: z.string(),
  order: orderSchema,
  orderState: orderStateSchema,
  sequenceStates: z.record(sequenceStateSchema),
  lastUpdate: z.string().datetime(),
});

export const OrderStatusResponse = z.object({
  type: z.string(),
  errorCode: z.string(),
  data: orderStatusObj,
});

export const OrderFetchResponse = z.object({
  order: orderSchema,
});

export const OrderQuearyDto = object({
  offset: number(),
  limit: number(),
});

export const OrderQuearyResponse = z.object({
  totalCount: number(),
  orders: orderSchema.array(),
});
