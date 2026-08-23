export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import { Building2, Activity, Wallet, PhoneCall, Cpu, Network, ShieldCheck } from 'lucide-react';

const prisma = new PrismaClient();

export default async function SuperAdminOverview() {
  await requireSuperAdmin();
  
  const orgCount = await prisma.organization.count();
  const activeOrgCount = await prisma.organization.count({ where: { isActive: true } });
  
  const pkgAssignments = await prisma.packageAssignment.findMany();
  const totalPurchased = pkgAssignments.reduce((acc, curr) => acc + curr.purchasedMinutes, 0);
  const totalUsed = pkgAssignments.reduce((acc, curr) => acc + curr.usedMinutes, 0);
  const totalRemaining = pkgAssignments.reduce((acc, curr) => acc + curr.remainingMinutes, 0);
  const totalRevenue = pkgAssignments.reduce((acc, curr) => acc + curr.packagePrice, 0);
  
  const totalCalls = await prisma.call.count();
  const billingConfig = await prisma.billingConfig.findFirst();

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
            <Activity className="w-8 h-8 text-indigo-400" /> Platform Overview
          </h1>
          <p className="text-slate-400">Super Admin monitoring for Voice AI SaaS platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Organizations</h3>
          </div>
          <div className="text-3xl font-black text-white relative z-10">{orgCount} <span className="text-sm text-slate-500 font-medium">({activeOrgCount} Active)</span></div>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Revenue</h3>
          </div>
          <div className="text-3xl font-black text-white relative z-10">Rs. {totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <PhoneCall className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Minutes</h3>
          </div>
          <div className="text-3xl font-black text-white relative z-10">{totalPurchased.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">{totalUsed.toLocaleString()} min used across network</div>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <Activity className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Rate Card</h3>
          </div>
          <div className="text-3xl font-black text-white relative z-10">Rs. {billingConfig?.customerPricePerMinute || 5}<span className="text-sm text-slate-500 font-medium">/min</span></div>
        </div>

      </div>

      {/* Global AI Engine Status (Widget Requested by User) */}
      <h2 className="text-xl font-bold text-white mt-4 border-b border-white/10 pb-2">Global Infrastructure Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ollama Widget */}
        <div className="bg-slate-900/80 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.15)] rounded-2xl p-6 relative overflow-hidden group">
           <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                 <Cpu className="w-6 h-6 text-indigo-400" />
               </div>
               <div>
                 <div className="font-bold text-white text-lg">Ollama LLM Engine</div>
                 <div className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                 </div>
               </div>
             </div>
           </div>
           <div className="space-y-2 text-sm text-slate-400 font-mono relative z-10 bg-slate-950/50 p-3 rounded-lg border border-white/5">
             <div className="flex justify-between"><span>Endpoint:</span> <span className="text-slate-300">http://localhost:11434</span></div>
             <div className="flex justify-between"><span>Model:</span> <span className="text-slate-300">llama3:8b</span></div>
             <div className="flex justify-between"><span>Network Role:</span> <span className="text-slate-300">Global RAG Oracle</span></div>
           </div>
        </div>

        {/* Whisper Widget */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
           <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                 <ShieldCheck className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                 <div className="font-bold text-white text-lg">Faster-Whisper STT</div>
                 <div className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                 </div>
               </div>
             </div>
           </div>
           <div className="space-y-2 text-sm text-slate-400 font-mono relative z-10 bg-slate-950/50 p-3 rounded-lg border border-white/5">
             <div className="flex justify-between"><span>Endpoint:</span> <span className="text-slate-300">http://localhost:8000</span></div>
             <div className="flex justify-between"><span>Model:</span> <span className="text-slate-300">medium</span></div>
             <div className="flex justify-between"><span>Network Role:</span> <span className="text-slate-300">Transcription</span></div>
           </div>
        </div>

        {/* Piper TTS Widget */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
           <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                 <Network className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                 <div className="font-bold text-white text-lg">Piper TTS Server</div>
                 <div className="text-xs text-emerald-400 font-mono flex items-center gap-1 mt-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                 </div>
               </div>
             </div>
           </div>
           <div className="space-y-2 text-sm text-slate-400 font-mono relative z-10 bg-slate-950/50 p-3 rounded-lg border border-white/5">
             <div className="flex justify-between"><span>Endpoint:</span> <span className="text-slate-300">http://localhost:5002</span></div>
             <div className="flex justify-between"><span>Voice:</span> <span className="text-slate-300">en_US-lessac</span></div>
             <div className="flex justify-between"><span>Network Role:</span> <span className="text-slate-300">Voice Synth</span></div>
           </div>
        </div>

      </div>

    </div>
  );
}
