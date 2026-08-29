'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, X, Mail, User, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function CreateOrgModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    adminName: '',
    adminPassword: '',
    adminPhone: '',
    isOmnichannelActive: true,
    isCommerceActive: true,
    initialMinutes: '500',
  });

  const handleCreate = async () => {
    if(!formData.name || !formData.adminEmail || !formData.adminPassword) {
      alert("Name, Email, and Password are required.");
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/admin/organizations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          initialMinutes: parseInt(formData.initialMinutes) || 0
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create organization');
      }

      alert("New organization added successfully! The admin can now log in.");
      setIsOpen(false);
      setFormData({
        name: '',
        adminEmail: '',
        adminName: '',
        adminPassword: '',
        adminPhone: '',
        isOmnichannelActive: true,
        isCommerceActive: true,
        initialMinutes: '500',
      });
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 flex items-center gap-2 relative z-10 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
        <Plus className="w-5 h-5" /> Add Organization
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 sticky top-0 z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/> Provision New Tenant Organization
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 dark:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">1. Organization Details</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Organization Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Acme Corp" 
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">2. Organization Admin Account</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Admin Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={formData.adminName}
                          onChange={e => setFormData({...formData, adminName: e.target.value})}
                          placeholder="e.g. John Doe" 
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Admin Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input 
                          type="email" 
                          value={formData.adminEmail}
                          onChange={e => setFormData({...formData, adminEmail: e.target.value})}
                          placeholder="admin@acme.com" 
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Temporary Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={formData.adminPassword}
                          onChange={e => setFormData({...formData, adminPassword: e.target.value})}
                          placeholder="Temporary password" 
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Admin Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={formData.adminPhone}
                          onChange={e => setFormData({...formData, adminPhone: e.target.value})}
                          placeholder="+977..." 
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">3. Initial Setup & Modules</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.isOmnichannelActive}
                        onChange={e => setFormData({...formData, isOmnichannelActive: e.target.checked})}
                        className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">Omnichannel</div>
                        <div className="text-xs text-gray-500">Enable Inbox</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.isCommerceActive}
                        onChange={e => setFormData({...formData, isCommerceActive: e.target.checked})}
                        className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">Commerce</div>
                        <div className="text-xs text-gray-500">Social commerce tools</div>
                      </div>
                    </label>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Starting Voice Minutes</label>
                      <input 
                        type="number" 
                        value={formData.initialMinutes}
                        onChange={e => setFormData({...formData, initialMinutes: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                  <Button onClick={() => setIsOpen(false)} className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 font-bold border border-gray-200 dark:border-white/10">Cancel</Button>
                  <Button onClick={handleCreate} disabled={loading} className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                    {loading ? 'Provisioning Tenant & User...' : 'Provision Tenant'}
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
