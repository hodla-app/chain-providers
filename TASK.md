# Техническое задание по добавлению сетей

В рамках [репозитория](https://github.com/hodla-app/chain-providers) написать написать код провайдера блокчейна+кошелька в файле [/src/provider.ts](https://github.com/hodla-app/chain-providers/blob/main/src/provider.ts).

Код провайдера должен удовлетворять интерфейсу [`WalletProvider`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L20):

Метод `connect` – добавляет текущий сайт в доверенные приложения кошелька и возвращает промис с адресом подключенного кошелька.

```js
connect: () => Promise<{address: string;}>;
```

Метод `stake` – делегирует с кошелька с адрессом `wallet` монеты в количестве `amount` валидатору с адрессом `validator`. Возвращает промис с данными о транзакции и сущность `StakeAccount`. `StakeAccount` – конкретная делегация. В случае, если в ести для делегации нет отдельной сущности, адресс делегации `StakeAccount['address']` совпадает с адрессом валидатора `StakeAccount['validator']`.

```js
connect: (
   wallet: string,
   amount: number,
   validator: string
 ) => Promise<StakeResult>;
```

Метод `unstake` – снимает с делегации c адрессом `stakeAccount` монеты в количестве 'amount'. Возвращает промис с данными о транзакции. В параметре `wallet` передается адрес кошелька, которому пренадлижит делегация

```js
unstake: (
    wallet: string,
    amount: number,
    stakeAccount: string
  ) => Promise<TransactionResult>;
```

Метод `withdraw` – Возвращает монеты со снятой делегации обратно на кошелек. Возвращает промис с данными о транзакции. В параметре `wallet` передается адрес кошелька, которому пренадлижит делегация

```js
withdraw: (
    wallet: string,
    stakeAccount: string
  ) => Promise<TransactionResult>;
```

Метод `claim` – Начисляет награду по делегации. В параметре `wallet` передается адрес кошелька, которому пренадлижит делегация. Если награды не реализованы в сети, этот метод реализовывать не нужно.

```js
claim: (wallet: string, validator: string) => Promise<TransactionResult>;
```

Метод `history` – Возвращает промис с массивом [`HistoryItem`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L66), в нем должны быть описаны все транзакции стейка, анстейка, вывода, клейма и ределегаций. `HistoryItem` содержит: тип транзацкии; хэш транзакции; дату; валидатора, к которому относится эта транзакция; количество монет в транзакции.

```js
history: (wallet: string) => Promise<HistoryItem[]>;
```

Метод `getStakeAccounts` – Возвращает промис с массивом [`StakeAccount`](https://github.com/hodla-app/chain-providers/blob/main/src/types.ts#L46). В этом массиве перечислены все делегации, которые в процессе стейкинга, активны или в процессе анстейкинга.

```js
getStakeAccounts: (wallet: string) => Promise<StakeAccount[]>;
```

Метод `getBalance` – Возвращает промис с массивом балансов токенов на данном кошельке. Должны быть включены ibc токены с их деномами в данной сети.

```js
getBalance: (
    wallet: string
  ) => Promise<{ denom: string; amount: string }[]>;
```

## Проверка задания

Для сдачи задания отправьте PR в [репозиторий](https://github.com/hodla-app/chain-providers/) с измененным файлом provider.ts. Укажите какой кошелек и сеть использовали.
Проверяться задание будет локально: по команде npm start поднимается минимальный фронтенд, где можно подключить кошелек, сделать стейк в выбранный валидатор, сделать анстейк, посмотреть историю транзакций. На всех этапах не должно быть ошибок, приложение должно штатно отрабатывать, выполнять транзакции. Транзакции будут так же проверяться в эксплорерах.
