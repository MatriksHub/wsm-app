import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // Logs SQL queries in the terminal for debugging
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
