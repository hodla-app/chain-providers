export interface CoinInfo {
  reward: number;
  capitalization: {
    tokens: number;
    usd: number;
    price: number;
  };
}

export interface TransactionResult {
  transaction: {
    hash: string;
  };
}

export interface StakeResult extends TransactionResult {
  stakeAccount: StakeAccount;
}

export interface WalletProvider {
  connect: () => Promise<{
    address: string;
  }>;
  stake?: (
    wallet: string,
    amount: number,
    validator: string
  ) => Promise<StakeResult>;
  unstake?: (
    wallet: string,
    amount: number,
    stakeAccount: string
  ) => Promise<TransactionResult>;
  withdraw?: (
    wallet: string,
    stakeAccount: string
  ) => Promise<TransactionResult>;
  claim?: (wallet: string, validator: string) => Promise<TransactionResult>;
  history: (wallet: string) => Promise<HistoryItem[]>;
  getStakeAccounts: (wallet: string) => Promise<StakeAccount[]>;
  getBalance: (
    wallet: string
  ) => Promise<Array<{ denom: string; amount: string }>>;
}

export interface StakeAccount {
  address: string;
  validator: string;
  balance: number;
  state: "active" | "inactive" | "activating" | "deactivating";
  transactionHash?: string;
  progress?: StakingProgress;
}

export interface Reward {
  validator: string;
  balance: number;
}

export type HistoryItemType =
  | "stake"
  | "unstake"
  | "withdraw"
  | "claim"
  | "redelegate";
export interface HistoryItem {
  type: HistoryItemType;
  balance: number;
  validator: string;
  date: string;
  heigth?: number;
  txHash: string;
}

export interface StakingProgress {
  progress: number;
  timeRemaining: number;
  dateToReturn: string;
}
