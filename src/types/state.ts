export interface OrderState {
  id: number;

  browserLaunched: boolean;
  pageOpened: boolean;
  portalUrl: string;
  loggedIn: boolean;
  loggedInUser: string;

  proceedToPayUrl: string;

  orderSuccess: boolean;

  orderFailed: boolean;
  orderFailedMessage: string;
  orderFailedErrorCode: number | void;
  orderFailedProof: string | void;

  took: number;
}

export interface SequenceState {
  index: number;
  sequenceId: number;

  pageUrl: string;
  pageOpened: boolean;

  stockAmount: number;
  stockSerial: string;
  stockSerialType: string;
  stockUseSuccess: boolean;
  stockAlreadyUsed: boolean;
  stockAlreadyUseProof: string | void;
  stockTyped: boolean;
  stockEntered: boolean;

  applyBackUp: boolean;
  backupStockSerial: string;
  backupStockSerialType: string;
  backupStockUseSuccess: boolean;
  backupStockAlreadyUsed: boolean;
  backupStockAlreadyUseProof: string;
  backupStockTyped: boolean;
  backupStockEntered: boolean;

  paymentSuccess: boolean;
  paymentProof: string;

  retryCount: number;
}

export type OrderEvent = {
  event: string;
  status: "update" | "finish" | "failed" | "placed" | "success" | "error";
  errorCode?: number;
  message: string;
  state: OrderState;
  sequences: Record<number, SequenceState>;
};

export type SequenceEvent = {
  sequence: number;
  order: number;
} & (
  | {
      event: "sequence.redeemed";
      redeemState: "success" | "used" | "unsupported";
      isBackup: boolean;
    }
  | {
      event: "sequence.update";
      state: SequenceState;
    }
);

export type OrderCallbackPayload = {
  type: "placed" | "update" | "finished" | "success" | "error";
  data: {
    status: "update" | "finish" | "failed" | "placed" | "success" | "error";
    orderState: OrderState;
    sequenceStates: Record<number, SequenceState>;
  };
};
