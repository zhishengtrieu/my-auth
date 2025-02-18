import { PrismaClient } from '@prisma/client';
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

export async function createUser(name: string, email: string, password: string) {
  await ensureTableExists();
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hash,
      },
    });
  console.log(newUser);

  await prisma.$disconnect();
}

async function ensureTableExists() {
  const result: [{ exists: boolean }] = await prisma.$queryRaw`SELECT to_regclass('public."User"') IS NOT NULL AS exists;`;
  
  if (!result[0].exists) {
    await prisma.$queryRaw`CREATE TABLE "User" (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    );`;
  }
}


