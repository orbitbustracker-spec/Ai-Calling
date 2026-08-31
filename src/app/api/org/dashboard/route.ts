import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();

    const [trunks, recentCalls, org] = await Promise.all([
      prisma.organizationSipTrunk.findMany({
        where: { organizationId },
        select: { id: true, providerLabel: true, host: true }
      }),
      prisma.call.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, direction: true, durationSeconds: true, status: true, fromNumber: true, toNumber: true, createdAt: true }
      }),
      prisma.organization.findUnique({
        where: { id: organizationId },
        select: { name: true, createdAt: true }
      })
    ]);

    return NextResponse.json({ trunks, recentCalls, org });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
