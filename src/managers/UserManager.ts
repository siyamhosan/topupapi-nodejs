import { BaseHeaders, UserContract } from "@/api/contract";
import { initClient } from "@ts-rest/core";
import {
  MerchantRegisterDto,
  MerchantRemoveDto,
  MerchantUpdateDto,
  UserRegisterDto,
} from "@/types/user";

export class UserManager {
  private _api;

  constructor({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(UserContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl,
    });
  }

  /**
   * @description Fetches the user's profile
   */
  async fetch() {
    const res = await this._api.fetch();

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Registers a new user
   * @param data
   */
  async register({ name }: typeof UserRegisterDto._type) {
    const res = await this._api.register({
      body: {
        name,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Get All The Merchants
   */
  async getMerchants() {
    const res = await this._api.fetchMerchants();

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Add a new merchant
   */
  async addMerchant({ userId, profitRate }: typeof MerchantRegisterDto._type) {
    const res = await this._api.addMerchant({
      body: {
        userId,
        profitRate,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Update a merchant
   */
  async updateMerchant({ userId, profitRate }: typeof MerchantUpdateDto._type) {
    const res = await this._api.updateMerchant({
      body: {
        userId,
        profitRate,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Remove a merchant
   */
  async removeMerchant({ userId }: typeof MerchantRemoveDto._type) {
    const res = await this._api.removeMerchant({
      body: {
        userId,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }
}
