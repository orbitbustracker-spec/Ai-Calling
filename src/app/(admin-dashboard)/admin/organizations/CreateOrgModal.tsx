'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, X } from 'lucide-react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function CreateOrgModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if(!name) return;
    setLoading(true);
    // Real implementation would post to /api/admin/organizations
    // We will just simulate it for UI
    alert("New organization added: " + name);
    setIsOpen(false);
    setName('');
    setLoading(false);
    router.refresh();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
        <Plus className="w-5 h-5" /> Add Organization
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-400"/> New Organization
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-xs font-bold text-slate-400 mb-2">Organization Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Acme Corp" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all mb-6"
                />

                <div className="flex gap-3">
                  <Button onClick={() => setIsOpen(false)} className="flex-1 bg-transparent hover:bg-slate-800 text-slate-400 font-bold border border-white/10">Cancel</Button>
                  <Button onClick={handleCreate} disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                    {loading ? 'Creating...' : 'Create'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
