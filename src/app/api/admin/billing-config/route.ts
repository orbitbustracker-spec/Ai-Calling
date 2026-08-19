import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateBillingConfig(req: Request) {
  const superAdmin = await requireSuperAdmin();
  const { customerPricePerMinute } = await req.json();

  const existing = await prisma.billingConfig.findFirst();
  let config;
  if (existing) {
    config = await prisma.billingConfig.update({
      where: { id: existing.id },
      data: { customerPricePerMinute, aiCallRatePerMinute: customerPricePerMinute }
    });
  } else {
    config = await prisma.billingConfig.create({
      data: { customerPricePerMinute, aiCallRatePerMinute: customerPricePerMinute }
    });
  }

  await prisma.auditLog.create({
    data: {
      actorUserId: superAdmin.id,
      organizationId: 'SYSTEM',
      action: 'BILLING_RATE_CHANGED',
      previousBalance: 0, adjustment: 0, newBalance: 0,
      reason: `Rate changed to ${customerPricePerMinute}`
    }
  });

  return NextResponse.json(config);
}
export const POST = withAuth(updateBillingConfig);
