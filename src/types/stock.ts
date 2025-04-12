import { array, boolean, literal, number, object, string, z } from "zod";
import { StockType, SupportedGame, SupportedRegion } from "./init";

export const UNIPIN_VOUCHER = object({
  amount: number(),
  serial: string(),
});

export const UNIPIN_VOUCHERWITHID = object({
  id: number(),
  game: SupportedGame,
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
  price: string(),
});

export interface StockAddOptions {
  game: typeof SupportedGame._type;
  codeTxt: string;
  amount: number;
  price: string | number;
}

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
  codes: UNIPIN_VOUCHERWITHID.array(),
});

export const StockCheckResponse = object({
  available: boolean(),
  missing: object({
    [string()._type]: number(),
  }).nullable(),
});

export const StockRefundResponse = object({
  message: string().array(),
  stocks: Stock.array(),
});

export const StockUndoResponse = object({
  ids: number().array(),
  codes: Stock.array(),
  type: z.enum(StockUndoTypes),
});

export const StockAccountsResponse = object({
  statusCode: number(),
  data: object({
    stockAccounts: object({
      accountType: string(),
      active: boolean(),
      id: number(),
      game: SupportedGame,
      lastBalance: number().optional(),
      region: string(),
      owner: number(),
      updatedAt: string(),
      createdAt: string(),
      credentials: object({
        username: string(),
      }),
    }).array(),
  }),
});

export const StockMapObj = object({
  [SupportedGame._type]: object({
    [string()._type]: number(),
  }),
});

export const StockFetchResponse = object({
  stocks: StockMapObj,
  stockAccounts: StockAccountsResponse.shape.data.shape.stockAccounts,
});

export const StockBuyResponse = {
  200: object({
    statusCode: number(),
    data: object({
      available: boolean(),
      quantity: number(),
      codes: object({
        id: number(),
        code: object({
          amount: number(),
          serial: string(),
        }),
        codeType: StockType,
        game: SupportedGame,
      }).array(),
    }),
  }),
  201: object({
    statusCode: number(),
    data: object({
      available: boolean(),
      quantity: number(),
      codes: object({
        id: number(),
        code: object({
          amount: number(),
          serial: string(),
        }),
        codeType: StockType,
        game: SupportedGame,
      }).array(),
    }),
  }),
  404: object({
    statusCode: number(),
    message: string().array(),
    data: object({
      missing: object({
        [string()._type]: number(),
      }),
      available: boolean(),
    }),
  }),
};

export const StockAccountDto = object({
  game: SupportedGame,
  region: SupportedRegion,
  credentials: string(),
});

export const StockAccountAddResponse = object({
  statusCode: number(),
  data: object({
    quantity: number(),
    codes: object({
      id: number(),
      owner: number(),
      game: SupportedGame,
      active: boolean(),
      accountType: string(),
      credentials: object({
        username: string(),
        password: string(),
        authCode: string(),
      }),
      region: string(),
      checkCode: string(),
      lastBalance: number().optional(),
      createdAt: string(),
      updatedAt: string(),
    }).array(),
  }),
});

export const StockAccountUpdateDto = object({
  stockAccountId: number(),
  active: boolean(),
});

export const StockAccountUpdateResponse = object({
  statusCode: number(),
  data: object({
    message: string().array(),
    stockAccount: object({
      id: number(),
      owner: number(),
      game: SupportedGame,
      active: boolean(),
      accountType: string(),
      credentials: object({
        username: string(),
      }),
      region: string(),
      checkCode: string(),
      lastBalance: number().optional(),
      createdAt: string(),
      updatedAt: string(),
    }).array(),
  }),
});

export const StockAccountDeleteDto = object({
  stockAccountId: number(),
});

export const StockAccountDeleteResponse = object({
  statusCode: number(),
  data: object({
    message: string().array(),
    stockAccount: object({
      id: number(),
      owner: number(),
      game: SupportedGame,
      active: boolean(),
      accountType: string(),
      credentials: object({
        username: string(),
        password: string(),
        authCode: string(),
      }),
      region: string(),
      checkCode: string(),
      lastBalance: number().optional(),
      createdAt: string(),
      updatedAt: string(),
    }).array(),
  }),
});
