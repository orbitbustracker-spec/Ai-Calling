'use client';

import React, { useState } from 'react';
import { Network, PhoneForwarded, PhoneIncoming, Route, Save, Plus, Clock, Settings, X } from 'lucide-react';
import { Button } from '@/components/Button';

export default function CallRoutingPage() {
  const [nodes, setNodes] = useState(['trigger', 'ai', 'transfer']);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [transferSettings, setTransferSettings] = useState({
    fallback: 'Voicemail',
    smsLink: 'https://mysite.com/support'
  });

  const handleAddNode = () => {
    if (!nodes.includes('business_hours')) {
      // Insert before transfer
      setNodes(['trigger', 'business_hours', 'ai', 'transfer']);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert("Dialplan synced successfully with Asterisk PBX API.");
      setIsSaving(false);
    }, 1500);
  };

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
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className={`${isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10 transition-colors`}
        >
          <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} /> 
          {isSaving ? 'Syncing...' : 'Save Flow'}
        </Button>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 flex-1 flex items-center justify-center relative overflow-hidden">
        
        {/* Simple Flow Visualization */}
        <div className="flex flex-col items-center gap-8 max-w-lg w-full relative z-10">
          
          {nodes.map((node, index) => (
            <React.Fragment key={node}>
              
              {node === 'trigger' && (
                <div className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 flex items-center gap-4 text-white">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                    <PhoneIncoming className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Inbound Call Trigger</div>
                    <div className="font-bold">Any DID Number</div>
                  </div>
                </div>
              )}

              {node === 'business_hours' && (
                <div className="w-full bg-slate-900 border-2 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.15)] rounded-xl p-4 flex items-center justify-between text-white animate-in zoom-in duration-300">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                       <Clock className="w-5 h-5 text-orange-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-orange-400 uppercase">Condition</div>
                       <div className="font-bold">Business Hours</div>
                       <div className="text-xs text-slate-400 font-mono">9 AM - 5 PM (EST)</div>
                     </div>
                   </div>
                   <button onClick={() => setEditingNode('business_hours')} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {node === 'ai' && (
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
                   <button onClick={() => setEditingNode('ai')} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {node === 'transfer' && (
                <div className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl p-4 flex items-center justify-between text-white">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                       <PhoneForwarded className="w-5 h-5 text-slate-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-slate-400 uppercase">Transfer Rules (Step 2)</div>
                       <div className="font-bold">"Sales" &rarr; Ext 101</div>
                       <div className="text-xs text-slate-400 font-mono">Fallback: {transferSettings.fallback}</div>
                     </div>
                   </div>
                   <button onClick={() => setEditingNode('transfer')} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {index < nodes.length - 1 && (
                <div className="h-8 border-l-2 border-dashed border-slate-700" />
              )}
            </React.Fragment>
          ))}

          {!nodes.includes('business_hours') && (
            <>
              <div className="h-8 border-l-2 border-dashed border-slate-700" />
              <button onClick={handleAddNode} className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-xl">
                 <Plus className="w-5 h-5" />
              </button>
            </>
          )}

        </div>

      </div>

      {/* Editing Modals */}
      {editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white capitalize">Edit {editingNode.replace('_', ' ')}</h2>
              <button onClick={() => setEditingNode(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {editingNode === 'transfer' && (
              <div className="space-y-4">
                 <div>
                   <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Fallback Action (No Answer)</label>
                   <select 
                     value={transferSettings.fallback} 
                     onChange={(e) => setTransferSettings({...transferSettings, fallback: e.target.value})}
                     className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                   >
                     <option>Voicemail</option>
                     <option>Send SMS Link</option>
                     <option>Transfer to Manager</option>
                   </select>
                 </div>
                 {transferSettings.fallback === 'Send SMS Link' && (
                   <div>
                     <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">SMS Link / Message</label>
                     <input 
                       type="text" 
                       value={transferSettings.smsLink}
                       onChange={(e) => setTransferSettings({...transferSettings, smsLink: e.target.value})}
                       className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                     />
                   </div>
                 )}
                 <Button onClick={() => setEditingNode(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl mt-4">
                   Save Configuration
                 </Button>
              </div>
            )}

            {editingNode === 'business_hours' && (
              <div className="space-y-4 text-sm text-slate-300">
                 <p>Configure open hours. Outside of these hours, calls will immediately route to Voicemail.</p>
                 <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                   <span>Monday - Friday</span>
                   <span className="font-mono text-white">09:00 AM - 05:00 PM</span>
                 </div>
                 <Button onClick={() => setEditingNode(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl mt-4">
                   Done
                 </Button>
              </div>
            )}
            
            {editingNode === 'ai' && (
              <div className="space-y-4 text-sm text-slate-300">
                 <div>
                   <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">IVR / Keypad Fallback</label>
                   <p className="mb-3 text-xs">If intent recognition fails, present these options:</p>
                   <div className="space-y-2">
                     <div className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white">1</span> <span>Sales (Ext 101)</span></div>
                     <div className="flex items-center gap-3"><span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white">2</span> <span>Support (Ext 102)</span></div>
                   </div>
                 </div>
                 <Button onClick={() => setEditingNode(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl mt-4">
                   Done
                 </Button>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}
