const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SocialIntegration" (
      "id" TEXT NOT NULL,
      "organizationId" TEXT NOT NULL,
      "platform" TEXT NOT NULL,
      "appId" TEXT,
      "appSecret" TEXT,
      "accessToken" TEXT,
      "phoneNumberId" TEXT,
      "businessAccountId" TEXT,
      "monthlyFee" DOUBLE PRECISION DEFAULT 0.0,
      "status" TEXT DEFAULT 'PENDING_APPROVAL',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SocialIntegration_pkey" PRIMARY KEY ("id")
    );
  `);

  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SocialIntegration" ADD CONSTRAINT "SocialIntegration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
  } catch (e) {
    console.log("Foreign key probably exists:", e.message);
  }

  console.log("SocialIntegration table created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
