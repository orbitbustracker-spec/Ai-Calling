export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { TelephonyClient } from './TelephonyClient';

const prisma = new PrismaClient();

export default async function TelephonyConfigPage() {
  await requireSuperAdmin();

  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true }
  });

  const trunks = await prisma.organizationSipTrunk.findMany({
    include: { organization: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 h-full overflow-y-auto">
      <TelephonyClient initialTrunks={JSON.parse(JSON.stringify(trunks))} organizations={organizations} />
    </div>
  );
}
