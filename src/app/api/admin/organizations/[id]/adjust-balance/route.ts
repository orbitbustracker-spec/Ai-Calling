import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function adjustBalance(req: Request, context: any) {
  const superAdmin = await requireSuperAdmin();
  // Await params first
  const { id: orgId } = await context.params;
  const { adjustment, reason } = await req.json();

  if (!reason) return NextResponse.json({ error: "Reason required" }, { status: 400 });

  const result = await prisma.$transaction(async (tx) => {
    const balance = await tx.organizationBalance.upsert({
      where: { organizationId: orgId },
      update: { remainingMinutes: { increment: adjustment } },
      create: { organizationId: orgId, remainingMinutes: adjustment }
    });

    await tx.billingTransaction.create({
      data: {
        organizationId: orgId,
        type: 'ADJUSTMENT',
        minutes: adjustment,
        balanceAfter: balance.remainingMinutes,
        description: `Manual adjustment: ${reason}`
      }
    });

    await tx.auditLog.create({
      data: {
        actorUserId: superAdmin.id,
        organizationId: orgId,
        action: 'BALANCE_ADJUSTED',
        previousBalance: balance.remainingMinutes - adjustment,
        adjustment,
        newBalance: balance.remainingMinutes,
        reason
      }
    });

    return balance;
  });

  return NextResponse.json(result);
}

export const POST = withAuth(adjustBalance);
