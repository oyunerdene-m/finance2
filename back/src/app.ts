import express from 'express';
import session from 'express-session';
import { User } from '@prisma/client';

import apiRouter from './api';
import { login, register } from './db/users';

declare module 'express-session' {
    export interface SessionData {
        user: Pick<User, 'id' | 'name' | 'email'>;
    }
}

const port = 4000;
const app = express();

app.set('trust proxy', 1);
app.use(
    session({
        name: 'finance-app.sid',
        secret: process.env.SESSION_SECRET || 'finance-app.secret',
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true },
    }),
);

app.use(express.json());

app.post('/api/v1/users/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await register(name, email, password);
        res.json({ data: { user } });
    } catch (error) {
        next(error);
    }
});

app.get('/api/v1/users/current-user', async (req, res, next) => {
    try {
        res.json({ data: { user: req.session.user || null } });
    } catch (error) {
        next(error);
    }
});

app.get('/api/v1/users/logout', async (req, res, next) => {
    try {
        if (req.session.user) {
            req.session.user = undefined;

            req.session.save(function (err) {
                if (err) return next(err);
                res.json({ data: { done: true } });
            });
            return;
        }

        res.json({ data: { done: true } });
    } catch (error) {
        next(error);
    }
});

app.post('/api/v1/users/login', async (req, res, next) => {
    try {
        if (req.session.user) {
            res.status(403).json({ error: 'Already logged in.' });
            return;
        }

        const { email, password } = req.body;
        const user = await login(email, password);

        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }

            req.session.user = user;

            req.session.save(function (err) {
                if (err) return next(err);
                res.json({ data: { user } });
            });
        });
    } catch (error) {
        next(error);
    }
});

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

const handleError: express.ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.json({ error: err.message || err.toString() });
};

app.use(handleError);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
