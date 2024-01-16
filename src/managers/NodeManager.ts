import { BaseHeaders, NodeContract } from '@/api/contract'
import { NodeAddDto } from '@/types/node'
import { initClient } from '@ts-rest/core'

export class NodeManager {
  private _api

  constructor ({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(NodeContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl
    })
  }

  /**
   * @description Fetches the available nodes
   * @access private Admin Only
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
   * @description Adds a new node
   * @access private Admin Only
   */
  async add ({ connectionToken, endPoint }: typeof NodeAddDto._type) {
    const res = await this._api.add({
      body: {
        connectionToken,
        endPoint
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
