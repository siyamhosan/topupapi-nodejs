import { BaseHeaders, OrderContract } from '@/api/contract'
import { OrderCombinationBarkerPostDto, OrderPostDto } from '@/types/order'
import { initClient } from '@ts-rest/core'

export class OrderManager {
  private _api

  constructor ({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(OrderContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl
    })
  }

  /**
   * @description Places a new order
   */
  async place ({
    amount,
    callbackUrl,
    game,
    quantity = 1,
    uid
  }: typeof OrderPostDto._type) {
    const res = await this._api.place({
      body: {
        amount,
        callbackUrl,
        game,
        quantity,
        uid
      }
    })

    if (res.status === 200 || res.status === 201) {
      return res.body.data
    } else {
      throw res.body
      return null
    }
  }

  async combinationBreaker ({
    amount,
    game
  }: typeof OrderCombinationBarkerPostDto._type) {
    const res = await this._api.combinationBreaker({
      body: {
        amount,
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
}
