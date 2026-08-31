import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { commerceMinutes: true }
    });

    const integrations = await prisma.omnichannelIntegration.findMany({
      where: { organizationId },
      select: { provider: true, isActive: true, status: true }
    });

    return NextResponse.json({ integrations, commerceMinutes: org?.commerceMinutes || 0 });
  } catch (error) {
    console.error('Fetch Integrations Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
