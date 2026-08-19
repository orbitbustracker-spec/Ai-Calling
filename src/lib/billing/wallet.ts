import { PrismaClient } from '@prisma/client';
import { runIdempotentOperation } from './idempotency';

const prisma = new PrismaClient();

export async function deductCallMinutes(
  organizationId: string,
  callId: string,
  billableMinutes: number,
  customerPrice: number,
  providerCost: number
) {
  // Prevent duplicate deductions for the same call
  return await runIdempotentOperation(`deduct_${callId}`, async () => {
    // 1. We must atomically deduct the minutes and prevent it from going below zero.
    // We use a Prisma transaction to ensure the balance is updated and usage/ledger are written together.
    
    return await prisma.$transaction(async (tx) => {
      // Fetch current balance (with a row lock if supported by the adapter, or rely on decrement constraint)
      const balance = await tx.organizationBalance.findUnique({
        where: { organizationId },
      });

      if (!balance || balance.remainingMinutes < billableMinutes) {
        throw new Error('Insufficient prepaid minutes');
      }

      // Atomically decrement
      const updatedBalance = await tx.organizationBalance.update({
        where: { organizationId },
        data: {
          remainingMinutes: {
            decrement: billableMinutes
          }
        }
      });

      // Prisma check if it went below zero (though application logic above prevents it mostly)
      if (updatedBalance.remainingMinutes < 0) {
        throw new Error('Insufficient prepaid minutes'); // Rolls back the transaction
      }

      // Update the active package assignments (for history tracking)
      // Note: This logic sequentially uses the oldest active assignment.
      const assignments = await tx.packageAssignment.findMany({
        where: { organizationId, status: 'ACTIVE' },
        orderBy: { purchasedAt: 'asc' }
      });

      let minutesToDeduct = billableMinutes;
      for (const assignment of assignments) {
        if (minutesToDeduct <= 0) break;
        
        const deductAmount = Math.min(assignment.remainingMinutes, minutesToDeduct);
        minutesToDeduct -= deductAmount;
        
        const newRemaining = assignment.remainingMinutes - deductAmount;
        const newUsed = assignment.usedMinutes + deductAmount;
        
        await tx.packageAssignment.update({
          where: { id: assignment.id },
          data: {
            remainingMinutes: newRemaining,
            usedMinutes: newUsed,
            status: newRemaining === 0 ? 'EXHAUSTED' : 'ACTIVE'
          }
        });
      }

      // Create ledger transaction
      await tx.billingTransaction.create({
        data: {
          organizationId,
          type: 'DEDUCTION',
          minutes: billableMinutes,
          balanceAfter: updatedBalance.remainingMinutes,
          description: `Call usage`,
          referenceId: callId
        }
      });

      // Create usage record
      await tx.usageRecord.create({
        data: {
          organizationId,
          callId,
          billableMinutes,
          customerPrice,
          providerCost
        }
      });

      return updatedBalance;
    });
  });
}
