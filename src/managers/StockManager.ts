import { BaseHeaders, StockContract } from '@/api/contract'
import {
  StockAddDto,
  StockBuyDto,
  StockCheckDto,
  StockRefundDto,
  StockUndoDto
} from '@/types/stock'
import { initClient } from '@ts-rest/core'

export class StockManager {
  private _api

  constructor ({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(StockContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl
    })
  }

  /**
   *
   * @description Fetches all current stocks
   */
  async fetch () {
    const res = await this._api.fetch()

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Adds a new stock
   */
  async add ({ price, amount, codeTxt, game }: typeof StockAddDto._type) {
    const res = await this._api.add({
      body: {
        price,
        amount,
        codeTxt,
        game
      }
    })

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Checks if the stock is available
   */
  async check ({ combination, game, quantity = 1 }: typeof StockCheckDto._type) {
    const res = await this._api.check({
      body: {
        combination,
        game,
        quantity
      }
    })

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Buys a stock
   */
  async buy ({ combination, game, quantity = 1 }: typeof StockBuyDto._type) {
    const res = await this._api.buy({
      body: {
        combination,
        game,
        quantity
      }
    })

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Refunds a stock after buying
   */
  async refund ({ checkCode, game }: typeof StockRefundDto._type) {
    const res = await this._api.refund({
      body: {
        checkCode,
        game
      }
    })

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  /**
   * @description Undo a task
   */
  async undo ({ type }: typeof StockUndoDto._type) {
    const res = await this._api.undo({
      body: {
        type
      }
    })

    if (res.status === 200) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }
}