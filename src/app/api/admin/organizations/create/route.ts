import { NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      name, adminEmail, adminName, adminPassword, adminPhone, 
      isOmnichannelActive, isCommerceActive, initialMinutes 
    } = data;

    if (!name || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create the Organization in Prisma
    const org = await prisma.organization.create({
      data: {
        name,
        isActive: true,
        isOmnichannelActive: Boolean(isOmnichannelActive),
        isCommerceActive: Boolean(isCommerceActive),
        commerceMinutes: isCommerceActive ? 500 : 0
      }
    });

    // 2. Setup Balance
    if (initialMinutes > 0) {
      await prisma.organizationBalance.create({
        data: {
          organizationId: org.id,
          remainingMinutes: initialMinutes // Free tier / trial
        }
      });
      
      // Give them a starter package
      const starterPkg = await prisma.package.findFirst({ where: { isActive: true } });
      if (starterPkg) {
        await prisma.packageAssignment.create({
          data: {
            organizationId: org.id,
            packageId: starterPkg.id,
            purchasedMinutes: initialMinutes,
            usedMinutes: 0,
            remainingMinutes: initialMinutes,
            packagePrice: starterPkg.calculatedPrice || 0,
            ratePerMinuteAtPurchase: starterPkg.ratePerMinute || 0,
            status: 'ACTIVE'
          }
        });
      }
    }

    // 3. Setup Supabase Auth for Admin User
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name) { return cookieStore.get(name)?.value; } } }
    );

    // Create user in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          full_name: adminName,
          phone: adminPhone
        }
      }
    });

    if (authError) {
      // If error is user exists, we'll try to find them and just attach them to the org
      if (authError.message === 'User already registered') {
        // Just attach existing user
      } else {
        throw new Error(authError.message);
      }
    }

    // Auto-confirm the email
    await prisma.$executeRawUnsafe(`
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = $1;
    `, adminEmail);

    // Get the user ID
    const users: any[] = await prisma.$queryRawUnsafe(`
      SELECT id FROM auth.users WHERE email = $1 LIMIT 1;
    `, adminEmail);

    if (users && users.length > 0) {
      const userId = users[0].id;

      // 4. Create/Update Prisma User
      await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
          id: userId,
          organizationId: org.id,
          role: Role.ORGANIZATION_ADMIN,
          name: adminName || 'Admin'
        },
        create: {
          id: userId,
          email: adminEmail,
          name: adminName || 'Admin',
          role: Role.ORGANIZATION_ADMIN,
          organizationId: org.id
        }
      });
    }

    return NextResponse.json({ success: true, organizationId: org.id });

  } catch (error: any) {
    console.error('Create Org Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
