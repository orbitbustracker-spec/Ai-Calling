import { requireOrganizationAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

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
    where: { organizationId, type: 'DEDUCTION' },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // Calculate the bar width
  const totalMinutes = activeAssignment?.purchasedMinutes || 0;
  const usedMinutes = activeAssignment?.usedMinutes || 0;
  const progressPercent = totalMinutes > 0 ? (usedMinutes / totalMinutes) * 100 : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Billing & Usage</h1>

      {/* Current Package Card */}
      <div className="bg-white rounded-lg shadow border overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Calling Package</h2>
        </div>
        
        {activeAssignment ? (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-y-4 text-sm mb-8">
              <div className="text-gray-500 font-medium">Package</div>
              <div className="font-semibold">{activeAssignment.package?.name || 'Custom Package'}</div>
              
              <div className="text-gray-500 font-medium">Total Minutes</div>
              <div>{activeAssignment.purchasedMinutes.toLocaleString()}</div>
              
              <div className="text-gray-500 font-medium">Used Minutes</div>
              <div>{activeAssignment.usedMinutes.toLocaleString()}</div>
              
              <div className="text-gray-500 font-medium">Remaining</div>
              <div className="font-bold text-blue-600">{activeAssignment.remainingMinutes.toLocaleString()} MINUTES</div>
              
              <div className="text-gray-500 font-medium">Rate</div>
              <div>Rs. {activeAssignment.ratePerMinuteAtPurchase.toFixed(2)} / minute</div>
              
              <div className="text-gray-500 font-medium">Package Value</div>
              <div>Rs. {activeAssignment.packagePrice.toLocaleString()}</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              ></div>
            </div>
            <div className="text-center text-sm font-medium text-gray-600">
              {usedMinutes.toLocaleString()} / {totalMinutes.toLocaleString()} minutes used
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No active package found. Please contact support to purchase minutes.
          </div>
        )}
      </div>

      {/* Recent Calls Table */}
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Usage</h2>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-medium text-gray-600">Date</th>
              <th className="p-4 font-medium text-gray-600">Description</th>
              <th className="p-4 font-medium text-gray-600">Used</th>
              <th className="p-4 font-medium text-gray-600">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="p-4">
                  {new Date(tx.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="p-4">{tx.description || 'Call Usage'}</td>
                <td className="p-4 text-red-600 font-medium">-{tx.minutes} min</td>
                <td className="p-4 font-semibold">{tx.balanceAfter.toLocaleString()}</td>
              </tr>
            ))}
            {recentTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No usage recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
