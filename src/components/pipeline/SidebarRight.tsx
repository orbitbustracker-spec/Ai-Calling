'use client';

import React from 'react';
import { Settings, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/Button';

export function SidebarRight({ selectedNode, onCallClick }: { selectedNode: any, onCallClick: () => void }) {
  
  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10">
        <h2 className="text-lg font-bold text-white mb-2">Properties</h2>
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-sm text-slate-500">Select a node on the canvas to view and edit its properties.</p>
        </div>
      </div>
    );
  }

  const { data } = selectedNode;

  return (
    <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-800 rounded-lg text-slate-300">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{data.label}</h2>
          <p className="text-xs text-slate-400">Node Configuration</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Generic Property */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Node Name</label>
          <input 
            type="text" 
            defaultValue={data.label}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
          <textarea 
            defaultValue={data.sublabel}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
          />
        </div>

        {/* Conditional Properties based on Node Type */}
        {data.icon === 'phone' && (
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-indigo-400 flex items-center gap-2">
              <Phone className="w-4 h-4" /> AI Voice Caller
            </h3>
            <p className="text-xs text-slate-300">This node will initiate an outbound AI phone call to the prospect.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Select AI Agent</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Sales Representative (Sarah)</option>
                <option>Customer Support (John)</option>
              </select>
            </div>

            <Button onClick={onCallClick} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Open Dialer
            </Button>
          </div>
        )}

        {data.icon === 'whatsapp' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-green-400 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp Message
            </h3>
            <p className="text-xs text-slate-300">This node will send a WhatsApp template message.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Message Template</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Welcome Message</option>
                <option>Follow Up</option>
                <option>Meeting Reminder</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
