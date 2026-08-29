'use client';

import React, { useState } from 'react';
import { PhoneForwarded, Settings2, BarChart2, Users, Sliders, Play, Pause, Save, HardDrive, ListX, UploadCloud, RefreshCw, Plus } from 'lucide-react';

export default function SmartDialerConfig() {
  const [activeSection, setActiveSection] = useState('engine');
  const [isPaused, setIsPaused] = useState(false);
  const [pacingMode, setPacingMode] = useState('predictive');
  const [amdSensitivity, setAmdSensitivity] = useState(1500);

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden text-sm flex flex-col md:flex-row h-[800px] shadow-sm">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white shrink-0 p-6 flex flex-col">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8 text-white"><PhoneForwarded className="h-6 w-6 text-indigo-400"/> Smart Dialer</h2>
        
        <div className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveSection('engine')}
            className={`w-full text-left px-4 py-3 font-medium rounded-xl border transition-colors ${activeSection === 'engine' ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20' : 'border-transparent text-gray-400 hover:bg-slate-800'}`}
          >
            Dialer Engine
          </button>
          <button 
            onClick={() => setActiveSection('amd')}
            className={`w-full text-left px-4 py-3 font-medium rounded-xl border transition-colors ${activeSection === 'amd' ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20' : 'border-transparent text-gray-400 hover:bg-slate-800'}`}
          >
            AMD Settings
          </button>
          <button 
            onClick={() => setActiveSection('retry')}
            className={`w-full text-left px-4 py-3 font-medium rounded-xl border transition-colors ${activeSection === 'retry' ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20' : 'border-transparent text-gray-400 hover:bg-slate-800'}`}
          >
            Retry Policies
          </button>
          <button 
            onClick={() => setActiveSection('dnc')}
            className={`w-full text-left px-4 py-3 font-medium rounded-xl border transition-colors ${activeSection === 'dnc' ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/20' : 'border-transparent text-gray-400 hover:bg-slate-800'}`}
          >
            DNC Lists
          </button>
        </div>

        <div className="p-4 bg-slate-800 rounded-xl mt-auto border border-white/5">
          <div className="text-xs text-gray-400 mb-1">Engine Status</div>
          <div className={`flex items-center gap-2 font-bold ${isPaused ? 'text-orange-400' : 'text-emerald-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-orange-400' : 'bg-emerald-400 animate-pulse'}`}></span>
            {isPaused ? 'PAUSED' : 'ACTIVE & DIALING'}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900/30 flex flex-col relative">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeSection === 'engine' && 'Predictive Engine Settings'}
              {activeSection === 'amd' && 'Answering Machine Detection (AMD)'}
              {activeSection === 'retry' && 'Call Retry Policies'}
              {activeSection === 'dnc' && 'Do Not Call (DNC) Management'}
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              {activeSection === 'engine' && 'Manage concurrency, pacing algorithms, and dialing modes.'}
              {activeSection === 'amd' && 'Configure sensitivity thresholds and automated voicemail drops.'}
              {activeSection === 'retry' && 'Define rules for redialing busy or failed numbers.'}
              {activeSection === 'dnc' && 'Manage compliance lists and sync with National DNC APIs.'}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-4 py-2 font-bold rounded-xl flex items-center gap-2 transition-colors ${isPaused ? 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/20' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20'}`}
            >
              {isPaused ? <Play className="h-4 w-4"/> : <Pause className="h-4 w-4"/>} 
              {isPaused ? 'Resume Dialer' : 'Pause Dialer'}
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm">
              <Save className="h-4 w-4"/> Save Config
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8 flex-1">
          
          {/* SECTION: ENGINE */}
          {activeSection === 'engine' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Live Channels</div>
                    <BarChart2 className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white">142</div>
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">Optimal pacing</div>
                </div>
                
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Drop Rate</div>
                    <Sliders className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white">1.2%</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-slate-400 mt-2">Target: &lt; 3.0%</div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Available Agents</div>
                    <Users className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white">45</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-slate-400 mt-2">Ready for transfer</div>
                </div>
              </div>

              {/* Mode Selector */}
              <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Pacing Mode</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Predictive', 'Power', 'Progressive', 'Preview'].map((mode) => (
                      <div 
                        key={mode} 
                        onClick={() => setPacingMode(mode.toLowerCase())}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${pacingMode === mode.toLowerCase() ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 hover:border-indigo-300 dark:hover:border-indigo-500/50'}`}
                      >
                         <div className="font-bold text-gray-900 dark:text-white mb-1">{mode}</div>
                         <div className="text-xs text-gray-500 dark:text-slate-400">
                           {mode === 'Predictive' && 'Uses AI to predict agent availability and drop rate limits.'}
                           {mode === 'Power' && 'Dials a fixed number of lines per available agent.'}
                           {mode === 'Progressive' && 'Dials exactly one line per available agent.'}
                           {mode === 'Preview' && 'Agent reviews contact before initiating dial.'}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Algorithms */}
              <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Dialing Algorithm Config</h3>
                
                <div className="space-y-8 max-w-2xl">
                  <div>
                    <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-slate-300 mb-4">
                      <span>Max Concurrency (Channels)</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">200</span>
                    </label>
                    <input type="range" min="10" max="500" defaultValue="200" className="w-full accent-indigo-600 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-2">Maximum number of simultaneous outbound calls across the SIP trunk.</p>
                  </div>

                  <div>
                    <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-slate-300 mb-4">
                      <span>Dial Level (Calls per Agent)</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">3.5</span>
                    </label>
                    <input type="range" min="1" max="10" step="0.5" defaultValue="3.5" className="w-full accent-indigo-600 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-2">How many numbers to dial concurrently per available agent.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SECTION: AMD */}
          {activeSection === 'amd' && (
            <div className="space-y-6">
               <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-indigo-500" /> Detection Engine
                  </h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-white/10 rounded-xl mb-6">
                     <div>
                       <div className="font-bold text-gray-900 dark:text-white">Enable AMD</div>
                       <div className="text-xs text-gray-500 dark:text-slate-400">Analyze the first few seconds of audio to detect voicemails.</div>
                     </div>
                     <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                     </div>
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    <div>
                      <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-slate-300 mb-4">
                        <span>Audio Detection Threshold (Sensitivity)</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-black">{amdSensitivity} ms</span>
                      </label>
                      <input 
                        type="range" min="500" max="3000" step="100" 
                        value={amdSensitivity} 
                        onChange={(e) => setAmdSensitivity(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                      />
                      <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-slate-400 mt-2">
                         <span>Faster (More false positives)</span>
                         <span>Accurate (Longer delay)</span>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-indigo-500" /> Machine Detected Action
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <label className="flex items-start gap-3 p-4 border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl cursor-pointer">
                        <input type="radio" name="amdAction" defaultChecked className="mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">Drop Call (Hangup)</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Immediately hang up to save agent time and port usage.</div>
                        </div>
                     </label>
                     <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <input type="radio" name="amdAction" className="mt-1" />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">Play Pre-recorded Message</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Wait for beep and play a custom voicemail drop audio file.</div>
                        </div>
                     </label>
                  </div>
               </div>
            </div>
          )}

          {/* SECTION: RETRY POLICIES */}
          {activeSection === 'retry' && (
            <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-indigo-500" /> Retry Matrix
                  </h3>
                  <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                    <Plus className="w-4 h-4" /> Add Custom Rule
                  </button>
               </div>
               
               <table className="w-full text-left text-sm">
                  <thead className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-slate-400 uppercase font-bold text-xs">
                    <tr>
                      <th className="px-6 py-4">Call Status / Outcome</th>
                      <th className="px-6 py-4">Time Interval</th>
                      <th className="px-6 py-4">Max Retries</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-gray-900 dark:text-white">
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold">Busy</td>
                      <td className="px-6 py-4">
                         <select className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium">
                           <option>15 Minutes</option>
                           <option>30 Minutes</option>
                           <option>1 Hour</option>
                         </select>
                      </td>
                      <td className="px-6 py-4">
                         <input type="number" defaultValue="3" className="w-16 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium" />
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold">No Answer</td>
                      <td className="px-6 py-4">
                         <select className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium">
                           <option>2 Hours</option>
                           <option>4 Hours</option>
                           <option>Next Day</option>
                         </select>
                      </td>
                      <td className="px-6 py-4">
                         <input type="number" defaultValue="2" className="w-16 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium" />
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold">Voicemail</td>
                      <td className="px-6 py-4">
                         <select className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium text-gray-400" disabled>
                           <option>None (Do Not Retry)</option>
                         </select>
                      </td>
                      <td className="px-6 py-4">
                         <input type="number" defaultValue="0" disabled className="w-16 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1.5 outline-none font-medium text-gray-400" />
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Disabled</span>
                      </td>
                    </tr>
                  </tbody>
               </table>
            </div>
          )}

          {/* SECTION: DNC LISTS */}
          {activeSection === 'dnc' && (
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col items-center justify-center text-center h-48 border-dashed">
                     <UploadCloud className="w-8 h-8 text-gray-400 dark:text-slate-500 mb-3" />
                     <div className="font-bold text-gray-900 dark:text-white mb-1">Upload CSV</div>
                     <div className="text-xs text-gray-500 dark:text-slate-400 mb-4">Import custom Do-Not-Call numbers</div>
                     <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 font-bold rounded-lg transition-colors text-gray-900 dark:text-white">Browse Files</button>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col items-center justify-center text-center h-48 border-dashed">
                     <ListX className="w-8 h-8 text-gray-400 dark:text-slate-500 mb-3" />
                     <div className="font-bold text-gray-900 dark:text-white mb-1">Manual Entry</div>
                     <div className="text-xs text-gray-500 dark:text-slate-400 mb-4">Add numbers one by one</div>
                     <button className="px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 font-bold rounded-lg transition-colors text-gray-900 dark:text-white">Add Number</button>
                  </div>
               </div>

               <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">National DNC API Sync</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">Automatically screen outbound numbers against the Federal Trade Commission (FTC) National Do Not Call Registry.</p>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-white/10 rounded-xl">
                     <div>
                       <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">US National DNC Registry <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">Synced</span></div>
                       <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Last synced: Today at 2:00 AM</div>
                     </div>
                     <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
