import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    await requireSuperAdmin();
    const { action, orgId, minutes } = await req.json();

    if (!orgId) return NextResponse.json({ error: 'Org ID required' }, { status: 400 });

    if (action === 'toggle_social') {
      const org = await prisma.organization.findUnique({ where: { id: orgId } });
      if (!org) return NextResponse.json({ error: 'Org not found' }, { status: 404 });

      const newStatus = !org.isOmnichannelActive;
      
      let expiry = org.omnichannelExpiryDate;
      if (newStatus && !expiry) {
        // If activating and no expiry, set it for 1 month from now
        expiry = new Date();
        expiry.setMonth(expiry.getMonth() + 1);
      }

      await prisma.organization.update({
        where: { id: orgId },
        data: { 
          isOmnichannelActive: newStatus,
          omnichannelExpiryDate: newStatus ? expiry : null // clear expiry if freezing
        }
      });
      return NextResponse.json({ success: true, message: `Social module ${newStatus ? 'Unfrozen' : 'Frozen'} successfully.` });
    } 
    
    if (action === 'add_minutes') {
      if (!minutes || typeof minutes !== 'number') {
        return NextResponse.json({ error: 'Valid minutes amount required' }, { status: 400 });
      }

      await prisma.organization.update({
        where: { id: orgId },
        data: {
          isCommerceActive: true, // auto unlock if adding minutes
          commerceMinutes: { increment: minutes }
        }
      });
      return NextResponse.json({ success: true, message: `Added ${minutes} minutes successfully.` });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Admin Action Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
