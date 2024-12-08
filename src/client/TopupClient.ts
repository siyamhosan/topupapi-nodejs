import { API_URL } from "@/config";
import { NodeManager } from "@/managers/NodeManager";
import { OrderManager } from "@/managers/OrderManager";
import { ShardManager } from "@/managers/ShardManager";
import { StockAccountManager } from "@/managers/StockAccountManager";
import { StockManager } from "@/managers/StockManager";
import { StockPriceManager } from "@/managers/StockPriceManager";
import { UserManager } from "@/managers/UserManager";

export type TopUpClientConfig =
  | {
      token: string;
      baseUrl?: string;
    }
  | string;

export class TopUpClient {
  private _token: string;
  private _baseUrl: string;

  public stocks;
  public stockAccounts;
  public stockPrices;
  public users;
  public orders;
  public nodes;
  public shards;

  constructor(conf: TopUpClientConfig) {
    if (typeof conf === "string") {
      this._token = conf;
      this._baseUrl = API_URL;
    } else {
      this._token = conf.token;
      this._baseUrl = conf.baseUrl || API_URL;
    }

    this.stocks = new StockManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.stockPrices = new StockPriceManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.users = new UserManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.orders = new OrderManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.nodes = new NodeManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.shards = new ShardManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
    this.stockAccounts = new StockAccountManager({
      baseUrl: this._baseUrl,
      token: this._token,
    });
  }
}
