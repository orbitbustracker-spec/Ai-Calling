'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash, PhoneForwarded, Mic, Save, Hash } from 'lucide-react';
import { Button } from '@/components/Button';
import { toast } from 'react-hot-toast';

export default function IVRBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ivrId, setIvrId] = useState('');
  
  const [welcomeAudioUrl, setWelcomeAudioUrl] = useState('');
  
  // Array of keypress mappings
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/org/ivr/get')
      .then(res => res.json())
      .then(data => {
        if (data.ivr) {
          setIvrId(data.ivr.id);
          setWelcomeAudioUrl(data.ivr.welcomeAudioUrl || '');
          if (data.ivr.keypressRoutes) {
             const parsed = typeof data.ivr.keypressRoutes === 'string' ? JSON.parse(data.ivr.keypressRoutes) : data.ivr.keypressRoutes;
             // Convert dictionary to array
             const routesArray = Object.keys(parsed).map(key => ({
                key,
                action: parsed[key].action,
                target: parsed[key].target
             }));
             setRoutes(routesArray);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddRoute = () => {
    setRoutes([...routes, { key: '', action: 'forward', target: '' }]);
  };

  const handleRemoveRoute = (index: number) => {
    setRoutes(routes.filter((_, i) => i !== index));
  };

  const handleChangeRoute = (index: number, field: string, value: string) => {
    const newRoutes = [...routes];
    newRoutes[index][field] = value;
    setRoutes(newRoutes);
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Convert array back to dictionary
    const keypressRoutes: any = {};
    routes.forEach(r => {
      if (r.key) {
        keypressRoutes[r.key] = { action: r.action, target: r.target };
      }
    });

    try {
      const res = await fetch('/api/org/ivr/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ivrId,
          welcomeAudioUrl,
          keypressRoutes
        })
      });
      if (res.ok) {
        toast.success('IVR Menu saved');
      } else {
        toast.error('Failed to save IVR');
      }
    } catch (e) {
      toast.error('Error saving');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading IVR...</div>;

  return (
    <div className="p-4 lg:p-8 h-full overflow-y-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Multi-Level IVR Builder</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Design your auto-attendant menu (Press 1 for Sales, Press 2 for Support).</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save IVR'}
          </Button>
        </div>
      </div>

      <div className="max-w-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        
        <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center">
                 <Mic className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                 <h3 className="font-bold text-slate-900 dark:text-white">Welcome Audio Message</h3>
                 <p className="text-xs text-slate-500">Text-to-speech or URL of the greeting audio.</p>
              </div>
           </div>
           <input 
              type="text" 
              placeholder="e.g. Thanks for calling. Press 1 for sales..." 
              value={welcomeAudioUrl}
              onChange={(e) => setWelcomeAudioUrl(e.target.value)}
              className="w-full bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500"
           />
        </div>

        <div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 <Hash className="w-5 h-5 text-slate-400" />
                 Keypress Routing
              </h3>
           </div>
           
           <div className="space-y-3 mb-6">
              {routes.map((route, index) => (
                 <div key={index} className="flex flex-col md:flex-row md:items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-bold text-slate-500 uppercase">Press</span>
                       <input 
                          type="text" 
                          maxLength={1}
                          value={route.key}
                          onChange={(e) => handleChangeRoute(index, 'key', e.target.value)}
                          className="w-12 text-center bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-lg px-2 py-2 text-sm text-slate-900 dark:text-white outline-none font-bold"
                          placeholder="1"
                       />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-2">
                       <select 
                          value={route.action}
                          onChange={(e) => handleChangeRoute(index, 'action', e.target.value)}
                          className="bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none"
                       >
                          <option value="forward">Forward to Ext</option>
                          <option value="ai">Route to AI Agent</option>
                          <option value="voicemail">Send to Voicemail</option>
                       </select>
                       <input 
                          type="text" 
                          value={route.target}
                          onChange={(e) => handleChangeRoute(index, 'target', e.target.value)}
                          className="bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none"
                          placeholder={route.action === 'forward' ? "Ext (e.g. 101)" : "Target ID"}
                       />
                    </div>
                    
                    <button onClick={() => handleRemoveRoute(index)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-lg transition-colors">
                       <Trash className="w-4 h-4" />
                    </button>
                 </div>
              ))}
              
              {routes.length === 0 && (
                 <div className="p-6 text-center text-sm text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                    No keypress routes defined. Add one below.
                 </div>
              )}
           </div>

           <Button onClick={handleAddRoute} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold w-full rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
              <Plus className="w-4 h-4" /> Add Keypress Option
           </Button>
        </div>

      </div>
    </div>
  );
}
