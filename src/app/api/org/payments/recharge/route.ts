import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(); 
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!user.organizationId) {
      return NextResponse.json({ error: 'No organization linked' }, { status: 400 });
    }

    const body = await req.json();
    const { amount } = body; 

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Demo: We use commerceMinutes as the proxy for TEXT/WHATSAPP balance since walletBalanceNpr doesn't exist
    // Let's add 5000 text credits every time they recharge for demo
    const updatedOrg = await prisma.organization.update({
      where: { id: user.organizationId },
      data: {
        commerceMinutes: { increment: 5000 }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Recharge successful (Demo Mode)',
      newBalance: updatedOrg.commerceMinutes
    });
  } catch (error: any) {
    console.error('Error recharging:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
