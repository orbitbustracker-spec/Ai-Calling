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

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError && authError.message !== 'User already registered') {
      console.error('Supabase Auth error:', authError);
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (signInError && authError?.message === 'User already registered') {
      return NextResponse.json({ 
        error: 'User already exists in Supabase Auth but password is not Istuti@98510. Please delete the user from Supabase dashboard and hit this endpoint again.' 
      }, { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Failed to get user after sign up/in' }, { status: 500 });
    }

    await prisma.$executeRawUnsafe(
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = $1;
    , email);

    await prisma.user.upsert({
      where: { email },
      update: { role: 'SUPER_ADMIN' },
      create: {
        id: user.id,
        email,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      }
    });

    return NextResponse.json({ success: true, message: Super Admin  verified and updated successfully! });

  } catch (error: any) {
    console.error('Seed Super Admin Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
