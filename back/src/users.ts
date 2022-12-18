import bcrypt from 'bcrypt';
import fs from 'node:fs/promises';

type User = {
  id: number;
  name: string;
  email: string;
  hashedPassword?: string;
};

const users: User[] = [];

async function loadUsers() {
  const fh = await fs.open(__dirname + '/../.db/users.json', 'r');
  const data = await fs.readFile(fh);
  await fh.close();
  users.push(...JSON.parse(data.toString()));
}

async function saveUsers() {
  const fh = await fs.open(__dirname + '/../.db/users.json', 'w');
  await fs.writeFile(fh, JSON.stringify(users, null, 2));
  await fh.close();
}

loadUsers().catch(console.error);

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

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  const user = {
    id: 10000 * users.length + Math.floor(Math.random() * 10000),
    name,
    email,
  };

  users.push({ ...user, hashedPassword: await hashPassword(password) });
  await saveUsers();

  return user;
}

async function login(email: string, password: string) {
  email = email.trim().toLowerCase();

  const user = users.find((u) => u.email === email);

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

  return { ...user, hashedPassword: undefined };
}

export { User, register, login };
