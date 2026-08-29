export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingClient from './BillingClient';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function OrgBillingPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const organizationId = user.organizationId;
  
  if (!organizationId) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Organization Found</h1>
        <p className="text-gray-500 dark:text-slate-400">Your account is not linked to an organization. Billing requires an active organization.</p>
      </div>
    );
  }

  const balance = await prisma.organizationBalance.findUnique({
    where: { organizationId }
  });

  const activeAssignment = await prisma.packageAssignment.findFirst({
    where: { organizationId, status: 'ACTIVE' },
    orderBy: { purchasedAt: 'desc' },
    include: { package: true }
  });

  const recentTransactions = await prisma.billingTransaction.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <BillingClient 
      balance={balance} 
      activeAssignment={activeAssignment} 
      recentTransactions={recentTransactions} 
    />
  );
}
