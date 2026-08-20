export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AuditLogsPage() {
  await requireSuperAdmin();
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Audit Logs</h1>
      <div className="bg-white rounded shadow border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Date</th><th className="p-4">Action</th><th className="p-4">Org ID</th><th className="p-4">Adjustment</th><th className="p-4">Reason</th></tr>
          </thead>
          <tbody className="divide-y">
            {logs.map(log => (
              <tr key={log.id}>
                <td className="p-4">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-4 font-mono text-xs">{log.action}</td>
                <td className="p-4 font-mono text-xs">{log.organizationId}</td>
                <td className="p-4">{log.adjustment}</td>
                <td className="p-4">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

