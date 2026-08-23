import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingListClient from './BillingListClient';

const prisma = new PrismaClient();

export default async function BillingConfigPage() {
  await requireSuperAdmin();
  
  const orgs = await prisma.organization.findMany({
    include: {
      organizationBalance: true,
      billingTransactions: {
        orderBy: { createdAt: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Organization Billing</h1>
        <p className="text-gray-500 mt-2">Manage balances, view transaction history, and manually add minutes or funds per organization.</p>
      </div>
      
      <BillingListClient orgs={orgs} />
    </div>
  );
}
