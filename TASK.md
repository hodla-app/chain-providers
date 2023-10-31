# Scaling Hodla on New Chains

### Overview

In order to scale [Hodla](https://app.hodla.org) on new blockchains, we have initiated an open-bounty program inviting third-party developers to contribute by creating a sample application. The objective is to unify the staking experience across all PoS chains. This application will be hosted on a new open-source repository, and developers are encouraged to compete for a bounty by showcasing their expertise in integrating new blockchain networks. The following task breakdown provides a detailed explanation of what's required.

To claim a bounty, one needs to integrate a new chain into Hodla. This includes supporting staking, unstaking, claiming (where applicable), and providing transaction history from one of the most popular wallets in that blockchain.

### Task Breakdown:
1. **Blockchain + Wallet Provider Code:**
   - Write code for a blockchain and wallet provider in the specified file (`/src/provider.ts`). The code should satisfy the [`WalletProvider`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L20) interface.

2. **Methods to Implement:**
   - `connect`: This method is expected to add the current site to the trusted applications of the wallet and should return a promise with the connected wallet’s address.

     ```js
     connect: () => Promise<{address: string;}>;
     ```
   - `stake`: This method is designed to delegate a specified amount of coins from a wallet to a validator. The `wallet` parameter is the address of the wallet, `amount` is the number of coins to delegate, and `validator` is the address of the validator. It should return a promise with transaction details and a `StakeAccount` entity. The `StakeAccount` is a particular delegation, and if there isn't a separate entity for delegation, the delegation address `StakeAccount['address']` will match the validator address `StakeAccount['validator']`.

     ```js
     stake: (
       wallet: string,
       amount: number,
       validator: string
     ) => Promise<StakeResult>;
     ```
   - `unstake`: This method should remove a specified amount of coins from a delegation and return a promise with the transaction details.

     ```js
     unstake: (
       wallet: string,
       amount: number,
       stakeAccount: string
     ) => Promise<TransactionResult>;
     ```
   - `withdraw`: Designed to return coins from a withdrawn delegation back to the wallet, this method should return a promise with the transaction details.

     ```js
     withdraw: (
       wallet: string,
       stakeAccount: string
     ) => Promise<TransactionResult>;
     ```
   - `claim`: This method is for crediting rewards for the delegation. If rewards are not implemented in the network, this method is not required.

     ```js
     claim: (
       wallet: string, 
       validator: string
     ) => Promise<TransactionResult>;
     ```
   - `history`: Returns a promise with an array of [`HistoryItem`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L66), detailing all stake, unstake, withdrawal, claim, and redelegation transactions.

     ```js
     history: (
       wallet: string
     ) => Promise<HistoryItem[]>;
     ```
   - `getStakeAccounts`: Returns a promise with an array of [`StakeAccount`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L46), listing all delegations in staking, active or unstaking process.

     ```js
     getStakeAccounts: (
       wallet: string
     ) => Promise<StakeAccount[]>;
     ```
   - `getBalance`: Returns a promise with an array of token balances on the wallet, including ibc tokens with their denoms in the network.

     ```js
     getBalance: (
       wallet: string
     ) => Promise<{ denom: string; amount: string }[]>;
     ```

### Task Submission and Verification:
- Submit a Pull Request to the repository with the modified provider.ts file.
Mention the wallet and network utilized.

### Task Verification:
- The task will be verified locally. By executing the command npm start, a minimal frontend will be launched where one can connect the wallet, stake to a selected validator, unstake, and view transaction history.
- There should be no errors at any stage, the application should operate smoothly, execute transactions, which will also be verified in explorers.
