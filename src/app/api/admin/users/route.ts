import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await requireSuperAdmin();
    const users = await prisma.user.findMany({
      include: { organization: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
