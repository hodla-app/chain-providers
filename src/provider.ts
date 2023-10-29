import { WalletProvider } from "./types";

export const provider: WalletProvider = {
  connect: () => Promise.resolve({ address: "a" }),
  stake: () =>
    Promise.resolve({
      transaction: {
        hash: "",
      },
      stakeAccount: {
        address: "",
        validator: "",
        balance: 0,
        state: "active",
        transactionHash: "",
        progress: { progress: 0, timeRemaining: 0, dateToReturn: "" },
      },
    } as const),
  unstake: () => Promise.resolve({ transaction: { hash: "" } }),

  withdraw: () => Promise.resolve({ transaction: { hash: "" } }),
  claim: () => Promise.resolve({ transaction: { hash: "" } }),
  history: () => Promise.resolve([]),
  getStakeAccounts: () => Promise.resolve([]),
  getBalance: () => Promise.resolve([{ denom: "ETH", amount: "10000" }]),
};
