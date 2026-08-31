import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();
    const integrations = await prisma.omnichannelIntegration.findMany({
      where: { organizationId },
      select: { provider: true, isActive: true }
    });
    return NextResponse.json({ integrations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
