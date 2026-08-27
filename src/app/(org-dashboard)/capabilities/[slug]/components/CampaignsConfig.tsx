'use client';

import React, { useState } from 'react';
import { PhoneOutgoing, Users, Activity, Settings, BarChart3, Plus, Pause, Play, StopCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CAMPAIGNS = [
  { id: 1, name: 'Q3 Outbound Sales - US East', type: 'Predictive', status: 'Running', agents: 12, callsRinging: 34, connected: 8, dropRate: '2.1%' },
  { id: 2, name: 'Customer Success Renewals', type: 'Progressive', status: 'Paused', agents: 5, callsRinging: 0, connected: 0, dropRate: '0.0%' },
];

export default function CampaignsConfig() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="w-full text-slate-900 dark:text-slate-200">
      
      {/* Top Header / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('live')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'live' ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
          >
            Live Monitor
          </button>
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'campaigns' ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
          >
            All Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
          >
            Dialer Settings
          </button>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-colors">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {activeTab === 'live' && (
        <div className="space-y-6">
          
          {/* Global KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Active Agents</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between">
                17 <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Calls Ringing</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between relative z-10">
                34 <PhoneOutgoing className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Live Connections</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between">
                8 <Activity className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl" />
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Drop Rate (Today)</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between relative z-10">
                2.1% <BarChart3 className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Active Campaigns Table */}
          <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900/80">
              <h3 className="font-bold text-gray-900 dark:text-white">Active Campaigns Dashboard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 dark:bg-slate-950/50 text-gray-500 dark:text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-3">Campaign Name</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-center">Agents</th>
                    <th className="px-6 py-3 text-center">Ringing</th>
                    <th className="px-6 py-3 text-center">Connected</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {CAMPAIGNS.map(camp => (
                    <tr key={camp.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{camp.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 px-2 py-1 rounded text-xs font-bold uppercase">{camp.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold uppercase ${camp.status === 'Running' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {camp.status === 'Running' && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700 dark:text-slate-300">{camp.agents}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700 dark:text-slate-300">{camp.callsRinging}</td>
                      <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">{camp.connected}</td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        {camp.status === 'Running' ? (
                          <button className="p-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20 rounded-lg transition-colors" title="Pause">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 rounded-lg transition-colors" title="Start">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 rounded-lg transition-colors" title="Settings">
                          <Settings className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      )}

      {activeTab !== 'live' && (
        <div className="p-12 text-center text-gray-500 dark:text-slate-400 font-medium bg-white dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-white/10">
          <Settings className="w-12 h-12 text-indigo-500 mx-auto mb-4 opacity-50" />
          Settings panel for Predictive Dialer will be displayed here.
        </div>
      )}

    </div>
  );
}
