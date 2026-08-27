import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { Phone, FileText, Calendar, Clock, User } from 'lucide-react';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CallSummaryPage() {
  await requireSuperAdmin();

  const calls = await prisma.call.findMany({
    orderBy: { createdAt: 'desc' },
    include: { organization: true },
    take: 100 // Load last 100 calls for summary
  });

  return (
    <div className="p-8 space-y-8 text-slate-700 dark:text-slate-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> AI Call Summary & Transcripts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed text reports and summaries of all AI conversations with caller IDs.</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-950/50 border-b border-slate-200 dark:border-white/10 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
            <tr>
              <th className="p-5">Caller ID</th>
              <th className="p-5">Organization</th>
              <th className="p-5">Date & Time</th>
              <th className="p-5">Status</th>
              <th className="p-5">Duration</th>
              <th className="p-5">AI Summary / Transcript</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {calls.map(call => (
              <tr key={call.id} className="hover:bg-slate-800/30 transition-colors align-top">
                <td className="p-5 font-bold text-indigo-300">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {call.fromNumber || 'Unknown'}
                  </div>
                </td>
                <td className="p-5">{call.organization?.name || '-'}</td>
                <td className="p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" /> 
                    {new Date(call.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                    <Clock className="w-3 h-3" /> 
                    {new Date(call.createdAt).toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    call.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    call.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {call.status}
                  </span>
                </td>
                <td className="p-5">{call.durationSeconds}s</td>
                <td className="p-5 max-w-md">
                  {call.summaryText && (
                    <div className="mb-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Summary</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{call.summaryText}</p>
                    </div>
                  )}
                  {call.transcriptText && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-white/5 h-24 overflow-y-auto custom-scrollbar">
                      <span className="text-[10px] font-bold text-slate-500 uppercase sticky top-0 bg-gray-50 dark:bg-slate-950 pb-1 block">Full Transcript</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-wrap mt-1">{call.transcriptText}</p>
                    </div>
                  )}
                  {!call.summaryText && !call.transcriptText && (
                    <span className="text-slate-600 italic">No text report available</span>
                  )}
                </td>
              </tr>
            ))}
            {calls.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-500">
                  <Phone className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  No calls recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
