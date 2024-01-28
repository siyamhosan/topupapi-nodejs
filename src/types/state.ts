export interface OrderState {
  id: number

  browserLaunched: boolean
  pageOpened: boolean
  portalUrl: string
  loggedIn: boolean
  loggedInUser: string

  proceedToPayUrl: string

  orderSuccess: boolean

  orderFailed: boolean
  orderFailedMessage: string
  orderFailedErrorCode: number | void
  orderFailedProof: string | void
}

export interface SequenceState {
  index: number
  sequenceId: number

  pageUrl: string
  pageOpened: boolean

  stockAmount: number
  stockSerial: string
  stockUseSuccess: boolean
  stockAlreadyUsed: boolean
  stockAlreadyUseProof: string

  applyBackUp: boolean
  backupStockSerial: string
  backupStockUseSuccess: boolean
  backupStockAlreadyUsed: boolean
  backupStockAlreadyUseProof: string

  paymentSuccess: boolean
  paymentProof: string
}

export type OrderEvent = {
  event: string
  status: 'update' | 'finish' | 'failed' | 'placed'
  errorCode?: number
  message: string
  state: OrderState
  sequences: Record<number, SequenceState>
}

export type SequenceEvent = {
  sequence: number
  order: number
} & (
  | {
      event: 'sequence.redeemed'
      redeemState: 'success' | 'used' | 'unsupported'
      isBackup: boolean
    }
  | {
      event: 'sequence.update'
      state: SequenceState
    }
)

export type OrderCallbackPayload = {
  type: 'placed' | 'update' | 'finished'
  data: {
    status: 'update' | 'finish' | 'failed' | 'placed'
    orderState: OrderState
    sequenceStates: Record<number, SequenceState>
  }
}
