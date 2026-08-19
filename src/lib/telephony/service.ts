import { PrismaClient, CallStatus } from '@prisma/client';
import { NormalizedCallEvent } from './types';
import { deductCallMinutes } from '../billing/wallet';
import { calculateBillableMinutes } from '../billing/calculator';

const prisma = new PrismaClient();

export async function handleCallCompletion(event: NormalizedCallEvent) {
  if (event.state !== 'COMPLETED' && event.state !== 'FAILED' && event.state !== 'NO_ANSWER' && event.state !== 'BUSY' && event.state !== 'CANCELLED') {
    return; // Only final states
  }

  const call = await prisma.call.findFirst({
    where: { providerCallId: event.providerCallId }
  });

  if (!call) throw new Error(`Call not found: ${event.providerCallId}`);

  const billableMins = event.state === 'COMPLETED' ? calculateBillableMinutes(event.durationSeconds || 0) : 0;

  const updatedCall = await prisma.call.update({
    where: { id: call.id },
    data: {
      status: event.state as CallStatus,
      endedAt: event.endedAt,
      durationSeconds: event.durationSeconds,
      billableMinutes: billableMins,
      failureReason: event.failureReason,
    }
  });

  if (event.state === 'COMPLETED' && billableMins > 0) {
    try {
      // Use providerCallId as idempotency key or composite
      await deductCallMinutes(call.organizationId, call.id, billableMins, 0, 0);
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes('already processed')) {
        // Idempotent duplicate, ignore
        return;
      }
      throw e;
    }
  }

  return updatedCall;
}
