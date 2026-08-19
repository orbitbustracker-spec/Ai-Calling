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
