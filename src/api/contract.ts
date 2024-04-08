import { Node, NodeAddDto, ShardConfigDto } from '@/types/node'
import {
  OrderCombinationBarkerPostDto,
  OrderCombinationBarkerResponse,
  OrderPlaceResponse,
  OrderPostDto
} from '@/types/order'
import {
  FormattedStock,
  StockAddDto,
  StockAddResponse,
  StockBuyDto,
  StockBuyResponse,
  StockCheckDto,
  StockCheckResponse,
  StockFetchResponse,
  StockRefundDto,
  StockRefundResponse,
  StockUndoDto,
  StockUndoResponse
} from '@/types/stock'
import {
  Merchant,
  MerchantRegisterDto,
  MerchantRemoveDto,
  MerchantUpdateDto,
  User,
  UserRegisterDto,
  UserRegisterResponse
} from '@/types/user'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'
import { SupportedGame } from '..'
import {
  StockPriceFetchResponse,
  StockPriceSetResponse,
  StockPriceSetUpdateDto,
  StockPriceUpdateResponse
} from '@/types/stockPrice'

const c = initContract()

const exceptionType = z.object({
  statusCode: z.number(),
  message: z.string().array(),
  data: z.unknown().optional()
})

function responseWrapper<T extends z.ZodType<any>> (data: T) {
  return z.object({
    data,
    statusCode: z.number()
  })
}

const exceptions = {
  404: responseWrapper(exceptionType),
  500: responseWrapper(exceptionType)
}

function Responses<T extends z.ZodType<any>> (data: T) {
  return {
    200: responseWrapper(data),
    201: responseWrapper(data),
    ...exceptions
  }
}

const baseHeaders = z.object({
  Authorization: z.string(),
  'Content-Type': z.string()
})

export const BaseHeaders = ({ token }: { token: string }) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
})

export const StockContract = c.router(
  {
    fetch: {
      path: '/',
      method: 'GET',
      description: 'Get all available stocks',
      query: z.object({
        game: SupportedGame.optional()
      }),
      responses: Responses(StockFetchResponse)
    },
    add: {
      path: '/add',
      method: 'POST',
      body: StockAddDto,
      description: 'Add new stock',
      responses: Responses(StockAddResponse)
    },
    check: {
      path: '/check',
      method: 'POST',
      body: StockCheckDto,
      responses: Responses(StockCheckResponse)
    },
    buy: {
      path: '/buy',
      method: 'POST',
      body: StockBuyDto,
      responses: StockBuyResponse
    },
    refund: {
      path: '/refund',
      method: 'PATCH',
      body: StockRefundDto,
      responses: Responses(StockRefundResponse)
    },
    undo: {
      path: '/undo',
      method: 'PATCH',
      body: StockUndoDto,
      responses: Responses(StockUndoResponse)
    }
  },
  {
    baseHeaders,
    pathPrefix: '/stock'
  }
)

export const StockPriceContract = c.router(
  {
    fetch: {
      path: '/',
      method: 'GET',
      query: z.object({
        game: SupportedGame.optional(),
        amount: z.number().optional()
      }),
      description: 'Get all available stock prices',
      responses: Responses(StockPriceFetchResponse)
    },
    set: {
      path: '/',
      method: 'POST',
      body: StockPriceSetUpdateDto,
      description: 'Set new stock price',
      responses: Responses(StockPriceSetResponse)
    },
    update: {
      path: '/',
      method: 'PATCH',
      body: StockPriceSetUpdateDto,
      description: 'Update stock price',
      responses: Responses(StockPriceUpdateResponse)
    }
  },
  {
    baseHeaders,
    pathPrefix: '/stock/price'
  }
)

export const OrderContract = c.router(
  {
    place: {
      path: '/',
      method: 'POST',
      body: OrderPostDto,
      description: 'Place new order',
      responses: Responses(OrderPlaceResponse)
    },
    combinationBreaker: {
      path: '/combination-breaker',
      method: 'POST',
      body: OrderCombinationBarkerPostDto,
      description: 'Get all possible combinations for a given amount',
      responses: Responses(OrderCombinationBarkerResponse)
    }
  },
  {
    baseHeaders,
    pathPrefix: '/order'
  }
)

export const NodeContract = c.router(
  {
    fetch: {
      path: '/',
      method: 'GET',
      description: 'Get all available nodes',
      responses: Responses(Node.array())
    },
    add: {
      path: '/add',
      method: 'POST',
      body: NodeAddDto,
      responses: Responses(Node)
    },
    shardConfig: {
      path: '/shards/config',
      method: 'GET',
      description: 'Get all Virtual Shard Configurations',
      responses: Responses(ShardConfigDto)
    },
    updateShardConfig: {
      path: '/shards/config',
      method: 'PATCH',
      body: ShardConfigDto.partial(),
      description: 'Update Virtual Shard Configuration',
      responses: Responses(ShardConfigDto)
    }
  },
  {
    baseHeaders,
    pathPrefix: '/node'
  }
)

export const UserContract = c.router(
  {
    fetch: {
      path: '/',
      method: 'GET',
      description: 'Get user info',
      responses: Responses(User)
    },
    register: {
      path: '/register',
      method: 'POST',
      body: UserRegisterDto,
      description: 'Register new user',
      responses: Responses(UserRegisterResponse)
    },
    fetchMerchants: {
      path: '/merchant',
      method: 'GET',
      description: 'Get all merchants',
      responses: Responses(Merchant.array())
    },
    addMerchant: {
      path: '/merchant',
      method: 'POST',
      body: MerchantRegisterDto,
      description: 'Add new merchant',
      responses: Responses(Merchant)
    },
    updateMerchant: {
      path: '/merchant',
      method: 'PATCH',
      body: MerchantUpdateDto,
      description: 'Update merchant',
      responses: Responses(Merchant)
    },
    removeMerchant: {
      path: '/merchant',
      method: 'DELETE',
      body: MerchantRemoveDto,
      description: 'Remove merchant',
      responses: Responses(Merchant)
    }
  },
  {
    baseHeaders,
    pathPrefix: '/user'
  }
)
