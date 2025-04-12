import { BaseHeaders, StockContract } from "@/api/contract";
import {
  StockAddOptions,
  StockBuyDto,
  StockCheckDto,
  StockRefundDto,
  StockUndoDto,
} from "@/types/stock";
import { initClient } from "@ts-rest/core";
import { StockPriceManager, SupportedGame } from "..";
import { StockAccountManager } from "./StockAccountManager";

export interface StockFetchOptions {
  game?: typeof SupportedGame._type;
}

export class StockManager {
  private _api;

  public accounts: StockAccountManager;
  public price: StockPriceManager;

  constructor({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(StockContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl,
    });
    this.accounts = new StockAccountManager({ baseUrl, token });
    this.price = new StockPriceManager({ baseUrl, token });
  }

  /**
   * Fetches all current stocks
   * @returns Object containing stocks by game and amount, with counts instead of individual stock IDs
   */
  async fetch(opt?: StockFetchOptions) {
    const res = await this._api.fetch({
      query: opt,
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw new Error(`Failed to fetch stocks: ${JSON.stringify(res.body)}`);
    }
  }

  /**
   * Adds a new stock
   */
  async add({ price, amount, codeTxt, game }: StockAddOptions) {
    if (typeof price === "number") price = price.toString();

    const res = await this._api.add({
      body: {
        price,
        amount,
        codeTxt,
        game,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw new Error(`Failed to add stock: ${JSON.stringify(res.body)}`);
    }
  }

  /**
   * Checks if the stock is available
   * @returns Object containing availability status and missing stock counts if any
   */
  async check({ combination, game, quantity = 1 }: typeof StockCheckDto._type) {
    const res = await this._api.check({
      body: {
        combination,
        game,
        quantity,
      },
    });

    if (res.status === 200 || res.status === 201 || res.status === 404) {
      return res.body.data;
    } else {
      throw new Error(
        `Failed to check stock availability: ${JSON.stringify(res.body)}`
      );
    }
  }

  /**
   * Buys a stock using atomic Redis operations
   * @returns Object containing purchased stock details or error with missing stock information
   */
  async buy({ combination, game, quantity = 1 }: typeof StockBuyDto._type) {
    const res = await this._api.buy({
      body: {
        combination,
        game,
        quantity,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else if (res.status === 404) {
      // Handle case where stock is not available
      const error = res.body.data;
      throw new Error(`Stock not available: ${JSON.stringify(error.missing)}`);
    } else {
      throw new Error(`Failed to buy stock: ${JSON.stringify(res.body)}`);
    }
  }

  /**
   * Refunds a stock after buying
   */
  async refund({ checkCode, game }: typeof StockRefundDto._type) {
    const res = await this._api.refund({
      body: {
        checkCode,
        game,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw new Error(`Failed to refund stock: ${JSON.stringify(res.body)}`);
    }
  }

  /**
   * Undo a task
   */
  async undo({ type }: typeof StockUndoDto._type) {
    const res = await this._api.undo({
      body: {
        type,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw new Error(`Failed to undo task: ${JSON.stringify(res.body)}`);
    }
  }
}
