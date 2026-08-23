import { NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { pendingId, userId, email, name } = await req.json();

    const pending = await prisma.pendingRegistration.findUnique({
      where: { id: pendingId }
    });

    if (!pending || pending.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Invalid link' }, { status: 400 });
    }

    // Find the organization that was created during approval
    const org = await prisma.organization.findFirst({
      where: { name: pending.companyName }
    });

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 400 });
    }

    // Create or Update the User in Prisma
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        id: userId, // Ensure Supabase ID is synced
        name,
        role: Role.ORGANIZATION_ADMIN,
        organizationId: org.id
      },
      create: {
        id: userId, // From Supabase Auth
        email,
        name,
        role: Role.ORGANIZATION_ADMIN,
        organizationId: org.id
      }
    });

    // Auto-confirm the user in Supabase auth table to bypass free-tier email limits
    try {
      await prisma.$executeRawUnsafe(`UPDATE auth.users SET email_confirmed_at = NOW() WHERE id = '${userId}'`);
    } catch (dbErr) {
      console.error("Failed to auto-confirm email:", dbErr);
    }

    // Mark pending registration as completed so it can't be used again
    await prisma.pendingRegistration.update({
      where: { id: pendingId },
      data: { status: 'COMPLETED' }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
