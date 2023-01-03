import { Account } from '@prisma/client';
import { prisma } from '.';

function getAccounts(userId: number, includeClosed: boolean = false) {
    return prisma.account.findMany({
        where: {
            ownerId: userId,
            isClosed: includeClosed ? undefined : false,
        },
    });
}

async function addAccount(userId: number, accountData: Omit<Account, 'id' | 'owner' | 'ownerId'>) {
    const newAccount = await prisma.account.create({
        data: {
            ...accountData,
            owner: { connect: { id: userId } },
        },
    });

    return newAccount;
}

async function editAccount(userId: number, id: number, accountData: Account) {
    const account = await prisma.account.findFirst({ where: { id, ownerId: userId }, select: { ownerId: true } });

    if (!account || account.ownerId !== userId) {
        throw new Error('Account not found');
    }

    const updatedAccount = await prisma.account.update({
        where: { id },
        data: {
            ...account,
            ...accountData,
            ownerId: userId, // This is needed because the user can't change the owner
        },
    });

    return updatedAccount;
}

async function closeAccount(userId: number, id: number) {
    const account = await prisma.account.findFirst({ where: { id, ownerId: userId }, select: { ownerId: true } });

    if (!account || account.ownerId !== userId) {
        throw new Error('Account not found');
    }

    const updatedAccount = await prisma.account.update({
        where: { id },
        data: {
            isClosed: true,
        },
    });

    return updatedAccount;
}

async function getAccountById(ownerId: number, id: number) {
    const account = await prisma.account.findFirst({ where: { id, ownerId } });

    if (!account || account.ownerId !== ownerId) {
        throw new Error('Account not found');
    }

    return account;
}

export { Account, getAccounts, addAccount, editAccount, closeAccount, getAccountById };
