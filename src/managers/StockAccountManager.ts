import { BaseHeaders, StockAccountContract } from "@/api/contract";
import {
  StockAccountDto,
  StockAccountUpdateDto,
  StockAccountDeleteDto,
} from "@/types/stock";
import { initClient } from "@ts-rest/core";

export class StockAccountManager {
  private _api;

  constructor({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(StockAccountContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl,
    });
  }

  /**
   * @description Fetches all stock accounts
   */
  async fetch() {
    const res = await this._api.fetch({});

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
    }
  }

  /**
   * @description Adds a new stock account
   */
  async add(data: typeof StockAccountDto._type) {
    const res = await this._api.add({
      body: data,
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
    }
  }

  /**
   * @description Updates a stock account
   */
  async update(data: typeof StockAccountUpdateDto._type) {
    const res = await this._api.update({
      body: data,
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
    }
  }

  /**
   * @description Deletes a stock account
   */
  async delete(data: typeof StockAccountDeleteDto._type) {
    const res = await this._api.delete({
      body: data,
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
    }
  }
}
