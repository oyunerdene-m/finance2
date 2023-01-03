import express from 'express';

import { addAccount, closeAccount, editAccount, getAccounts, getAccountById } from './db/accounts';
import { addTransaction, editTransaction, getTransactions, getTransactionById } from './db/transactions';

const router = express.Router();

router.use((req, res, next) => {
    if (!req.session.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    next();
});

router.get('/accounts', async (req, res, next) => {
    try {
        const accounts = await getAccounts(req.session.user!.id);
        res.json({ data: { accounts } });
    } catch (error) {
        next(error);
    }
});

router.post('/accounts/add', async (req, res, next) => {
    try {
        const newAccount = await addAccount(req.session.user!.id, req.body);
        res.json({ data: { account: newAccount } });
    } catch (error) {
        next(error);
    }
});

router.post('/accounts/edit/:id', async (req, res, next) => {
    try {
        const updatedAccount = await editAccount(req.session.user!.id, parseInt(req.params.id), req.body);
        res.json({ data: { account: updatedAccount } });
    } catch (error) {
        next(error);
    }
});

router.post('/accounts/close/:id', async (req, res, next) => {
    try {
        await closeAccount(req.session.user!.id, parseInt(req.params.id));
        res.json({ data: { done: true } });
    } catch (error) {
        next(error);
    }
});

router.get('/accounts/detail/:id', async (req, res, next) => {
    try {
        const account = await getAccountById(req.session.user!.id, parseInt(req.params.id));
        res.json({ data: { account } });
    } catch (error) {
        next(error);
    }
});

router.get('/transactions', async (req, res, next) => {
    try {
        const transactions = await getTransactions(req.session.user!.id);
        res.json({ data: { transactions } });
    } catch (error) {
        next(error);
    }
});

router.post('/transactions/add', async (req, res, next) => {
    try {
        const newTransaction = await addTransaction(req.session.user!.id, req.body);
        res.json({ data: { transaction: newTransaction } });
    } catch (error) {
        next(error);
    }
});

router.post('/transactions/edit/:id', async (req, res, next) => {
    try {
        const updatedTransaction = await editTransaction(req.session.user!.id, parseInt(req.params.id), req.body);
        res.json({ data: { transaction: updatedTransaction } });
    } catch (error) {
        next(error);
    }
});

router.get('/transactions/detail/:id', async (req, res, next) => {
    try {
        const transaction = await getTransactionById(req.session.user!.id, parseInt(req.params.id));
        res.json({ data: { transaction } });
    } catch (error) {
        next(error);
    }
});

export default router;
