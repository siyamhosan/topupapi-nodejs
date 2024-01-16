import { Node, NodeAddDto } from '@/types/node'
import { OrderPlaceResponse, OrderPostDto } from '@/types/order'
import {
  FormattedStock,
  StockAddDto,
  StockAddResponse,
  StockBuyDto,
  StockBuyResponse,
  StockCheckDto,
  StockCheckResponse,
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
      responses: Responses(FormattedStock.array())
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
      responses: Responses(StockBuyResponse)
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

export const OrderContract = c.router(
  {
    place: {
      path: '/',
      method: 'POST',
      body: OrderPostDto,
      description: 'Place new order',
      responses: Responses(OrderPlaceResponse)
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