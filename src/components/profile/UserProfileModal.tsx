'use client';

import React, { useState, useEffect } from 'react';
import { X, Moon, Sun, User, Mail, Phone, Camera, Briefcase, Building2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/Button';

export function UserProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', avatarUrl: '', jobTitle: '', department: ''
  });
  const [userRole, setUserRole] = useState('');
  const [orgName, setOrgName] = useState('');

  const supabase = createClient();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setFetching(true);
      
      // Fetch Supabase Auth Data
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setFormData({
            name: user.user_metadata?.name || '',
            email: user.email || '',
            phone: user.user_metadata?.phone || '',
            avatarUrl: user.user_metadata?.avatarUrl || '',
            jobTitle: user.user_metadata?.jobTitle || '',
            department: user.user_metadata?.department || ''
          });
          
          // Fetch Prisma Data for Role & Org
          fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
              setUserRole(data?.role || '');
              setOrgName(data?.organization?.name || 'Unassigned');
            })
            .finally(() => setFetching(false));
        } else {
          setFetching(false);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Update Supabase Auth metadata
    const { error } = await supabase.auth.updateUser({
      email: formData.email,
      data: { 
        name: formData.name, 
        phone: formData.phone, 
        avatarUrl: formData.avatarUrl,
        jobTitle: formData.jobTitle,
        department: formData.department
      }
    });
    
    if (error) {
      alert('Error updating profile: ' + error.message);
      setLoading(false);
      return;
    }

    // Update Prisma User (name, phone, avatarUrl are stored there too)
    await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatarUrl: formData.avatarUrl
      })
    });

    alert('Profile updated successfully!');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-slate-900/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile & Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {fetching ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading profile data...</div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Top Section: Avatar & System Role */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group cursor-pointer">
                    {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-indigo-50 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center">
                        <User className="w-10 h-10 text-indigo-300 dark:text-slate-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <input 
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    placeholder="Image URL..."
                    className="w-32 text-center text-xs bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 rounded-md px-2 py-1 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name || 'No Name Set'}</h3>
                    <p className="text-gray-500 dark:text-slate-400">{formData.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wide">
                      System Role: {userRole || 'VIEWER'}
                    </span>
                    <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wide">
                      Org: {orgName}
                    </span>
                  </div>
                </div>
                
                {/* Theme Toggle */}
                {mounted && (
                  <div className="hidden md:flex flex-col items-center gap-2 bg-gray-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Theme</span>
                    <button 
                      type="button"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="p-3 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm border border-gray-200 dark:border-slate-600 hover:border-indigo-500 transition-colors"
                    >
                      {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Job Title / Designation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="jobTitle" placeholder="e.g. Accountant, IT Admin..." value={formData.jobTitle} onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Department / Office</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="department" placeholder="e.g. Finance, Support..." value={formData.department} onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">* Note: Changing email will require verification.</p>
                </div>
              </div>

              {mounted && (
                <div className="md:hidden flex items-center justify-between bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300">App Theme</span>
                  <button 
                    type="button"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-600"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                  </button>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 font-bold px-6">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-md">
                  {loading ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
