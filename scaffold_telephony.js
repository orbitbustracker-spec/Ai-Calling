const fs = require('fs');
const path = require('path');

const files = {
  "src/lib/telephony/types.ts": `
export type CallState = 
  | 'INITIATED'
  | 'RINGING'
  | 'ANSWERED'
  | 'COMPLETED'
  | 'FAILED'
  | 'NO_ANSWER'
  | 'BUSY'
  | 'CANCELLED';

export interface NormalizedCallEvent {
  providerCallId: string;
  direction: 'INBOUND' | 'OUTBOUND';
  from: string;
  to: string;
  state: CallState;
  startedAt?: Date;
  answeredAt?: Date;
  endedAt?: Date;
  durationSeconds?: number;
  failureReason?: string;
  providerMetadata?: unknown;
}

export interface TelephonyAdapter {
  makeCall(to: string, from: string, config: unknown): Promise<{ providerCallId: string; state: CallState }>;
  receiveCall(event: unknown): Promise<{ providerCallId: string; state: CallState }>;
  hangupCall(providerCallId: string): Promise<boolean>;
  getCallStatus(providerCallId: string): Promise<CallState>;
  validateWebhook(request: Request, rawBody: string, signature: string): boolean;
  normalizeCallEvent(event: unknown): NormalizedCallEvent;
}
`,
  "src/lib/telephony/registry.ts": `
import { TelephonyAdapter, CallState, NormalizedCallEvent } from './types';

class PlaceholderAdapter implements TelephonyAdapter {
  async makeCall() { throw new Error("Provider not configured"); }
  async receiveCall() { throw new Error("Provider not configured"); }
  async hangupCall() { throw new Error("Provider not configured"); }
  async getCallStatus(): Promise<CallState> { throw new Error("Provider not configured"); }
  validateWebhook() { return false; }
  normalizeCallEvent(): NormalizedCallEvent { throw new Error("Provider not configured"); }
}

export class TelephonyRegistry {
  private adapters: Map<string, TelephonyAdapter> = new Map();

  constructor() {
    this.adapters.set('CUSTOM_SIP', new PlaceholderAdapter());
    this.adapters.set('NTC_SIP', new PlaceholderAdapter());
    this.adapters.set('NCELL_SIP', new PlaceholderAdapter());
  }

  getAdapter(providerType: string): TelephonyAdapter {
    const adapter = this.adapters.get(providerType);
    if (!adapter) throw new Error(\`Unknown telephony provider type: \${providerType}\`);
    return adapter;
  }
}

export const telephonyRegistry = new TelephonyRegistry();
`,
  "src/lib/telephony/service.ts": `
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

  if (!call) throw new Error(\`Call not found: \${event.providerCallId}\`);

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
      const idempotencyKey = \`call_completion_\${call.id}\`;
      await deductCallMinutes(call.organizationId, call.id, billableMins, 0, 0, idempotencyKey);
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
`,
  "src/app/api/admin/providers/telephony/route.ts": `
import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listProviders(req: Request) {
  await requireSuperAdmin();
  const providers = await prisma.telephonyProvider.findMany({
    select: {
      id: true,
      name: true,
      providerType: true,
      enabled: true,
      capabilities: true,
      createdAt: true,
      updatedAt: true
      // configuration intentionally omitted to prevent secret leakage
    }
  });
  return NextResponse.json(providers);
}

export const GET = withAuth(listProviders);
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content.trim() + '\\n');
}
console.log('Telephony scaffold complete.');
