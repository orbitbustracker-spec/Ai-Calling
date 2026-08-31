'use client';

import React, { useState, useEffect } from 'react';
import { Network, Server, PhoneCall, Megaphone, Activity, Info, CheckCircle2 } from 'lucide-react';

function timeAgo(dateParam: string | Date) {
  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const seconds = Math.round((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return \\m ago\;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return \\h ago\;
  return \\d ago\;
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/org/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const { trunks = [], recentCalls = [], org } = data || {};
  const hasTrunks = trunks.length > 0;

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{org?.name || 'Workspace'} Dashboard</h1>
          <p 
            className="text-slate-500 dark:text-slate-400 flex items-center gap-2 group w-max"
          >
            Overview of your telephony infrastructure, recent activities, and calls.
            <Info className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technical Details (PBX/SIP) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={\p-6 rounded-2xl border \\}>
             <div className="flex items-center gap-3 mb-2">
               <Network className={\w-6 h-6 \\} />
               <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SIP Trunk Status</h3>
             </div>
             <p className={\	ext-2xl font-black \\}>
               {hasTrunks ? 'Online' : 'Offline'}
             </p>
             <p className={\	ext-sm font-semibold \\}>
               {hasTrunks ? \\ Active Trunk(s)\ : 'No Trunks Configured'}
             </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
             <div className="flex items-center gap-3 mb-2">
               <Server className="w-6 h-6 text-indigo-500" />
               <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Voice Engine</h3>
             </div>
             <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
               Nexus v2.0
             </p>
             <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
               AI Native Platform
             </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
             <div className="flex items-center gap-3 mb-2">
               <Activity className="w-6 h-6 text-amber-500" />
               <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Calls</h3>
             </div>
             <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
               {recentCalls.length}
             </p>
             <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
               Recent interactions
             </p>
          </div>
        </div>

        {/* Announcements Panel */}
        <div className="lg:col-span-1 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">Announcements</h2>
          </div>
          
          <div className="space-y-3 flex-1">
             <div className="bg-white/60 dark:bg-slate-950/40 p-4 rounded-xl border border-white/50 dark:border-white/5 backdrop-blur-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">New Feature Alert</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Omnichannel Social Commerce is now live in your workspace! Connect WhatsApp and Facebook to automate messages.</p>
             </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Recent Calls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Phone Calls</h2>
            </div>
            <a href="/capabilities/call-management" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">View All</a>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {recentCalls.length === 0 ? (
               <div className="p-8 text-center text-slate-500">No calls found in this organization.</div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {recentCalls.map((call: any) => (
                  <div key={call.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={\w-10 h-10 rounded-full flex items-center justify-center \\}>
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm">{call.toNumber || call.fromNumber || 'Unknown'}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="uppercase font-semibold tracking-wider">{call.direction}</span>
                          <span>•</span>
                          <span>{call.durationSeconds}s</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className={\	ext-xs font-bold px-2 py-1 rounded-md \\}>
                         {call.status}
                       </span>
                       <p className="text-[10px] text-slate-400 mt-1">{timeAgo(call.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trunks Configuration */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active SIP Trunks</h2>
            </div>
            <a href="/capabilities/extensions" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">Manage</a>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {trunks.length === 0 ? (
               <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                 <Network className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
                 <p>No SIP Trunks configured.</p>
                 <a href="/capabilities/extensions" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Add Trunk</a>
               </div>
            ) : (
              <div className="p-4 space-y-3">
                 {trunks.map((trunk: any) => (
                    <div key={trunk.id} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-between">
                       <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">{trunk.providerLabel}</h4>
                         <p className="text-xs text-slate-500 font-mono mt-1">{trunk.host}</p>
                       </div>
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
