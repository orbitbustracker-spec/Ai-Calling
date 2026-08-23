'use client';

import React from 'react';
import { Network, PhoneForwarded, PhoneIncoming, Route, Save, Plus } from 'lucide-react';
import { Button } from '@/components/Button';

export default function CallRoutingPage() {
  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
            <Route className="w-8 h-8 text-indigo-400" /> Transfers & Routing
          </h1>
          <p className="text-slate-400">Design the call flow for your inbound numbers.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10">
          <Save className="w-5 h-5" /> Save Flow
        </Button>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 flex-1 flex items-center justify-center relative overflow-hidden">
        
        {/* Simple Flow Visualization */}
        <div className="flex flex-col items-center gap-8 max-w-lg w-full relative z-10">
          
          <div className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 flex items-center gap-4 text-white">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <PhoneIncoming className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Inbound Call Trigger</div>
              <div className="font-bold">Any DID Number</div>
            </div>
          </div>

          <div className="h-8 border-l-2 border-dashed border-slate-700" />

          <div className="w-full bg-slate-900 border-2 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.2)] rounded-xl p-4 flex items-center justify-between text-white">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                 <Network className="w-5 h-5 text-indigo-400" />
               </div>
               <div>
                 <div className="text-xs font-bold text-indigo-400 uppercase">AI Receptionist (Step 1)</div>
                 <div className="font-bold">Greeting & Intent Recognition</div>
               </div>
             </div>
             <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
          </div>

          <div className="h-8 border-l-2 border-dashed border-slate-700" />

          <div className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 flex items-center justify-between text-white">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                 <PhoneForwarded className="w-5 h-5 text-slate-400" />
               </div>
               <div>
                 <div className="text-xs font-bold text-slate-400 uppercase">Transfer Rules (Step 2)</div>
                 <div className="font-bold">"Sales" &rarr; Ext 101</div>
                 <div className="text-xs text-slate-400 font-mono">Fallback: Voicemail</div>
               </div>
             </div>
             <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
          </div>

          <button className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all mt-4 shadow-xl">
             <Plus className="w-5 h-5" />
          </button>

        </div>

      </div>

    </div>
  );
}
