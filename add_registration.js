const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "PendingRegistration" (
      "id" TEXT NOT NULL,
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "companyName" TEXT NOT NULL,
      "website" TEXT NOT NULL,
      "jobTitle" TEXT NOT NULL,
      "country" TEXT NOT NULL,
      "pbxProfile" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PendingRegistration_pkey" PRIMARY KEY ("id")
    );
  `);
  
  try {
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX "PendingRegistration_email_key" ON "PendingRegistration"("email");
    `);
  } catch (e) {
    console.log("Index might exist", e.message);
  }

  console.log("PendingRegistration table created.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
