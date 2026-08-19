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
    if (!adapter) throw new Error(`Unknown telephony provider type: ${providerType}`);
    return adapter;
  }
}

export const telephonyRegistry = new TelephonyRegistry();
