import fs from 'node:fs/promises';

type NoIdAccount = {
  userId: number;
  amount: number;
  type: 'savings' | 'cash' | 'loan' | 'credit' | 'daily';
  currency: '€' | '$' | '₮';
  name: string;
  description: string;
};

type Account = NoIdAccount & {
  id: number;
};

const accounts: Account[] = [];

async function loadAccounts() {
  const fh = await fs.open(__dirname + '/../.db/accounts.json', 'r');
  const data = await fs.readFile(fh);
  await fh.close();
  accounts.push(...JSON.parse(data.toString()));
}

async function saveAccounts() {
  const fh = await fs.open(__dirname + '/../.db/accounts.json', 'w');
  await fs.writeFile(fh, JSON.stringify(accounts, null, 2));
  await fh.close();
}

loadAccounts().catch(console.error);

function getAccounts(userId: number) {
  const userAccounts = accounts.filter((a) => a.userId === userId);
  return new Promise<Account[]>((resolve) => setTimeout(() => resolve([...userAccounts]), 100));
}

async function addAccount(userId: number, accountData: NoIdAccount) {
  const newAccount: Account = {
    ...accountData,
    userId,
    id: 10000 * accounts.length + Math.floor(Math.random() * 10000),
  };

  accounts.push(newAccount);
  await saveAccounts();

  return newAccount;
}

async function editAccount(userId: number, id: number, accountData: NoIdAccount) {
  const accountIndex = accounts.findIndex((a) => a.id === id);
  if (accountIndex === -1) {
    throw new Error('Account not found');
  }

  if (accounts[accountIndex].userId !== userId) {
    throw new Error('Account not found');
  }

  const updatedAccount: Account = {
    ...accounts[accountIndex],
    ...accountData,
  };

  accounts[accountIndex] = updatedAccount;
  await saveAccounts();

  return updatedAccount;
}

async function deleteAccount(userId: number, id: number) {
  const accountIndex = accounts.findIndex((a) => a.id === id);
  if (accountIndex === -1) {
    throw new Error('Account not found');
  }

  if (accounts[accountIndex].userId !== userId) {
    throw new Error('Account not found');
  }

  accounts.splice(accountIndex, 1);
  await saveAccounts();
}

export { Account, getAccounts, addAccount, editAccount, deleteAccount };
