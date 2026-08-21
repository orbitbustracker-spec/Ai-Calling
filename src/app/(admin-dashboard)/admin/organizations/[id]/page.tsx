export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import AdjustBalanceClient from './AdjustBalanceClient';

const prisma = new PrismaClient();

export default async function OrgDetailPage(props: { params: Promise<{ id: string }> }) {
  await requireSuperAdmin();
  
  // Await the params object before accessing its properties
  const params = await props.params;
  const { id } = params;

  const org = await prisma.organization.findUnique({
    where: { id },
    include: { organizationBalance: true, packageAssignments: { orderBy: { createdAt: 'desc' } } }
  });

  if (!org) return <div>Org not found</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Organization: {org.name}</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <p>Status: {org.isActive ? 'Active' : 'Inactive'}</p>
          <p>Remaining Minutes: <strong>{org.organizationBalance?.remainingMinutes || 0}</strong></p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4">Manual Adjustment</h2>
          <AdjustBalanceClient orgId={org.id} />
        </div>
      </div>
    </div>
  );
}
