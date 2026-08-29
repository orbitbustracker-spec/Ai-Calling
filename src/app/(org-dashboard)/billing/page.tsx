export const dynamic = 'force-dynamic';
import { getCurrentUser } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingClient from './BillingClient';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function OrgBillingPage() {
  try {
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

    // Wrap DB calls in try/catch to prevent 500 errors if tables are empty/missing
    let balance = null;
    let activeAssignment = null;
    let recentTransactions = [];

    try {
      balance = await prisma.organizationBalance.findUnique({
        where: { organizationId }
      });
    } catch (e) {
      console.error("Error fetching balance:", e);
    }

    try {
      activeAssignment = await prisma.packageAssignment.findFirst({
        where: { organizationId, status: 'ACTIVE' },
        orderBy: { purchasedAt: 'desc' },
        include: { package: true }
      });
    } catch (e) {
      console.error("Error fetching active assignment:", e);
    }

    try {
      recentTransactions = await prisma.billingTransaction.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    } catch (e) {
      console.error("Error fetching transactions:", e);
    }

    return (
      <BillingClient 
        balance={balance} 
        activeAssignment={activeAssignment} 
        recentTransactions={recentTransactions} 
      />
    );
  } catch (error) {
    console.error("Billing page crashed:", error);
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl font-bold mb-2">An error occurred loading billing</h1>
        <p>Please check the server logs.</p>
      </div>
    );
  }
}
