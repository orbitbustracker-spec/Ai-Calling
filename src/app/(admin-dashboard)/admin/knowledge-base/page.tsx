import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { AdminKnowledgeBaseClient } from './AdminKnowledgeBaseClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminKnowledgeBasePage() {
  await requireSuperAdmin();

  // Fetch all organizations to show in the dropdown
  const organizations = await prisma.organization.findMany({
    orderBy: { name: 'asc' },
    include: {
      organizationBalance: true,
      knowledgeBases: { orderBy: { createdAt: 'desc' } }
    }
  });

  const sipMappings = await prisma.phoneNumberMapping.findMany();
  const providers = await prisma.telephonyProvider.findMany();

  // Group SIP mappings by organization
  const orgSips = organizations.map(org => {
    return {
      ...org,
      sips: sipMappings
        .filter(sip => sip.organizationId === org.id)
        .map(sip => ({
          ...sip,
          provider: providers.find(p => p.id === sip.providerId)
        }))
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AdminKnowledgeBaseClient organizations={orgSips} />
    </div>
  );
}
