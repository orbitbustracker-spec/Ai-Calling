'use client';

import React, { useState } from 'react';
import { PhoneOutgoing, Users, Activity, Settings, BarChart3, Plus, Pause, Play, StopCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CAMPAIGNS = [
  { id: 1, name: 'Q3 Outbound Sales - US East', type: 'Predictive', status: 'Running', agents: 12, callsRinging: 34, connected: 8, dropRate: '2.1%' },
  { id: 2, name: 'Customer Success Renewals', type: 'Progressive', status: 'Paused', agents: 5, callsRinging: 0, connected: 0, dropRate: '0.0%' },
];

export default function CampaignsConfig() {
  const [activeTab, setActiveTab] = useState('live');
  const [showCreateModal, setShowCreateModal] = useState(false);

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
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {activeTab === 'live' && (
        <div className="space-y-6">
          
          {/* Global KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Active Agents</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between">
                17 <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Calls Ringing</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between relative z-10">
                34 <PhoneOutgoing className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Live Connections</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between">
                8 <Activity className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <div className="glass-card rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl" />
              <div className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase">Drop Rate (Today)</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-2 flex items-center justify-between relative z-10">
                2.1% <BarChart3 className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Active Campaigns Table */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
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

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-950/50">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Campaign</h2>
               <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
               <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Campaign Name</label>
                  <input type="text" placeholder="e.g. Q4 Black Friday Promo" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-indigo-500" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Dialer Type</label>
                    <select className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-indigo-500">
                      <option>Predictive (AI-paced)</option>
                      <option>Progressive (1-to-1)</option>
                      <option>Preview (Manual)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Agent Group</label>
                    <select className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-indigo-500">
                      <option>Sales Team (East)</option>
                      <option>Support Tier 1</option>
                      <option>Renewals Squad</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Contact List (Lead Source)</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 text-center bg-gray-50 dark:bg-slate-950/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors">
                     <Users className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                     <div className="font-bold text-gray-900 dark:text-white">Upload CSV or Select CRM Segment</div>
                     <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Supports mapped HubSpot lists and direct imports.</p>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 flex justify-end gap-3">
               <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 font-bold rounded-xl text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors">Cancel</button>
               <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors">Launch Campaign</button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
