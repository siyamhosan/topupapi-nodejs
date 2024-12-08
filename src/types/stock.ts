import { array, boolean, literal, number, object, string, z } from "zod";
import { StockType, SupportedGame } from "./init";

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
  available: z.boolean(),
  missing: number().array(),
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

export const StockMapObj = object({
  [SupportedGame._type]: object({
    [string()._type]: object({
      amount: number(),
      stockLen: number(),
      stockIds: array(number()),
      usedAsBackupIds: array(number()),
    }),
  }),
});

export const StockFetchResponse = object({
  stocks: StockMapObj,
});

export const StockBuyResponse = {
  200: object({
    statusCode: number(),
    data: object({
      available: boolean(),
      quantity: number(),
      codes: object({
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
      missing: number().array(),
      available: boolean(),
    }),
  }),
};

/**
 * {
    "data": {
        "stockAccounts": [
            {
                "accountType": "GARENA_SHELL",
                "active": false,
                "id": 4,
                "game": "FREE_FIRE_SHELL",
                "lastBalance": null,
                "region": "MY",
                "owner": 1,
                "updatedAt": "2024-11-25T18:43:46.828Z",
                "createdAt": "2024-11-25T22:38:00.425Z",
                "credentials": {
                    "username": "MR777BOU"
                }
            },
            {
                "accountType": "GARENA_SHELL",
                "active": true,
                "id": 8,
                "game": "FREE_FIRE_ID",
                "lastBalance": 1515,
                "region": "ID",
                "owner": 1,
                "updatedAt": "2024-12-06T11:36:09.359Z",
                "createdAt": "2024-12-04T22:21:10.538Z",
                "credentials": {
                    "username": "Mausm3456565"
                }
            },
            {
                "accountType": "GARENA_SHELL",
                "active": true,
                "id": 5,
                "game": "FREE_FIRE_SHELL",
                "lastBalance": 23555,
                "region": "MY",
                "owner": 1,
                "updatedAt": "2024-12-03T14:58:37.120Z",
                "createdAt": "2024-11-25T23:05:20.403Z",
                "credentials": {
                    "username": "MR777BOU"
                }
            },
            {
                "accountType": "GARENA_SHELL",
                "active": true,
                "id": 6,
                "game": "FREE_FIRE_SG",
                "lastBalance": 343,
                "region": "SG",
                "owner": 1,
                "updatedAt": "2024-12-08T22:35:32.036Z",
                "createdAt": "2024-12-04T18:20:10.128Z",
                "credentials": {
                    "username": "Abutalha990"
                }
            },
            {
                "accountType": "GARENA_SHELL",
                "active": false,
                "id": 7,
                "game": "FREE_FIRE_ID",
                "lastBalance": 1527,
                "region": "ID",
                "owner": 1,
                "updatedAt": "2024-12-04T22:24:29.292Z",
                "createdAt": "2024-12-04T19:25:08.720Z",
                "credentials": {
                    "username": "Mausm3456565"
                }
            }
        ]
    },
    "statusCode": 200
}
 */
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

export const StockAccountDto = object({
  game: SupportedGame,
  region: string(),
  credentials: string(),
});

/**
 * {
    "data": {
        "quantity": 1,
        "codes": [
            {
                "id": 9,
                "owner": 1,
                "game": "FREE_FIRE_ID",
                "active": true,
                "accountType": "GARENA_SHELL",
                "credentials": {
                    "username": "username",
                    "password": "password+",
                    "authCode": "authcode"
                },
                "region": "ID",
                "checkCode": "1:ID:username:password+:authcode",
                "lastBalance": null,
                "createdAt": "2024-12-08T22:45:02.085Z",
                "updatedAt": "2024-12-08T22:45:02.085Z"
            }
        ]
    },
    "statusCode": 200
}
 */
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

/**{
    "data": {
        "message": [
            "Stock Account updated successfully"
        ],
        "stockAccount": [
            {
                "id": 9,
                "owner": 1,
                "game": "FREE_FIRE_ID",
                "active": true,
                "accountType": "GARENA_SHELL",
                "credentials": {
                    "username": "username"
                },
                "region": "ID",
                "checkCode": "1:ID:username",
                "lastBalance": null,
                "createdAt": "2024-12-08T22:45:02.085Z",
                "updatedAt": "2024-12-08T22:45:39.761Z"
            }
        ]
    },
    "statusCode": 200
} */
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
