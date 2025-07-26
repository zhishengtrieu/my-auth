import { PrismaClient, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

const prisma = new PrismaClient();
export async function getUser(email: string) {
  await ensureTableExists();
  return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
}
export async function createUser(data: {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: string;
  providerId?: string;
}): Promise<User> {
  await ensureTableExists();
  let newUser: User;
  // si c'est par oauth, le mot de passe n'est pas nécessaire
  if (!data.password && data.provider && data.providerId) {
    newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        image: data.image || '',
        provider: data.provider || '',
        providerId: data.providerId || '',
      },
    });
  } else if (data.password) {
    const salt = genSaltSync(10);
    const hash = hashSync(data.password, salt);

    newUser = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hash,
        },
      });
    console.log(newUser);

    await prisma.$disconnect();
  } else {
    throw new Error("Password is required for non-OAuth users");
  }
  return newUser;
}

async function ensureTableExists() {
  const result: [{ exists: boolean }] = await prisma.$queryRaw`SELECT to_regclass('public."User"') IS NOT NULL AS exists;`;
  
  if (!result[0].exists) {
    await prisma.$queryRaw`CREATE TABLE "User" (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      password TEXT,
      image TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      provider TEXT,
      providerId TEXT,
      "createdAt" TIMESTAMP DEFAULT now()
    );`;
  }
}

export async function createOrGetOAuthUser(data: {
  email: string;
  name: string;
  image?: string;
  provider: string;
  providerAccountId: string;
}): Promise<User> {
  let user = await getUserByEmail(data.email);

  if (!user) {
    user = await createUser({
      name: data.name,
      email: data.email,
      image: data.image || '',
      provider: data.provider || '',
      providerId: data.providerAccountId || ''
    });
  }

  return user;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}