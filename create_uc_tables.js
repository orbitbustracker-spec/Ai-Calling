const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "OmnichannelMessage" (
      "id" TEXT NOT NULL,
      "orgId" TEXT NOT NULL,
      "platform" TEXT NOT NULL,
      "sender" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "status" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "OmnichannelMessage_pkey" PRIMARY KEY ("id")
    );
  `);
  
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SoftphoneSession" (
      "id" TEXT NOT NULL,
      "orgId" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "extensionNumber" TEXT NOT NULL,
      "registerStatus" TEXT NOT NULL,
      "sipServer" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SoftphoneSession_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "OmnichannelMessage_orgId_idx" ON "OmnichannelMessage"("orgId");
  `);
  
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "SoftphoneSession_orgId_idx" ON "SoftphoneSession"("orgId");
  `);
  
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "SoftphoneSession_userId_idx" ON "SoftphoneSession"("userId");
  `);

  console.log('Tables created!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
