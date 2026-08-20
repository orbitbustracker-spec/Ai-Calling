export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import AssignPackageClient from './AssignPackageClient';

const prisma = new PrismaClient();

export default async function AssignPackagePage() {
  await requireSuperAdmin();
  const orgs = await prisma.organization.findMany({ where: { isActive: true } });
  const packages = await prisma.package.findMany({ where: { isActive: true } });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Assign Package</h1>
      <AssignPackageClient organizations={orgs} packages={packages} />
    </div>
  );
}

