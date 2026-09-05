import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();

    let ivr = await prisma.iVRMenu.findFirst({
      where: { organizationId }
    });

    if (!ivr) {
       ivr = await prisma.iVRMenu.create({
          data: {
             organizationId,
             name: 'Main Menu',
             timeoutSeconds: 10,
             keypressRoutes: {}
          }
       });
    }

    return NextResponse.json({ ivr });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
