import { NextResponse } from 'next/server';
import { PrismaClient, UsageType, Channel } from '@prisma/client';

const prisma = new PrismaClient();

// In a real app, this endpoint would be securely called by the internal Voice AI / Text AI engines.
// We expect an internal secret header to prevent unauthorized access.
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET || 'nexus_internal_secret'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { organizationId, type, channel, durationSeconds, messageCount } = await req.json();

    if (!organizationId || !type || !channel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: { organizationBalance: true }
    });

    if (!org || !org.organizationBalance) {
      return NextResponse.json({ error: 'Organization or balance not found' }, { status: 404 });
    }

    let rateApplied = 0;
    let totalDeductedNpr = 0;
    let minutesToDeduct = 0;

    if (type === 'VOICE_CALL') {
      rateApplied = 5.00; // NPR 5 per minute
      minutesToDeduct = Math.ceil((durationSeconds || 0) / 60);
      totalDeductedNpr = minutesToDeduct * rateApplied;
    } else if (type === 'TEXT_MESSAGE') {
      rateApplied = 0.50; // NPR 0.50 per msg
      // We don't deduct "minutes" for text messages in this model, just tracking the NPR.
      // But we can map NPR back to minutes equivalence if needed, or maintain a separate wallet.
      // Let's deduct from commerceMinutes or a shared wallet. 
      // For this spec: "Remaining Minutes (NPR 5/min), and Remaining Text Messages (NPR 0.50/msg)"
      // We will deduct equivalent minutes. 1 minute = 5 NPR. So 1 text msg = 0.1 minutes.
      // Since remainingMinutes is Int, we round up the minute equivalence
      minutesToDeduct = Math.ceil((messageCount || 1) * 0.1);
      totalDeductedNpr = (messageCount || 1) * rateApplied;
    } else if (type === 'MEDIA_MESSAGE') {
      rateApplied = 1.50; // NPR 1.50 per image
      minutesToDeduct = Math.ceil((messageCount || 1) * 0.3); // 1.50 / 5.00
      totalDeductedNpr = (messageCount || 1) * rateApplied;
    }

    // Check if enough balance exists
    const currentMins = org.organizationBalance.remainingMinutes;
    if (currentMins < minutesToDeduct) {
      // Auto-freeze logic
      await prisma.organization.update({
        where: { id: org.id },
        data: {
          isOmnichannelActive: false,
          isCommerceActive: false
        }
      });
      return NextResponse.json({ error: 'Insufficient balance. Modules frozen.' }, { status: 402 });
    }

    // Perform deduction
    await prisma.$transaction([
      prisma.organizationBalance.update({
        where: { organizationId: org.id },
        data: { remainingMinutes: { decrement: minutesToDeduct } }
      }),
      prisma.organizationUsageLog.create({
        data: {
          organizationId: org.id,
          type,
          channel,
          durationSeconds,
          messageCount,
          rateApplied,
          totalDeductedNpr
        }
      })
    ]);

    return NextResponse.json({ 
      success: true, 
      deductedMinutes: minutesToDeduct, 
      deductedNpr: totalDeductedNpr 
    });

  } catch (error: any) {
    console.error('Billing Deduct Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
