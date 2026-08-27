'use client';

import React, { useState } from 'react';
import { Mic, Upload, Play, Clock, Users, Activity, Settings2, BarChart2, Volume2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceBroadcastingConfig() {
  const [activeTab, setActiveTab] = useState('new');

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
          <Activity className="w-4 h-4" /> Active Broadcasts <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs">2</span>
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
            <div className="glass-card rounded-2xl p-6 shadow-sm">
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
            <div className="glass-card rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> 2. Target Audience
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-slate-950/50">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Q3 Renewals List</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Imported from HubSpot • 1,240 Contacts</div>
                  </div>
                  <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    Change List
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Settings & Launch */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 shadow-sm">
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

      {activeTab === 'active' && (
        <div className="p-12 text-center text-gray-500 dark:text-slate-400 font-medium">
          <Activity className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-50" />
          Live broadcast monitoring dashboard will be displayed here.
        </div>
      )}

    </div>
  );
}
