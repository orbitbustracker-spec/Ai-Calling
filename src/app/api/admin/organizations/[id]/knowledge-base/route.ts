import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const kbs = await prisma.knowledgeBase.findMany({
      where: { organizationId: id },
      select: { id: true, name: true, content: true },
    });

    return NextResponse.json({ success: true, data: kbs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
