import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireSuperAdmin();
    const { id } = await params;
    const body = await req.json();
    
    // Only allow updating specific fields
    const { role, organizationId, name, phone } = body;
    
    const user = await prisma.user.update({
      where: { id },
      data: { 
        ...(role && { role }),
        ...(organizationId !== undefined && { organizationId }),
        ...(name && { name }),
        ...(phone && { phone }),
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireSuperAdmin();
    const { id } = await params;
    
    // Delete from Prisma (you might also need to delete from Supabase auth.users in a real production env, but for now Prisma is fine)
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
