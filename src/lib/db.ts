import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In development, always create a new client to ensure latest schema is loaded
const prismaClient = process.env.NODE_ENV !== 'production'
  ? new PrismaClient({ log: ['query'] })
  : (globalForPrisma.prisma ?? new PrismaClient())

export const db = prismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient
// Force reload for DokumenKegiatan model
