export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { AIEnginesClient } from './AIEnginesClient';

const prisma = new PrismaClient();

export default async function AiTelephonyEnginePage() {
  await requireSuperAdmin();

  const organizations = await prisma.organization.findMany({
    select: { id: true, name: true }
  });

  const globalNodes = await prisma.aIEngineConfig.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <span className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
            <Cpu className="w-8 h-8" />
          </span>
          Super Admin AI Gateway
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage Global AI Nodes and Assign them to Organizations.</p>
      </div>

      <AIEnginesClient initialGlobalNodes={JSON.parse(JSON.stringify(globalNodes))} organizations={organizations} />
    </div>
  );
}

// Ensure icons are available if not imported inside page.tsx
import { Cpu } from 'lucide-react';
