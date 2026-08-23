import { getCurrentUser } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import IntegrationsClient from './IntegrationsClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function OmnichannelIntegrationsPage() {
  const user = await getCurrentUser();
  
  if (!user || !user.organizationId) {
    return <div>Please join an organization first.</div>;
  }

  const org = await prisma.organization.findUnique({
    where: { id: user.organizationId },
    include: { organizationBalance: true }
  });

  if (!org) return <div>Org not found</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Channel Integrations</h1>
          <p className="text-gray-400 text-sm mt-1">Configure automated AI responses for social media and custom webhooks.</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm bg-[#111113] border border-gray-800 p-4 rounded-xl">
          <div className="text-right border-r border-gray-700 pr-4">
            <p className="text-gray-400">Remaining AI Minutes</p>
            <p className="text-2xl font-bold text-indigo-400">{org.organizationBalance?.remainingMinutes || 0} <span className="text-xs text-gray-500 font-normal">mins</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Commerce Minutes</p>
            <p className="text-2xl font-bold text-orange-400">{org.commerceMinutes} <span className="text-xs text-gray-500 font-normal">mins</span></p>
          </div>
        </div>
      </div>

      <IntegrationsClient isActive={org.isOmnichannelActive} />
    </div>
  );
}
