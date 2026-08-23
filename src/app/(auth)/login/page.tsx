'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Mail, Lock, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Resolve identifier to Email
      let resolvedEmail = identifier;
      const lookupRes = await fetch('/api/auth/lookup-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      
      if (lookupRes.ok) {
        const data = await lookupRes.json();
        resolvedEmail = data.email;
      }

      // 2. Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: resolvedEmail,
        password,
      });

      if (error) {
        alert("Invalid login credentials. Please check your password.");
      } else {
        window.location.href = '/dashboard-router';
      }
    } catch (err) {
      alert("Error logging in.");
    } finally {
      setLoading(false);
    }
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
          
          <h1 className="text-3xl font-bold text-center text-white tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 text-center mt-2 mb-8">Sign in to your enterprise dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address or Mobile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1d] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  placeholder="email@example.com or 98..."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1d] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-500"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 bg-[#1a1a1d] border-gray-700 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-[#0a0a0b]" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <Link href="/register" className="text-white font-medium hover:underline">Register / Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
