import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // 1. Check if user exists in public.User
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found in public.User table. Please register first.' });
    }

    // 2. Set role to SUPER_ADMIN
    await prisma.user.update({
      where: { email },
      data: { role: 'SUPER_ADMIN' }
    });

    // 3. Confirm email in Supabase auth.users using raw SQL
    await prisma.$executeRawUnsafe(`
      UPDATE auth.users 
      SET email_confirmed_at = NOW() 
      WHERE email = $1;
    `, email);

    return NextResponse.json({ 
      success: true, 
      message: `User ${email} has been confirmed and promoted to SUPER_ADMIN.` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
