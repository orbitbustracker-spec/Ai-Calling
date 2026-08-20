export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminOrgsPage() {
  await requireSuperAdmin();
  const orgs = await prisma.organization.findMany({
    include: {
      organizationBalance: true,
      packageAssignments: { where: { status: 'ACTIVE' }, take: 1 }
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Organizations</h1>
      <div className="bg-white rounded shadow border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Name</th><th className="p-4">Status</th><th className="p-4">Remaining Mins</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {orgs.map(org => (
              <tr key={org.id}>
                <td className="p-4">{org.name}</td>
                <td className="p-4">{org.isActive ? 'Active' : 'Inactive'}</td>
                <td className="p-4">{org.organizationBalance?.remainingMinutes || 0}</td>
                <td className="p-4"><Link href={`/admin/organizations/${org.id}`} className="text-blue-600 underline">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

