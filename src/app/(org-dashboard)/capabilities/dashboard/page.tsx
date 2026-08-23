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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Workspace Dashboard</h1>
          <p className="text-slate-400">Overview of your telephony infrastructure, recent activities, and requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technical Details (PBX/SIP) */}
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Network className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">SIP Trunk Status</div>
                <div className="text-lg font-bold text-white">Online (Registered)</div>
              </div>
            </div>
            <div className="text-sm text-slate-400 relative z-10"><span className="text-emerald-400">●</span> 12 Active Channels</div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Server className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">PBX System</div>
                <div className="text-lg font-bold text-white">Asterisk v20</div>
              </div>
            </div>
            <div className="text-sm text-slate-400 relative z-10">Cloud Hosted (V2)</div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">IP Base</div>
                <div className="text-lg font-bold text-white">103.245.X.X</div>
              </div>
            </div>
            <div className="text-sm text-slate-400 relative z-10">Static Gateway</div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
            <Megaphone className="w-5 h-5 text-indigo-400" /> Announcements
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
              <div className="text-sm font-bold text-indigo-300 mb-1">System Maintenance</div>
              <p className="text-xs text-slate-300">Scheduled downtime on Aug 25, 2AM-4AM for PBX upgrades.</p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
              <div className="text-sm font-bold text-indigo-300 mb-1">New Feature Alert</div>
              <p className="text-xs text-slate-300">Omnichannel Social Commerce is now live in your workspace!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Recent Calls */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-indigo-400" /> Recent Phone Calls
            </h3>
            <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
             <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-[10px] uppercase bg-slate-950/50 text-slate-500 border-b border-white/10 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3 font-bold">Contact</th>
                    <th className="px-6 py-3 font-bold">Type</th>
                    <th className="px-6 py-3 font-bold">Duration</th>
                    <th className="px-6 py-3 font-bold">Time</th>
                    <th className="px-6 py-3 font-bold text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {CALLS.map(call => (
                    <tr key={call.id} className="hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={() => setSelectedCall(call)}>
                      <td className="px-6 py-4 font-bold text-white">{call.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${call.type === 'inbound' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {call.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{call.duration}</td>
                      <td className="px-6 py-4 text-slate-400">{call.time}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-slate-500 group-hover:text-indigo-400 transition-colors"><ExternalLink className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-indigo-400" /> New Requests
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {REQUESTS.map(req => (
               <div key={req.id} className="bg-slate-950/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                 <div className="flex justify-between items-start mb-2">
                   <div className="font-bold text-slate-200 text-sm">{req.title}</div>
                   <div className="text-[10px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</div>
                 </div>
                 <div className="text-xs text-slate-400">From: <span className="font-bold text-slate-300">{req.user}</span></div>
                 <div className="mt-3 flex gap-2">
                   <button className="flex-1 bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 hover:bg-indigo-600/30 py-1.5 rounded-lg text-xs font-bold transition-colors">Accept</button>
                   <button className="flex-1 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300 py-1.5 rounded-lg text-xs font-bold transition-colors">Dismiss</button>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>

      {/* Call Details Modal */}
      <AnimatePresence>
        {selectedCall && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                <h3 className="text-lg font-bold text-white">Call Details</h3>
                <button onClick={() => setSelectedCall(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white mb-1">{selectedCall.name}</div>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-400">{selectedCall.type} Call</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-800 text-slate-400">{selectedCall.duration}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">AI Transcript / Chat History</h4>
                  <div className="bg-slate-950 rounded-xl p-4 border border-white/5 max-h-48 overflow-y-auto">
                    <p className="text-sm text-slate-400 leading-relaxed font-mono">
                      {selectedCall.transcript}
                    </p>
                  </div>
                </div>

                <button onClick={() => setSelectedCall(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
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
