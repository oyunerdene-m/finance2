import bcrypt from 'bcrypt';
import lodash from 'lodash';

import { prisma } from '.';

const saltRounds = 10;

function hashPassword(plaintextPassword: string) {
    return bcrypt.hash(plaintextPassword, saltRounds);
}

function comparePassword(plaintextPassword: string, hash: string) {
    return bcrypt.compare(plaintextPassword, hash);
}

async function register(name: string, email: string, password: string) {
    email = email.trim().toLowerCase();

    if (!email.match(/.+@.+\..+/)) {
        throw new Error('Invalid email');
    }

    const count = await prisma.user.count({ where: { email } });
    if (count > 0) {
        throw new Error('Email is already in use');
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword: await hashPassword(password),
        },
    });

    return lodash.pick(user, 'id', 'name', 'email');
}

async function login(email: string, password: string) {
    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!user.hashedPassword) {
        throw new Error('User has no password');
    }

    const passwordMatches = await comparePassword(password, user.hashedPassword);
    if (!passwordMatches) {
        throw new Error('Invalid email or password');
    }

    return lodash.pick(user, 'id', 'name', 'email');
}

export { register, login };
