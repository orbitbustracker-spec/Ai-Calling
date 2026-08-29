'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Building2, User } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ApproveUserModal({ 
  user, 
  isOpen, 
  onClose, 
  onApproved 
}: { 
  user: any; 
  isOpen: boolean; 
  onClose: () => void;
  onApproved: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    isOmnichannelActive: true,
    isCommerceActive: true,
    initialMinutes: '500',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        companyName: user.companyName || ''
      }));
    }
  }, [user]);

  if (!user) return null;

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/new-users/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: user.id,
          ...formData
        })
      });

      if (!res.ok) {
        throw new Error("Failed to approve user.");
      }

      alert("User Approved and Organization Provisioned! Activation email sent.");
      onApproved();
      onClose();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-xl my-8 overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 sticky top-0 z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500"/> Review & Approve Registration
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Applicant Info (Read-only summary) */}
              <div className="bg-gray-50 dark:bg-slate-950/50 border border-gray-200 dark:border-white/10 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-full text-indigo-600 dark:text-indigo-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{user.firstName} {user.lastName}</h4>
                  <div className="text-sm text-gray-500 mb-1">{user.email} &bull; {user.phone}</div>
                  <div className="text-xs text-gray-400">Job Title: {user.jobTitle} &bull; Web: {user.website}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Organization Configuration</h4>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2">Final Organization Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 px-4 py-3 text-gray-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.isOmnichannelActive}
                      onChange={e => setFormData({...formData, isOmnichannelActive: e.target.checked})}
                      className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Omnichannel</div>
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
                    </div>
                  </label>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Voice Minutes</label>
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
                <Button onClick={onClose} className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 font-bold border border-gray-200 dark:border-white/10">Cancel</Button>
                <Button onClick={handleApprove} disabled={loading} className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                  {loading ? 'Approving & Provisioning...' : 'Approve & Send Email'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
