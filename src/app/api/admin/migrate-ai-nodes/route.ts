import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "OrganizationAiNode" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "nodeType" TEXT NOT NULL,
          "nodeName" TEXT NOT NULL,
          "baseUrl" TEXT NOT NULL,
          "encryptedAuthToken" TEXT,
          "headersJson" JSONB,
          "modelId" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "OrganizationAiNode_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "OrganizationSipTrunk" (
          "id" TEXT NOT NULL,
          "organizationId" TEXT NOT NULL,
          "providerLabel" TEXT NOT NULL,
          "host" TEXT NOT NULL,
          "port" INTEGER NOT NULL DEFAULT 5060,
          "username" TEXT NOT NULL,
          "encryptedPassword" TEXT,
          "didsJson" JSONB,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "OrganizationSipTrunk_pkey" PRIMARY KEY ("id")
      );
    `);

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "OrganizationAiNode" ADD CONSTRAINT "OrganizationAiNode_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch(e) {}
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "OrganizationSipTrunk" ADD CONSTRAINT "OrganizationSipTrunk_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch(e) {}
    
    try {
      await prisma.$executeRawUnsafe(`CREATE INDEX "OrganizationAiNode_organizationId_idx" ON "OrganizationAiNode"("organizationId");`);
    } catch(e) {}
    try {
      await prisma.$executeRawUnsafe(`CREATE INDEX "OrganizationSipTrunk_organizationId_idx" ON "OrganizationSipTrunk"("organizationId");`);
    } catch(e) {}

    return NextResponse.json({ success: true, message: 'Migration applied via HTTP.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
