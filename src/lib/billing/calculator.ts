import { BillingConfig, BillingPolicy } from '@prisma/client';

export interface BillingCalculation {
  billableSeconds: number;
  customerCost: number;
  providerCost: number;
}

export function calculateBillableMinutes(actualDurationSeconds: number): number {
  return Math.ceil(actualDurationSeconds / 60);
}

/**
 * Server-side calculation of call costs.
 * NEVER relies on frontend input for price or duration calculations.
 */
export function calculateCallCost(
  actualDurationSeconds: number,
  config: BillingConfig
): BillingCalculation {
  let billableSeconds = actualDurationSeconds;

  // Apply Billing Policy
  if (config.billingPolicy === BillingPolicy.PER_MINUTE_ROUNDED_UP) {
    const minutes = Math.ceil(actualDurationSeconds / 60);
    billableSeconds = minutes * 60;
  }
  // If PER_SECOND, billableSeconds equals actualDurationSeconds

  const billableMinutes = billableSeconds / 60;
  
  const customerCost = billableMinutes * config.customerPricePerMinute;
  const providerCost = billableMinutes * config.providerCostPerMinute;

  return {
    billableSeconds,
    customerCost,
    providerCost
  };
}
