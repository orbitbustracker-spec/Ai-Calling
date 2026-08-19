import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listProviders(req: Request) {
  await requireSuperAdmin();
  const providers = await prisma.telephonyProvider.findMany({
    select: {
      id: true,
      name: true,
      providerType: true,
      enabled: true,
      capabilities: true,
      createdAt: true,
      updatedAt: true
      // configuration intentionally omitted to prevent secret leakage
    }
  });
  return NextResponse.json(providers);
}

export const GET = withAuth(listProviders);
