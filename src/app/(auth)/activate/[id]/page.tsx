'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/Button';
import { Lock, CheckCircle } from 'lucide-react';
import React from 'react'; // added for React.use()

export default function ActivatePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Unwrap params using React.use()
  const { id } = React.use(params);
  
  const supabase = createClient();

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Fetch pending registration details to get email
      const res = await fetch(`/api/auth/activate/details?id=${id}`);
      if (!res.ok) throw new Error("Invalid or expired activation link.");
      const { pending } = await res.json();

      // 2. Sign up the user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: pending.email,
        password: password
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error("Failed to create user in Supabase.");

      // 3. Link Supabase User to Prisma Organization as Admin
      const finalizeRes = await fetch(`/api/auth/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pendingId: id,
          userId: authData.user.id,
          email: pending.email,
          name: `${pending.firstName} ${pending.lastName}`
        })
      });

      if (!finalizeRes.ok) {
        const errorData = await finalizeRes.json();
        throw new Error(errorData.error || "Failed to finalize account.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-4">
        <div className="bg-[#111113] p-8 rounded-3xl border border-gray-800 text-center max-w-md w-full">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Account Activated!</h2>
          <p className="text-gray-400">You can now log in. Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111113] rounded-3xl border border-gray-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-white mb-2">Set Your Password</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Your Nexus account has been approved! Create a secure password to activate your Organization Admin account.
          </p>

          <form onSubmit={handleActivate} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
            >
              {loading ? 'Activating...' : 'Activate Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
