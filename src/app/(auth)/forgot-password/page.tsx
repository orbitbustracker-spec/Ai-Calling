'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/Button';
import { Mail, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      alert("Error sending reset email: " + error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] relative overflow-hidden p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111113] rounded-3xl border border-gray-800 p-8 shadow-2xl shadow-indigo-900/10">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <span className="font-bold text-3xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Nexus
                </span>
              </div>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-white tracking-tight">Reset Password</h1>
          <p className="text-gray-400 text-center mt-2 mb-8">Enter your email to receive a reset link</p>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="bg-green-500/10 text-green-500 p-4 rounded-xl border border-green-500/20">
                Password reset link sent! Please check your email inbox (and spam folder).
              </div>
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block mt-4">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1a1d] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : 'Send Reset Link'} <ArrowRight className="h-5 w-5" />
              </Button>

              <div className="text-center mt-4">
                <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
