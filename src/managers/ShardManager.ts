import { BaseHeaders, NodeContract, ShardContract } from "@/api/contract";
import { NodeAddDto, PartialShardConfigDto } from "@/types/node";
import { initClient } from "@ts-rest/core";

export class ShardManager {
  private _api;

  constructor({ baseUrl, token }: { baseUrl: string; token: string }) {
    this._api = initClient(ShardContract, {
      baseHeaders: BaseHeaders({ token }),
      baseUrl,
    });
  }

  /**
   * @description Fetches the available shards status
   * @access private Admin Only
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
   * @description Node Status
   * @param name
   * @returns
   */
  async status(name: string) {
    const res = await this._api.status({
      params: { name },
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Block a node
   * @param name
   * @returns
   */
  async block(name: string) {
    const res = await this._api.block({
      params: { name },
      body: {},
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Unblock a node
   * @param name
   * @returns
   */
  async unblock(name: string) {
    const res = await this._api.unblock({
      params: { name },
      body: {},
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Strikes
   * @returns
   */
  async strikes() {
    const res = await this._api.strikes();

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Strike a node
   * @param name
   * @returns
   */
  async strike(name: string) {
    const res = await this._api.strike({
      params: { name },
      body: {},
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description UnStrike a node
   * @param name
   * @returns
   */
  async unStrike(name: string) {
    const res = await this._api.unStrike({
      params: { name },
      body: {},
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }

  /**
   * @description Reboot a node
   * @param name
   * @returns
   */
  async reboot(name: string) {
    const res = await this._api.reboot({
      params: { name },
      body: {},
    });

    if (res.status === 200 || res.status === 201) {
      return res.body.data;
    } else {
      throw res.body;
      return null;
    }
  }
}
