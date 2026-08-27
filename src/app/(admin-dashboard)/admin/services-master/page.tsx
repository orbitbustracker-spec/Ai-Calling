'use client';

import React, { useState } from 'react';
import { Shield, Search, Lock, Unlock, AlertTriangle } from 'lucide-react';

const ORGS = [
  { id: '1', name: 'Changunarayan Municipality', balance: 5400, frozen: false },
  { id: '2', name: 'Global IME Bank', balance: 125000, frozen: false },
  { id: '3', name: 'Daraz Nepal', balance: 0, frozen: true },
  { id: '4', name: 'Nabil Bank', balance: 45000, frozen: false },
];

const CAPABILITIES = ['Voice', 'Text', 'Omni', 'RAG', 'Dialer', 'SIP'];

export default function ServicesMasterPage() {
  const [orgs, setOrgs] = useState(ORGS);

  const toggleFreeze = (id: string) => {
    setOrgs(orgs.map(o => o.id === id ? { ...o, frozen: !o.frozen } : o));
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-rose-500" /> Super Admin Overrides
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Master governance matrix for all organizations.</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md relative z-10">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search organizations..." 
              className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:border-rose-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="text-[10px] uppercase bg-slate-950/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Organization</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Balance</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                {CAPABILITIES.map(c => (
                   <th key={c} className="px-4 py-4 font-bold tracking-wider text-center">{c}</th>
                ))}
                <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-900/30">
              {orgs.map((org) => (
                <tr key={org.id} className={`hover:bg-white dark:bg-slate-800/50 transition-colors ${org.frozen ? 'bg-rose-500/5' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">{org.name}</div>
                    <div className="text-xs text-slate-500">ORG-{org.id.padStart(4, '0')}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-bold ${org.balance <= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      NPR {org.balance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {org.frozen ? (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-max mx-auto">
                        <Lock className="w-3 h-3" /> Frozen
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-max mx-auto">
                        <Unlock className="w-3 h-3" /> Active
                      </span>
                    )}
                  </td>
                  
                  {/* Capabilities Grid */}
                  {CAPABILITIES.map(c => (
                     <td key={c} className="px-4 py-4 text-center">
                       <div className={`w-3 h-3 rounded-full mx-auto ${org.frozen ? 'bg-slate-700' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                     </td>
                  ))}

                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleFreeze(org.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${
                        org.frozen 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-900 dark:text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                        : 'bg-rose-600 hover:bg-rose-500 text-slate-900 dark:text-white shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                      }`}
                    >
                      {org.frozen ? 'Unfreeze Org' : 'Force Freeze'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
