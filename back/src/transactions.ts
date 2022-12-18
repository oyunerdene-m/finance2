import fs from 'node:fs/promises';

type NoIdTransaction = {
  userId: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
};

type Transaction = NoIdTransaction & {
  id: number;
};

const transactions: Transaction[] = [];

async function loadTransactions() {
  const fh = await fs.open(__dirname + '/../.db/transactions.json', 'r');
  const data = await fs.readFile(fh);
  await fh.close();
  transactions.push(...JSON.parse(data.toString()));
}

async function saveTransactions() {
  const fh = await fs.open(__dirname + '/../.db/transactions.json', 'w');
  await fs.writeFile(fh, JSON.stringify(transactions, null, 2));
  await fh.close();
}

loadTransactions().catch(console.error);

function getTransactions(userId: number) {
  const userTransactions = transactions.filter((a) => a.userId === userId);
  return new Promise<Transaction[]>((resolve) => setTimeout(() => resolve([...userTransactions]), 100));
}

async function addTransaction(userId: number, transactionData: NoIdTransaction) {
  const newTransaction: Transaction = {
    ...transactionData,
    userId,
    id: 10000 * transactions.length + Math.floor(Math.random() * 10000),
  };

  transactions.push(newTransaction);
  await saveTransactions();

  return newTransaction;
}

async function editTransaction(userId: number, id: number, transactionData: NoIdTransaction) {
  const idx = transactions.findIndex((a) => a.id === id);
  if (idx === -1) {
    throw new Error('Transaction not found');
  }

  if (transactions[idx].userId !== userId) {
    throw new Error('Transaction not found');
  }

  const updatedTransaction: Transaction = {
    ...transactions[idx],
    ...transactionData,
    amount: transactions[idx].amount,
  };

  transactions[idx] = updatedTransaction;
  await saveTransactions();

  return updatedTransaction;
}

async function getTransactionById(userId: number, id: number) {
    const idx = transactions.findIndex((a) => a.id === id);
    if (idx === -1) {
      throw new Error('Transaction not found');
    }
  
    if (transactions[idx].userId !== userId) {
      throw new Error('Transaction not found');
    }
  
    return  transactions[idx];
  }

export { Transaction, getTransactions, addTransaction, editTransaction, getTransactionById };
