import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      select: { id: true, name: true }
    });

    const trunks = await prisma.organizationSipTrunk.findMany({
      include: { organization: true },
      orderBy: { createdAt: 'desc' }
    });

    const stringifiedTrunks = JSON.parse(JSON.stringify(trunks));

    return NextResponse.json({ success: true, organizations, stringifiedTrunks });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
  }
}
