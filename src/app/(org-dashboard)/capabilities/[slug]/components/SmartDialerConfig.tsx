'use client';

import React from 'react';
import { PhoneForwarded, Settings2, BarChart2, Users, Sliders, Play, Pause, Save } from 'lucide-react';

export default function SmartDialerConfig() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden text-sm flex flex-col md:flex-row h-[750px]">
      <div className="w-full md:w-64 bg-slate-900 text-white shrink-0 p-6 flex flex-col">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8"><PhoneForwarded className="h-6 w-6 text-blue-400"/> Smart Dialer</h2>
        
        <div className="space-y-2 flex-1">
          <button className="w-full text-left px-4 py-3 bg-blue-600/20 text-blue-400 font-medium rounded-xl border border-blue-500/20">Dialer Engine</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-slate-800 rounded-xl transition-colors">AMD Settings</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-slate-800 rounded-xl transition-colors">Retry Policies</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-slate-800 rounded-xl transition-colors">DNC Lists</button>
        </div>

        <div className="p-4 bg-slate-800 rounded-xl mt-auto">
          <div className="text-xs text-gray-400 mb-1">Engine Status</div>
          <div className="flex items-center gap-2 font-bold text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            ACTIVE & DIALING
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
        <div className="p-8 border-b border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Predictive Engine Settings</h1>
            <p className="text-gray-500 mt-1">Manage concurrency and pacing algorithms.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg flex items-center gap-2"><Pause className="h-4 w-4"/> Pause Dialer</button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2"><Save className="h-4 w-4"/> Save Config</button>
          </div>
        </div>

        <div className="p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Live Channels</div>
                <BarChart2 className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900">142</div>
              <div className="text-sm text-green-600 mt-2">Optimal pacing</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Drop Rate</div>
                <Sliders className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900">1.2%</div>
              <div className="text-sm text-gray-500 mt-2">Target: &lt; 3.0%</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Available Agents</div>
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-4xl font-bold text-gray-900">45</div>
              <div className="text-sm text-gray-500 mt-2">Ready for transfer</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Dialing Algorithm Config</h3>
            
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Max Concurrency (Channels)</span>
                  <span className="text-blue-600 font-bold">200</span>
                </label>
                <input type="range" min="10" max="500" defaultValue="200" className="w-full accent-blue-600" />
                <p className="text-xs text-gray-500 mt-2">Maximum number of simultaneous outbound calls.</p>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>Dial Level (Calls per Agent)</span>
                  <span className="text-blue-600 font-bold">3.5</span>
                </label>
                <input type="range" min="1" max="10" step="0.5" defaultValue="3.5" className="w-full accent-blue-600" />
                <p className="text-xs text-gray-500 mt-2">How many numbers to dial concurrently per available agent.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded" />
                  <div>
                    <div className="font-medium text-gray-900">Answering Machine Detection (AMD)</div>
                    <div className="text-xs text-gray-500">Automatically hang up on voicemails and save agent time.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
