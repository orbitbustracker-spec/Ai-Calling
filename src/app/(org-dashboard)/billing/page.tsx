export const dynamic = 'force-dynamic';
import { requireOrganizationAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingClient from './BillingClient';

const prisma = new PrismaClient();

export default async function OrgBillingPage() {
  const organizationId = await requireOrganizationAdmin();

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
