const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AIEngineConfig" (
      "id" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "providerType" TEXT NOT NULL,
      "providerName" TEXT NOT NULL,
      "baseUrl" TEXT NOT NULL,
      "authType" TEXT NOT NULL,
      "authHeaderName" TEXT,
      "apiKey" TEXT NOT NULL,
      "modelId" TEXT NOT NULL,
      "voiceId" TEXT,
      "sampleRate" INTEGER NOT NULL DEFAULT 16000,
      "supportsStreaming" BOOLEAN NOT NULL DEFAULT true,
      "customHeadersJson" TEXT,
      "isDefault" BOOLEAN NOT NULL DEFAULT false,
      "status" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AIEngineConfig_pkey" PRIMARY KEY ("id")
    );
  `);
  console.log('Table created!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
