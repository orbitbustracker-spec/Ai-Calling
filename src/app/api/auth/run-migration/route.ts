import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get('secret') !== 'execute123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // AIEngineConfig
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
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "AIEngineConfig_pkey" PRIMARY KEY ("id")
      );
    `);

    // OrganizationAiNode
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

    // OrganizationSipTrunk
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

    // Create Indexes
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "OrganizationAiNode_organizationId_idx" ON "OrganizationAiNode"("organizationId");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "OrganizationSipTrunk_organizationId_idx" ON "OrganizationSipTrunk"("organizationId");`);

    // Foreign Keys
    try {
        await prisma.$executeRawUnsafe(`
          ALTER TABLE "OrganizationAiNode" ADD CONSTRAINT "OrganizationAiNode_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    } catch(e) {}
    try {
        await prisma.$executeRawUnsafe(`
          ALTER TABLE "OrganizationSipTrunk" ADD CONSTRAINT "OrganizationSipTrunk_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    } catch(e) {}

    return NextResponse.json({ success: true, message: "Tables created successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
