import { number, object, string } from "zod";
import { SupportedGame } from "./init";

export const StockPriceSetUpdateDto = object({
  game: SupportedGame,
  amount: number(),
  price: string(),
  note: string().optional(),
});

export const StockPriceSetDeleteDto = object({
  game: SupportedGame,
  amount: number(),
});

/**
 *   {
                "id": 3,
                "owner": 1,
                "game": "FREE_FIRE",
                "amount": 36,
                "price": "885251.00",
                "note": "notmal rate",
                "uniqueString": "1:FREE_FIRE:36",
                "createdAt": "2024-03-30",
                "updatedAt": "2024-03-30"
            }
 */

export const StockPriceRaw = object({
  id: number(),
  owner: number(),
  game: SupportedGame,
  amount: number(),
  price: string(),
  note: string().optional(),
  uniqueString: string(),
  createdAt: string(),
  updatedAt: string(),
});

export const FormattedStockPrice = object({
  amount: number(),
  price: number(),
  note: string().optional(),
});

export const StockPriceMapObj = object({
  [SupportedGame._type]: object({
    [string()._type]: FormattedStockPrice,
  }),
});

export const StockPriceFetchResponse = object({
  prices: StockPriceMapObj,
});

export const StockPriceSetResponse = object({
  message: string().array(),
  stockPrice: StockPriceRaw.array(),
});

export const StockPriceUpdateResponse = object({
  message: string().array(),
  stockPrice: StockPriceRaw,
});
