export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingConfigClient from './BillingConfigClient';

const prisma = new PrismaClient();

export default async function BillingConfigPage() {
  await requireSuperAdmin();
  const config = await prisma.billingConfig.findFirst();

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8">Billing Configuration</h1>
      <BillingConfigClient initialConfig={config} />
    </div>
  );
}

