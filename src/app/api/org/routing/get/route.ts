import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: {
        id: true,
        businessHours: true,
        afterHoursTarget: true
      }
    });

    const agents = await prisma.aIAgent.findMany({
       where: { organizationId },
       select: {
         id: true,
         name: true,
         confidenceThreshold: true,
         fallbackTarget: true
       }
    });

    return NextResponse.json({ org, agents });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
