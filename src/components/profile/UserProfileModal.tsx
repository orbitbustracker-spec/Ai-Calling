'use client';

import React, { useState, useEffect } from 'react';
import { X, Moon, Sun, User, Mail, Phone, Camera } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/Button';

export function UserProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', avatarUrl: '' });

  const supabase = createClient();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setFetching(true);
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setFormData({
            name: user.user_metadata?.name || '',
            email: user.email || '',
            phone: user.user_metadata?.phone || '',
            avatarUrl: user.user_metadata?.avatarUrl || ''
          });
        }
        setFetching(false);
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
    
    // Update Supabase Auth
    const { error } = await supabase.auth.updateUser({
      email: formData.email,
      data: { name: formData.name, phone: formData.phone, avatarUrl: formData.avatarUrl }
    });
    
    if (error) {
      alert('Error updating profile: ' + error.message);
      setLoading(false);
      return;
    }

    // Update Prisma User
    await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    alert('Profile updated successfully! Note: if you changed your email, you may need to verify the new address.');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {fetching ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Appearance</span>
              {mounted && (
                <button 
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Avatar URL</label>
              <div className="flex gap-2">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                <input 
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-1 bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white dark:bg-slate-950 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
