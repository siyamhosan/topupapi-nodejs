import { BaseHeaders, StockPriceContract } from '@/api/contract'
import {
  StockAddOptions,
  StockBuyDto,
  StockCheckDto,
  StockRefundDto,
  StockUndoDto
} from '@/types/stock'
import { initClient } from '@ts-rest/core'
import { SupportedGame } from '..'
import { StockPriceSetUpdateDto } from '@/types/stockPrice'

export interface StockPriceFetchOptions {
  game?: typeof SupportedGame._type
  amount?: number
}

export class StockPriceManager {
  private _api

  constructor ({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(StockPriceContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl
    })
  }

  /**
   *
   * @description Fetches all current stock prices
   */
  async fetch (otp?: StockPriceFetchOptions) {
    const res = await this._api.fetch({
      query: otp
    })

    if (res.status === 200 || res.status === 201) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Adds a new stock price
   */
  async create ({
    price,
    amount,
    note,
    game
  }: typeof StockPriceSetUpdateDto._type) {
    const res = await this._api.set({
      body: {
        price,
        amount,
        note,
        game
      }
    })

    if (res.status === 200 || res.status === 201) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Updates a stock price
   */
  async update ({
    price,
    amount,
    note,
    game
  }: typeof StockPriceSetUpdateDto._type) {
    const res = await this._api.update({
      body: {
        amount,
        price,
        note,
        game
      }
    })

    if (res.status === 200 || res.status === 201 || res.status === 404) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }
}
