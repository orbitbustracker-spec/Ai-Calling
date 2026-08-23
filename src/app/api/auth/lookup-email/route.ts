import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    // Try finding by email first
    let user = await prisma.user.findUnique({
      where: { email: identifier }
    });

    // If not found, try finding by phone
    if (!user) {
      user = await prisma.user.findUnique({
        where: { phone: identifier }
      });
    }

    if (user) {
      return NextResponse.json({ email: user.email });
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
