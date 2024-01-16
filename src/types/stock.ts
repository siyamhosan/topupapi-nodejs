import { array, boolean, number, object, string, z } from "zod";
import { StockType, SupportedGame } from "./init";

export const UNIPIN_VOUCHER = object({
  amount: number(),
  serial: string(),
});

export const UNIPIN_GIFT_CARD = object({
  amount: number(),
  serial: string(),
});

export const FormattedStock = object({
  id: number(),
  codeType: StockType,
  game: SupportedGame,
  amount: number(),
  createdAt: string(),
});

export const Stock = object({
  id: number(),
  createdAt: string(),
  owner: number(),
  game: SupportedGame,
  codeType: StockType,
  code: UNIPIN_VOUCHER,
  checkCode: string(),
  onUse: boolean(),
  onBackupUse: boolean(),
  isUsed: boolean(),
  usedFor: number().optional(),
  isSold: boolean(),
  lastUpdate: string().optional(),
  price: string(),
});

export const StockAddDto = object({
  game: SupportedGame,
  codeTxt: string(),
  amount: number(),
  price: number(),
});

export const StockCheckDto = object({
  game: SupportedGame,
  combination: array(number()),
  quantity: number().optional(),
});

export const StockBuyDto = object({
  game: SupportedGame,
  combination: array(number()),
  quantity: number().optional(),
});

export const StockRefundDto = object({
  game: SupportedGame,
  checkCode: array(string()),
});

export const StockUndoTypes = ["add", "buy", "refund"] as const;

export const StockUndoDto = object({
  type: z.enum(StockUndoTypes),
});

export const StockAddResponse = object({
  quantity: number(),
  codes: UNIPIN_VOUCHER.array(),
});

export const StockCheckResponse = object({
  available: z.boolean(),
  missing: number().array(),
});

export const StockBuyResponse = object({
  quantity: number(),
  codes: object({
    code: string(),
    codeType: StockType,
    game: SupportedGame,
  }),
}).or(StockCheckResponse);

export const StockRefundResponse = object({
  message: string().array(),
  stocks: Stock.array(),
});

export const StockUndoResponse = object({
  ids: number().array(),
  codes: Stock.array(),
  type: z.enum(StockUndoTypes),
});
