import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ exists: false });

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return NextResponse.json({ exists: !!user });
  } catch (err: any) {
    return NextResponse.json({ exists: false });
  }
}
