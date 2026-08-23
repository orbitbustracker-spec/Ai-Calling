import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!user.organizationId) {
      return NextResponse.json({ error: 'No organization linked' }, { status: 400 });
    }

    const body = await req.json();
    const { feature } = body; // 'omnichannel' or 'commerce'

    if (feature === 'omnichannel') {
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1); // 1 month subscription
      
      await prisma.organization.update({
        where: { id: user.organizationId },
        data: {
          isOmnichannelActive: true,
          omnichannelExpiryDate: expiry
        }
      });
      return NextResponse.json({ success: true, message: 'Omnichannel unlocked successfully!' });
    } 
    
    if (feature === 'commerce') {
      await prisma.organization.update({
        where: { id: user.organizationId },
        data: {
          isCommerceActive: true,
          commerceMinutes: { increment: 500 } // Example: 500 minutes package
        }
      });
      return NextResponse.json({ success: true, message: 'Commerce module unlocked! 500 minutes added.' });
    }

    return NextResponse.json({ error: 'Invalid feature' }, { status: 400 });
  } catch (error: any) {
    console.error('Error unfreezing:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
