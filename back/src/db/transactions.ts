import { Transaction } from '@prisma/client';
import { prisma } from '.';

function getTransactions(userId: number, skip: number = 0, limit: number = 100) {
    return prisma.transaction.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip,
        take: limit,
    });
}

async function addTransaction(userId: number, transactionData: Transaction) {
    const newTransaction = await prisma.transaction.create({
        data: {
            ...transactionData,
            userId,
        },
    });

    return newTransaction;
}

async function editTransaction(userId: number, id: number, transactionData: Transaction) {
    const transaction = await prisma.transaction.findFirst({ where: { id, userId } });

    if (!transaction || transaction.userId !== userId) {
        throw new Error('Transaction not found');
    }

    return prisma.transaction.update({
        where: { id },
        data: {
            ...transaction,
            ...transactionData,
            amount: transaction.amount,
        },
    });
}

async function getTransactionById(userId: number, id: number) {
    const transaction = await prisma.transaction.findFirst({ where: { id, userId } });

    if (!transaction || transaction.userId !== userId) {
        throw new Error('Transaction not found');
    }

    return transaction;
}

export { Transaction, getTransactions, addTransaction, editTransaction, getTransactionById };
