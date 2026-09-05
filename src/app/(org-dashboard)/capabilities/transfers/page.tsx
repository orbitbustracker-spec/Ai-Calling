'use client';

import React, { useState, useEffect } from 'react';
import { Network, PhoneForwarded, PhoneIncoming, Route, Save, Plus, Clock, Settings, X, ServerCrash } from 'lucide-react';
import { Button } from '@/components/Button';
import { toast } from 'react-hot-toast';

export default function CallRoutingPage() {
  const [nodes, setNodes] = useState(['trigger', 'ai', 'transfer']);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State from DB
  const [orgId, setOrgId] = useState('');
  const [businessHours, setBusinessHours] = useState({ start: '09:00', end: '17:00' });
  const [afterHoursTarget, setAfterHoursTarget] = useState('Voicemail');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8);
  const [fallbackTarget, setFallbackTarget] = useState('Voicemail');

  useEffect(() => {
    fetch('/api/org/routing/get')
      .then(res => res.json())
      .then(data => {
        if (data.org) {
          setOrgId(data.org.id);
          if (data.org.businessHours) {
            setBusinessHours(data.org.businessHours);
            if (!nodes.includes('business_hours')) {
              setNodes(['trigger', 'business_hours', 'ai', 'transfer']);
            }
          }
          if (data.org.afterHoursTarget) setAfterHoursTarget(data.org.afterHoursTarget);
        }
        if (data.agents && data.agents.length > 0) {
          setConfidenceThreshold(data.agents[0].confidenceThreshold ?? 0.8);
          setFallbackTarget(data.agents[0].fallbackTarget ?? 'Voicemail');
        }
        setLoading(false);
      });
  }, []);

  const handleAddNode = () => {
    if (!nodes.includes('business_hours')) {
      setNodes(['trigger', 'business_hours', 'ai', 'transfer']);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/org/routing/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: orgId,
          businessHours: nodes.includes('business_hours') ? businessHours : null,
          afterHoursTarget,
          fallbackTarget,
          confidenceThreshold
        })
      });
      if (res.ok) {
        toast.success('Routing config saved');
      } else {
        toast.error('Failed to save config');
      }
    } catch (e) {
      toast.error('Error saving');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Configuration...</div>;

  return (
    <div className="p-4 lg:p-8 h-full overflow-y-auto w-full relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Call Routing & Transfers</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Configure advanced routing, business hours, and AI handoff logic.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Pipeline'}
          </Button>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="relative pl-8 xl:pl-24 space-y-8 pb-32">
          {nodes.map((node, index) => (
            <React.Fragment key={node}>
              {node === 'trigger' && (
                <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
                       <PhoneIncoming className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Incoming Call</div>
                       <div className="font-bold text-slate-900 dark:text-white">Main Company Number</div>
                     </div>
                   </div>
                </div>
              )}

              {node === 'business_hours' && (
                <div className="w-full bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-500/50 rounded-xl p-4 flex items-center justify-between text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.1)] relative">
                   <button onClick={() => setNodes(nodes.filter(n => n !== 'business_hours'))} className="absolute -top-3 -right-3 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                     <X className="w-3 h-3" />
                   </button>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
                       <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Condition Node</div>
                       <div className="font-bold">Business Hours Check</div>
                       <div className="text-xs text-slate-500 dark:text-slate-400">Open {businessHours.start} - {businessHours.end} • Off-hours: {afterHoursTarget}</div>
                     </div>
                   </div>
                   <button onClick={() => setEditingNode('business_hours')} className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {node === 'ai' && (
                <div className="w-full bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-500/50 shadow-md dark:shadow-[0_0_15px_rgba(79,70,229,0.2)] rounded-xl p-4 flex items-center justify-between text-slate-900 dark:text-white">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center">
                       <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">AI Receptionist</div>
                       <div className="font-bold">Greeting & Intent Recognition</div>
                       <div className="text-xs text-slate-500 dark:text-slate-400">Handoff below {Math.round(confidenceThreshold * 100)}% confidence</div>
                     </div>
                   </div>
                   <button onClick={() => setEditingNode('ai')} className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {node === 'transfer' && (
                <div className="w-full bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between text-slate-900 dark:text-white shadow-sm dark:shadow-none">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                       <PhoneForwarded className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                     </div>
                     <div>
                       <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Fallback Transfer Rules</div>
                       <div className="font-bold">Destination: {fallbackTarget}</div>
                     </div>
                   </div>
                   <button onClick={() => setEditingNode('transfer')} className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-1 rounded font-bold transition-colors">Edit</button>
                </div>
              )}

              {index < nodes.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 dark:bg-slate-700 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full text-slate-400 dark:text-slate-500 font-bold border border-gray-200 dark:border-slate-700 uppercase">Then</div>
                </div>
              )}
            </React.Fragment>
          ))}

          {!nodes.includes('business_hours') && (
            <div className="absolute top-1/2 -translate-y-1/2 left-4 xl:-left-12">
              <button 
                onClick={handleAddNode}
                className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors shadow-sm border border-indigo-100 dark:border-indigo-500/30"
                title="Add Business Hours Check"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white capitalize">Edit {editingNode.replace('_', ' ')}</h2>
              <button onClick={() => setEditingNode(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {editingNode === 'business_hours' && (
              <div className="space-y-4 text-sm text-slate-300">
                 <p>Configure open hours. Outside of these hours, calls will immediately route to the fallback destination.</p>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Open Time</label>
                     <input type="time" value={businessHours.start} onChange={(e) => setBusinessHours({...businessHours, start: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
                   </div>
                   <div>
                     <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Close Time</label>
                     <input type="time" value={businessHours.end} onChange={(e) => setBusinessHours({...businessHours, end: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none" />
                   </div>
                 </div>
                 <div>
                   <label className="text-xs text-slate-400 uppercase font-bold mb-2 block mt-4">After Hours Action</label>
                   <select 
                     value={afterHoursTarget} 
                     onChange={(e) => setAfterHoursTarget(e.target.value)}
                     className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                   >
                     <option>Voicemail</option>
                     <option>Ext 101 (Sales)</option>
                     <option>Ext 102 (Support)</option>
                     <option>Mobile (Manager)</option>
                   </select>
                 </div>
                 <Button onClick={() => setEditingNode(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl mt-4">
                   Done
                 </Button>
              </div>
            )}
            
            {editingNode === 'ai' && (
              <div className="space-y-4 text-sm text-slate-300">
                 <div>
                   <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">AI Confidence Threshold ({Math.round(confidenceThreshold * 100)}%)</label>
                   <p className="mb-3 text-xs">If the AI is less confident than this, the call will be transferred to a human.</p>
                   <input type="range" min="0.5" max="1.0" step="0.05" value={confidenceThreshold} onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
                 </div>
                 <Button onClick={() => setEditingNode(null)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl mt-4">
                   Done
                 </Button>
              </div>
            )}

            {editingNode === 'transfer' && (
              <div className="space-y-4">
                 <div>
                   <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Human Fallback Target</label>
                   <select 
                     value={fallbackTarget} 
                     onChange={(e) => setFallbackTarget(e.target.value)}
                     className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                   >
                     <option>Voicemail</option>
                     <option>Ext 101 (Sales)</option>
                     <option>Ext 102 (Support)</option>
                     <option>Queue (Customer Service)</option>
                   </select>
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
