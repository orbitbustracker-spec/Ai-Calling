import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { Activity, PhoneCall, MessageSquare, DollarSign, Image as ImageIcon } from 'lucide-react';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminUsageAnalyticsPage() {
  await requireSuperAdmin();

  const usageLogs = await prisma.organizationUsageLog.findMany({
    orderBy: { timestamp: 'desc' },
    include: { organization: true },
    take: 100 // Recent logs
  });

  // Calculate aggregates
  let totalRevenueNpr = 0;
  let voiceMinutes = 0;
  let textMessages = 0;
  let mediaMessages = 0;

  usageLogs.forEach(log => {
    totalRevenueNpr += log.totalDeductedNpr;
    if (log.type === 'VOICE_CALL') voiceMinutes += Math.ceil((log.durationSeconds || 0) / 60);
    if (log.type === 'TEXT_MESSAGE') textMessages += (log.messageCount || 0);
    if (log.type === 'MEDIA_MESSAGE') mediaMessages += (log.messageCount || 0);
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl border border-indigo-200">
            <Activity className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time revenue monitoring and API cost breakdown across all orgs.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 text-indigo-600 font-semibold">
            <DollarSign className="h-5 w-5" /> Total Revenue
          </div>
          <div className="text-4xl font-bold text-gray-900">NPR {totalRevenueNpr.toFixed(2)}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 text-green-600 font-semibold">
            <PhoneCall className="h-5 w-5" /> Voice Usage
          </div>
          <div className="text-4xl font-bold text-gray-900">{voiceMinutes} <span className="text-lg font-normal text-gray-500">mins</span></div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 text-blue-600 font-semibold">
            <MessageSquare className="h-5 w-5" /> Text Messages
          </div>
          <div className="text-4xl font-bold text-gray-900">{textMessages} <span className="text-lg font-normal text-gray-500">msgs</span></div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 text-orange-600 font-semibold">
            <ImageIcon className="h-5 w-5" /> Media (Images)
          </div>
          <div className="text-4xl font-bold text-gray-900">{mediaMessages} <span className="text-lg font-normal text-gray-500">items</span></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-900">Recent API Deductions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Organization</th>
                <th className="p-4 font-semibold">Channel</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Volume</th>
                <th className="p-4 font-semibold">Rate (NPR)</th>
                <th className="p-4 font-semibold text-right">Deducted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usageLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{log.organization?.name || 'Unknown'}</td>
                  <td className="p-4 text-sm text-gray-600">{log.channel}</td>
                  <td className="p-4 text-sm font-medium text-gray-700">{log.type}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {log.type === 'VOICE_CALL' ? `${log.durationSeconds}s` : `${log.messageCount} msg`}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{log.rateApplied.toFixed(2)}</td>
                  <td className="p-4 text-right font-bold text-red-600">
                    - {log.totalDeductedNpr.toFixed(2)}
                  </td>
                </tr>
              ))}
              {usageLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No usage logs recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
