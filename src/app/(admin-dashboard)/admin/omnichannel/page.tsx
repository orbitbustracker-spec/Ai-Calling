export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import OmnichannelAdminClient from './OmnichannelAdminClient';

const prisma = new PrismaClient();

export default async function AdminOmnichannelPage() {
  await requireSuperAdmin();

  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true }
  });

  const integrations = await prisma.omnichannelIntegration.findMany({
    include: {
      organization: { select: { id: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 h-full overflow-y-auto">
      <OmnichannelAdminClient 
        organizations={organizations} 
        initialIntegrations={JSON.parse(JSON.stringify(integrations))} 
      />
    </div>
  );
}
