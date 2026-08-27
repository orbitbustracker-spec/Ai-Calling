'use client';

import React, { useState } from 'react';
import { Network, Server, PhoneCall, CalendarCheck, Megaphone, Clock, Search, ExternalLink, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CALLS = [
  { id: '1', name: 'Rajan Koirala', type: 'inbound', duration: '2m 45s', status: 'Completed', time: '10:15 AM', transcript: 'Hello, I want to book an appointment for tomorrow. ...' },
  { id: '2', name: 'Sneh Raj', type: 'outbound', duration: '4m 10s', status: 'Completed', time: '09:42 AM', transcript: 'Hi, this is a reminder for your subscription renewal. ...' },
  { id: '3', name: 'Istuti', type: 'inbound', duration: '1m 20s', status: 'Voicemail', time: 'Yesterday', transcript: '(Voicemail): Please call me back regarding my internet issue.' },
];

const REQUESTS = [
  { id: '1', title: 'New Appointment Request', user: 'Bikash', time: '2 hours ago' },
  { id: '2', title: 'Callback Requested', user: 'Aashish', time: '5 hours ago' },
];

export default function DashboardPage() {
  const [selectedCall, setSelectedCall] = useState<any>(null);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Workspace Dashboard</h1>
          <p className="text-gray-500 dark:text-slate-400">Overview of your telephony infrastructure, recent activities, and requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technical Details (PBX/SIP) */}
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">SIP Trunk Status</div>
                <div className="text-lg font-black text-gray-900 dark:text-white leading-tight">Online</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">(Registered)</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-slate-400 relative z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              12 Active Channels
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">PBX System</div>
                <div className="text-lg font-black text-gray-900 dark:text-white leading-tight">Asterisk v20</div>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 dark:text-slate-400 relative z-10">
              Cloud Hosted (V2)
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">IP Base</div>
                <div className="text-lg font-black text-gray-900 dark:text-white leading-tight">103.245.X.X</div>
              </div>
            </div>
      {/* Core KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-4">SIP Trunk Status</h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">Online</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">(Registered)</div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Network className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 12 Active Channels
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-4">PBX System</h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-black text-gray-900 dark:text-white leading-tight">Asterisk v20</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-500 dark:text-slate-400 font-medium">Cloud Hosted (V2)</div>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 relative z-10">
            <Megaphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Announcements
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="bg-white/40 dark:bg-slate-950/30 rounded-xl p-4 border border-gray-100 dark:border-white/5">
              <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-1">System Maintenance</div>
              <p className="text-xs text-gray-600 dark:text-slate-300">Scheduled downtime on Aug 25, 2AM-4AM for PBX upgrades.</p>
            </div>
            <div className="bg-white/40 dark:bg-slate-950/30 rounded-xl p-4 border border-gray-100 dark:border-white/5">
              <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-1">New Feature Alert</div>
              <p className="text-xs text-gray-600 dark:text-slate-300">Omnichannel Social Commerce is now live in your workspace!</p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Recent Phone Calls */}
        <div className="lg:col-span-2 glass-card rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100/20 dark:border-white/10 flex justify-between items-center bg-white/20 dark:bg-slate-900/30 backdrop-blur-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Recent Phone Calls
            </h3>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
             <table className="w-full text-left text-sm text-gray-600 dark:text-slate-300">
                <thead className="text-[10px] uppercase bg-gray-100 dark:bg-slate-950/50 text-gray-500 dark:text-slate-500 border-b border-gray-200 dark:border-white/10 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3 font-bold">Contact</th>
                    <th className="px-6 py-3 font-bold">Type</th>
                    <th className="px-6 py-3 font-bold">Duration</th>
                    <th className="px-6 py-3 font-bold">Time</th>
                    <th className="px-6 py-3 font-bold text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {CALLS.map(call => (
                    <tr key={call.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={() => setSelectedCall(call)}>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{call.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${call.type === 'inbound' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>
                          {call.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{call.duration}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{call.time}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"><ExternalLink className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Requests & Tasks */}
        <div className="glass-card rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100/20 dark:border-white/10 bg-white/20 dark:bg-slate-900/30 backdrop-blur-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> New Requests
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {REQUESTS.map(req => (
               <div key={req.id} className="bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-white/5 rounded-xl p-4 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
                 <div className="flex justify-between items-start mb-2">
                   <div className="font-bold text-gray-900 dark:text-slate-200 text-sm">{req.title}</div>
                   <div className="text-[10px] text-gray-500 dark:text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</div>
                 </div>
                 <div className="text-xs text-gray-600 dark:text-slate-400">From: <span className="font-bold text-gray-900 dark:text-slate-300">{req.user}</span></div>
                 <div className="mt-3 flex gap-2">
                   <button className="flex-1 bg-indigo-100 text-indigo-700 border border-indigo-200 hover:bg-indigo-200 dark:bg-indigo-600/20 dark:text-indigo-400 dark:border-indigo-600/30 dark:hover:bg-indigo-600/30 py-1.5 rounded-lg text-xs font-bold transition-colors">Accept</button>
                   <button className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300 py-1.5 rounded-lg text-xs font-bold transition-colors">Dismiss</button>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>

      {/* Call Details Modal Overlay */}
      <AnimatePresence>
        {selectedCall && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 dark:bg-slate-950/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100/20 dark:border-white/10 flex justify-between items-center bg-white/20 dark:bg-slate-800/30">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Call Details</h3>
                <button onClick={() => setSelectedCall(null)} className="text-gray-400 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">o </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">{selectedCall.name}</div>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">{selectedCall.type} Call</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-400">{selectedCall.duration}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-gray-400 dark:text-slate-400" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 uppercase tracking-wider">AI Transcript / Chat History</h4>
                  <div className="bg-gray-50 dark:bg-slate-950 rounded-xl p-4 border border-gray-200 dark:border-white/5 max-h-48 overflow-y-auto">
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed font-mono">
                      {selectedCall.transcript}
                    </p>
                  </div>
                </div>

                <button onClick={() => setSelectedCall(null)} className="w-full bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-md dark:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
