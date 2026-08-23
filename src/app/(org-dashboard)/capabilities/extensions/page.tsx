'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Plus, User, Hash, Lock, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ExtensionsPage() {
  const [extensions, setExtensions] = useState([
    { id: '1', ext: '101', name: 'Sales Main', assigned: 'Rajan K', status: 'Online' },
    { id: '2', ext: '102', name: 'Support', assigned: 'Sneh R', status: 'Offline' },
    { id: '3', ext: '103', name: 'Billing', assigned: 'Istuti', status: 'Online' },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
            <Hash className="w-8 h-8 text-indigo-400" /> SIP Extensions
          </h1>
          <p className="text-slate-400">Manage virtual phone extensions, passwords, and assignments for your team.</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10">
          <Plus className="w-5 h-5" /> Add Extension
        </Button>
      </div>

      {/* List */}
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/80">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search extensions..." className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50" />
          </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/50 text-slate-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Extension</th>
              <th className="px-6 py-4">Label</th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {extensions.map(ext => (
              <tr key={ext.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-indigo-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" /> {ext.ext}
                </td>
                <td className="px-6 py-4 text-white font-medium">{ext.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-800 w-fit px-3 py-1 rounded-full text-xs font-bold">
                    <User className="w-3 h-3" /> {ext.assigned}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${ext.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    {ext.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-indigo-400 mx-2 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-red-400 mx-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
             <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Create New Extension</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Extension Number</label>
                    <input type="text" placeholder="e.g. 104" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Label / Department</label>
                    <input type="text" placeholder="e.g. Finance" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">SIP Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input type="password" placeholder="Strong Password" className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white font-mono" />
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-white/10 bg-slate-800/50 flex gap-3">
                  <Button onClick={() => setShowModal(false)} className="flex-1 bg-transparent hover:bg-slate-800 text-slate-400">Cancel</Button>
                  <Button onClick={() => setShowModal(false)} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white">Create Extension</Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
