'use client';

import { useState } from 'react';
import { Headphones, Mic, Zap, PhoneOff, Activity, Settings, Users, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Button';

// Dummy data for visual representation
const ACTIVE_CALLS = [
  { id: 'c1', agent: 'Rajesh K.', customer: '+977 9801234567', duration: '04:12', status: 'Active' },
  { id: 'c2', agent: 'Anita S.', customer: '+1 415 555 0198', duration: '01:45', status: 'Whispering' },
  { id: 'c3', agent: 'Suman R.', customer: '+44 20 7946 0958', duration: '12:30', status: 'Active' },
];

export default function ThreeWayCallingConfig() {
  const [autoRecord, setAutoRecord] = useState(true);
  const [playTone, setPlayTone] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Mock action handler
  const handleAction = (action: string, agent: string) => {
    setSelectedAction(`${action} activated for ${agent}`);
    setTimeout(() => setSelectedAction(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Active Calls</p>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-500" />
              {ACTIVE_CALLS.length}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Intercepts Today</p>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-500" />
              8
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">SIP/WebRTC Latency</p>
            <div className="flex items-center gap-3 mt-1">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">18ms</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Configuration Panel */}
        <div className="xl:col-span-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Settings className="w-5 h-5 text-indigo-500" />
            Config Settings
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Auto-record on Intercept</p>
                <p className="text-xs text-gray-500">Automatically start recording when a supervisor barges in.</p>
              </div>
              <button 
                onClick={() => setAutoRecord(!autoRecord)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${autoRecord ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${autoRecord ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Whisper Notification</p>
                <p className="text-xs text-gray-500">Play a subtle tone to the agent during Whisper Coaching.</p>
              </div>
              <button 
                onClick={() => setPlayTone(!playTone)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${playTone ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${playTone ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {selectedAction && (
            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-lg flex items-center gap-2 animate-in fade-in zoom-in duration-300">
              <Check className="w-4 h-4 flex-shrink-0" />
              {selectedAction}
            </div>
          )}
        </div>

        {/* Live Call Control Room Table */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              Live Call Control Room
            </h3>
            <p className="text-sm text-gray-500 mt-1">Monitor, whisper, or intercept live ongoing calls.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-950 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Agent</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Mode</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {ACTIVE_CALLS.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 dark:text-white">{call.agent}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300 font-mono">{call.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{call.duration}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                        ${call.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                          call.status === 'Whispering' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 
                          'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'}
                      `}>
                        {call.status === 'Whispering' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleAction('Silent Monitor', call.agent)}
                          title="Monitor (Listen only)"
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-lg transition-colors border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30"
                        >
                          <Headphones className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAction('Whisper Coaching', call.agent)}
                          title="Whisper Coaching"
                          className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/20 rounded-lg transition-colors border border-transparent hover:border-amber-100 dark:hover:border-amber-500/30"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAction('Barge-in', call.agent)}
                          title="Intercept / Barge"
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/20 rounded-lg transition-colors border border-transparent hover:border-purple-100 dark:hover:border-purple-500/30"
                        >
                          <Zap className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 self-center"></div>
                        <button 
                          onClick={() => handleAction('Call Dropped', call.agent)}
                          title="Drop Call"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-500/30"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
}
