export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import DeleteOrgModal from './DeleteOrgModal';
import CreateOrgModal from './CreateOrgModal';
import { Building2, Edit2, ShieldAlert } from 'lucide-react';

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
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-slate-700 dark:text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> Organizations
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage all tenant organizations on the platform.</p>
        </div>
        <CreateOrgModal />
      </div>

      <div className="bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-950/50 border-b border-slate-200 dark:border-white/10 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="p-6">Name</th>
                <th className="p-6">Status</th>
                <th className="p-6">Remaining Mins</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orgs.map(org => (
                <tr key={org.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 font-bold text-slate-900 dark:text-white">{org.name}</td>
                  <td className="p-6">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${org.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {org.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-6 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {org.organizationBalance?.remainingMinutes || 0}
                  </td>
                  <td className="p-6 text-right space-x-3 flex items-center justify-end">
                    <Link href={`/admin/organizations/${org.id}`} className="inline-flex items-center gap-2 text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded hover:bg-indigo-100 dark:bg-indigo-500/20 transition-colors">
                      <ShieldAlert className="w-3 h-3" /> Manage Sandbox
                    </Link>
                    <button className="text-slate-500 hover:text-indigo-600 dark:text-indigo-400 transition-colors p-1"><Edit2 className="w-4 h-4" /></button>
                    <DeleteOrgModal orgId={org.id} orgName={org.name} />
                  </td>
                </tr>
              ))}
              {orgs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">No organizations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
