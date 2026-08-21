export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function SuperAdminOverview() {
  await requireSuperAdmin();
  
  const orgCount = await prisma.organization.count();
  const activeOrgCount = await prisma.organization.count({ where: { isActive: true } });
  
  const pkgAssignments = await prisma.packageAssignment.findMany();
  const totalPurchased = pkgAssignments.reduce((acc, curr) => acc + curr.purchasedMinutes, 0);
  const totalUsed = pkgAssignments.reduce((acc, curr) => acc + curr.usedMinutes, 0);
  const totalRemaining = pkgAssignments.reduce((acc, curr) => acc + curr.remainingMinutes, 0);
  const totalRevenue = pkgAssignments.reduce((acc, curr) => acc + curr.packagePrice, 0);
  
  const totalCalls = await prisma.call.count();
  const usageRecords = await prisma.usageRecord.findMany();
  const totalBillableMinutes = usageRecords.reduce((acc, curr) => acc + curr.billableMinutes, 0);

  const billingConfig = await prisma.billingConfig.findFirst();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Platform Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Organizations</div><div className="text-2xl font-bold">{orgCount}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Active Organizations</div><div className="text-2xl font-bold">{activeOrgCount}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Revenue</div><div className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Current Rate</div><div className="text-2xl font-bold">Rs. {billingConfig?.customerPricePerMinute || 5}/min</div></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Purchased Minutes</div><div className="text-2xl font-bold">{totalPurchased.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Used Minutes</div><div className="text-2xl font-bold">{totalUsed.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Remaining Minutes</div><div className="text-2xl font-bold">{totalRemaining.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Billable Calls</div><div className="text-2xl font-bold">{totalCalls.toLocaleString()}</div></div>
      </div>
    </div>
  );
}
