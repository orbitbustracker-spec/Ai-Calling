import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireUser } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await requireUser();
    const integrations = await prisma.omnichannelIntegration.findMany({
      where: { organizationId: user.organizationId },
      select: { provider: true, isActive: true }
    });
    return NextResponse.json({ integrations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
