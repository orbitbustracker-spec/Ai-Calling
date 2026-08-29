'use client';

import React, { useState } from 'react';
import { Mic, Upload, Play, Clock, Users, Activity, Settings2, BarChart2, Volume2, CheckCircle2, Pause, Square, FileText, Download, ChevronDown, Check, PhoneOff, PhoneForwarded } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceBroadcastingConfig() {
  const [activeTab, setActiveTab] = useState('new');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full text-slate-900 dark:text-slate-200">
      
      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-white/10 mb-8 pb-4">
        <button 
          onClick={() => setActiveTab('new')}
          className={`flex items-center gap-2 font-semibold pb-4 -mb-4 transition-colors ${activeTab === 'new' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Mic className="w-4 h-4" /> New Broadcast
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 font-semibold pb-4 -mb-4 transition-colors ${activeTab === 'active' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <Activity className="w-4 h-4" /> Active Broadcasts <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold">1 LIVE</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 font-semibold pb-4 -mb-4 transition-colors ${activeTab === 'history' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          <BarChart2 className="w-4 h-4" /> History & Reports
        </button>
      </div>

      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Audio Source */}
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-indigo-500" /> 1. Audio Source
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4 cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-2 right-2"><CheckCircle2 className="w-5 h-5 text-indigo-500" /></div>
                  <Mic className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <div className="font-bold text-gray-900 dark:text-white">Text-to-Speech (AI)</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Generate natural voice from script</div>
                </div>
                
                <div className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl p-4 cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-slate-500 mb-3" />
                  <div className="font-bold text-gray-700 dark:text-slate-300">Upload Pre-recorded</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">MP3 or WAV files</div>
                </div>
              </div>

              {/* NEW: Voice Accent / Language Selector */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Voice Language</label>
                    <select className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none">
                      <option>English (US) - Professional</option>
                      <option>English (UK) - Formal</option>
                      <option>Nepali - Natural</option>
                      <option>Hindi - Conversational</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">AI Voice Actor</label>
                    <select className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none">
                      <option>Sophia (Female, Warm)</option>
                      <option>Ethan (Male, Confident)</option>
                      <option>Aarav (Male, Energetic)</option>
                      <option>Nisha (Female, Helpful)</option>
                    </select>
                 </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Message Script</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Hi {{first_name}}, this is an automated message from Voice Engine Hub..."
                  defaultValue="Hi {{first_name}}, we are calling to remind you about your upcoming appointment tomorrow."
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500 dark:text-slate-400">Available tags: {'{{first_name}}'}, {'{{last_name}}'}, {'{{company}}'}</div>
                  <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                    <Play className="w-3 h-3" /> Preview Audio
                  </button>
                </div>
              </div>
            </div>

            {/* Audience */}
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> 2. Target Audience
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-slate-950/50">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Q3 Renewals List</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Imported from HubSpot &bull; 1,240 Contacts</div>
                  </div>
                  <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    Change List
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: Interactive Workflows (DTMF) */}
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-500" /> Interactive Options (DTMF)
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Allow customers to press numbers on their keypad to trigger actions.</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-950/50 p-3 rounded-xl border border-gray-200 dark:border-white/10">
                   <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-slate-800 flex items-center justify-center font-black text-gray-700 dark:text-white">1</div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-gray-900 dark:text-white">Transfer to Live Agent</div>
                     <div className="text-xs text-gray-500 dark:text-slate-400">Connects to Sales Team</div>
                   </div>
                   <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-950/50 p-3 rounded-xl border border-gray-200 dark:border-white/10">
                   <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-slate-800 flex items-center justify-center font-black text-gray-700 dark:text-white">2</div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-gray-900 dark:text-white">Opt-out (DNC)</div>
                     <div className="text-xs text-gray-500 dark:text-slate-400">Add to Do Not Call registry</div>
                   </div>
                   <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                   </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Settings & Launch */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-500" /> 3. Broadcast Settings
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Caller ID</label>
                  <select className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none">
                    <option>Main Office (+1 800 555 0199)</option>
                    <option>Sales Line (+1 800 555 0188)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Concurrent Calls (Channels)</label>
                  <input type="range" min="1" max="100" defaultValue="25" className="w-full accent-indigo-600" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mt-1">
                    <span>1 (Safe)</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">25 Calls/sec</span>
                    <span>100 (Max)</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Answering Machine Detection</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-slate-300">Leave voicemail automatically</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-bold text-gray-700 dark:text-indigo-200">Estimated Cost</div>
                <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">Rs. 450.00</div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
                  <Play className="w-5 h-5" /> Launch Broadcast Now
                </button>
                <button className="w-full bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Clock className="w-5 h-5" /> Schedule for Later
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* NEW: Active Broadcasts Dashboard */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm relative overflow-hidden">
             
             {/* Progress Header */}
             <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="flex h-3 w-3 relative">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                     </span>
                     <h2 className="text-2xl font-black text-gray-900 dark:text-white">Q3 Renewals Campaign</h2>
                  </div>
                  <p className="text-gray-500 dark:text-slate-400">Running &bull; Started 15 mins ago</p>
                </div>
                
                {/* Pause/Stop Buttons */}
                <div className="flex gap-3">
                   <button 
                     onClick={() => setIsPaused(!isPaused)}
                     className="px-4 py-2 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold flex items-center gap-2 hover:bg-orange-200 dark:hover:bg-orange-500/20 transition-colors"
                   >
                     {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                     {isPaused ? 'Resume' : 'Pause'}
                   </button>
                   <button className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-bold flex items-center gap-2 hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors">
                     <Square className="w-4 h-4" fill="currentColor" /> Stop Campaign
                   </button>
                </div>
             </div>

             {/* Progress Bar */}
             <div className="mb-10 relative z-10">
                <div className="flex justify-between text-sm font-bold mb-2">
                   <span className="text-gray-900 dark:text-white">Progress: {isPaused ? 'Paused at ' : ''}65%</span>
                   <span className="text-gray-500 dark:text-slate-400">806 / 1,240 Contacts</span>
                </div>
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full bg-indigo-500 w-[65%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] ${isPaused ? '' : 'animate-pulse'}`}></div>
                </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-white/5 rounded-xl p-4">
                   <div className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Total Sent</div>
                   <div className="text-2xl font-black text-gray-900 dark:text-white">806</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-4">
                   <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1 flex items-center gap-1"><PhoneForwarded className="w-3 h-3" /> Answered</div>
                   <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">412 <span className="text-sm text-emerald-600/70 dark:text-emerald-500/70">(51%)</span></div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4">
                   <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1 flex items-center gap-1"><Mic className="w-3 h-3" /> Voicemail Drop</div>
                   <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400">301 <span className="text-sm text-indigo-600/70 dark:text-indigo-500/70">(37%)</span></div>
                </div>
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4">
                   <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1 flex items-center gap-1"><PhoneOff className="w-3 h-3" /> Failed / Busy</div>
                   <div className="text-2xl font-black text-red-700 dark:text-red-400">93 <span className="text-sm text-red-600/70 dark:text-red-500/70">(12%)</span></div>
                </div>
             </div>

          </div>
        </div>
      )}

      {/* NEW: History & Reports Dashboard */}
      {activeTab === 'history' && (
        <div className="space-y-6">
           
           <div className="flex justify-between items-center bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
             <div className="flex gap-4">
                <select className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 dark:text-slate-300 outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>All Time</option>
                </select>
                <div className="relative">
                   <input type="text" placeholder="Search campaign..." className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white outline-none w-64" />
                </div>
             </div>
             <button className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
               <Download className="w-4 h-4" /> Export CSV
             </button>
           </div>

           <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-slate-950/50 text-gray-500 dark:text-slate-400 uppercase font-bold text-xs border-b border-gray-200 dark:border-white/5">
                  <tr>
                    <th className="px-6 py-4">Campaign Name</th>
                    <th className="px-6 py-4">Date Run</th>
                    <th className="px-6 py-4">Recipients</th>
                    <th className="px-6 py-4">Success Rate</th>
                    <th className="px-6 py-4">Cost</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-slate-300">
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/30">
                     <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Summer Promo 2026</td>
                     <td className="px-6 py-4">Aug 25, 2026</td>
                     <td className="px-6 py-4">2,500</td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[92%]"></div></div>
                           <span className="text-emerald-600 dark:text-emerald-400 font-bold">92%</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 font-mono">Rs 45.00</td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View Log</button>
                     </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/30">
                     <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Q2 Feedback Survey</td>
                     <td className="px-6 py-4">Jul 10, 2026</td>
                     <td className="px-6 py-4">850</td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[85%]"></div></div>
                           <span className="text-emerald-600 dark:text-emerald-400 font-bold">85%</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 font-mono">Rs 15.30</td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View Log</button>
                     </td>
                  </tr>
                </tbody>
             </table>
           </div>

        </div>
      )}

    </div>
  );
}
