import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name) { return cookieStore.get(name)?.value; } } }
    );

    const email = 'baraldhar@gmail.com';
    const password = 'Istuti@98510';

    // 1. Force wipe any existing broken state
    try {
      await prisma.$executeRawUnsafe(`DELETE FROM public."User" WHERE email = $1;`, email);
      await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE email = $1;`, email);
    } catch (wipeErr) {
      console.warn("Wipe warning (safe to ignore if user didn't exist):", wipeErr);
    }

    // 2. Fresh Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password, // Now guaranteed to be exactly 'Istuti@98510'
    });

    if (authError) {
      console.error('Supabase Auth error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Force confirm the email in auth.users directly via database
    await prisma.$executeRawUnsafe(`
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = $1;
    `, email);

    // Get the user's ID from auth.users to ensure we have it even if signUp failed
    const users: any[] = await prisma.$queryRawUnsafe(`
      SELECT id FROM auth.users WHERE email = $1 LIMIT 1;
    `, email);

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Failed to find user in auth.users after creation attempt.' }, { status: 500 });
    }

    const userId = users[0].id;

    // Upsert the user into the public.User table as SUPER_ADMIN
    await prisma.user.upsert({
      where: { email },
      update: { 
        id: userId, // Ensure ID matches auth.users
        role: 'SUPER_ADMIN' 
      },
      create: {
        id: userId,
        email,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      }
    });

    return NextResponse.json({ success: true, message: `Super Admin ${email} verified and updated successfully! You can now log in.` });

  } catch (error: any) {
    console.error('Seed Super Admin Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
