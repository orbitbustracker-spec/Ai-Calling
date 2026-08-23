require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
    }
  }
});

async function main() {
  console.log("Running manual schema migrations for CRM...");

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CrmContact" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "email" TEXT,
          "phone" TEXT,
          "jobTitle" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "CrmContact_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "CrmContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmContact_organizationId_idx" ON "CrmContact"("organizationId");`);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CrmNote" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "contactId" TEXT,
          "content" TEXT NOT NULL,
          "authorId" UUID NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "CrmNote_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "CrmNote_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "CrmNote_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "CrmContact"("id") ON DELETE SET NULL ON UPDATE CASCADE,
          CONSTRAINT "CrmNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmNote_organizationId_idx" ON "CrmNote"("organizationId");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmNote_contactId_idx" ON "CrmNote"("contactId");`);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CrmTicket" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "contactId" TEXT,
          "title" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'OPEN',
          "description" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "CrmTicket_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "CrmTicket_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "CrmTicket_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "CrmContact"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmTicket_organizationId_idx" ON "CrmTicket"("organizationId");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmTicket_contactId_idx" ON "CrmTicket"("contactId");`);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CrmTransaction" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "amount" DOUBLE PRECISION NOT NULL,
          "currency" TEXT NOT NULL DEFAULT 'USD',
          "status" TEXT NOT NULL DEFAULT 'COMPLETED',
          "description" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "CrmTransaction_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "CrmTransaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CrmTransaction_organizationId_idx" ON "CrmTransaction"("organizationId");`);

    console.log("Migration successful!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
