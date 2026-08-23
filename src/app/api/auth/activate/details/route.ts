import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  try {
    const pending = await prisma.pendingRegistration.findUnique({
      where: { id }
    });

    if (!pending || pending.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Invalid or unapproved link' }, { status: 400 });
    }

    return NextResponse.json({ pending });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
