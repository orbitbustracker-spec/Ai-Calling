import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { businessHours, afterHoursTarget, fallbackTarget, organizationId } = data;

    if (!organizationId) {
      return NextResponse.json({ error: 'Missing organizationId' }, { status: 400 });
    }

    // Update Organization Routing rules
    const org = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        businessHours: businessHours ? businessHours : undefined,
        afterHoursTarget: afterHoursTarget !== undefined ? afterHoursTarget : undefined,
      }
    });

    // We can also update all AI agents in this org to use a default fallback target if provided
    if (fallbackTarget !== undefined) {
       await prisma.aIAgent.updateMany({
         where: { organizationId },
         data: { fallbackTarget }
       });
    }

    return NextResponse.json({ success: true, org });
  } catch (error: any) {
    console.error("Routing Save Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
