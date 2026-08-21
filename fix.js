const fs = require('fs');
const content = "use client";

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { BaraldharSVG } from '@/components/BaraldharSVG';
import { Button } from '@/components/Button';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); } 
      else {
        if (data?.user?.identities?.length === 0) {
          setError('This email is already registered. Please sign in instead.');
        } else {
          setMessage('Registration successful! If you are not redirected, check your email for confirmation.');
          router.push('/admin');
          router.refresh();
        }
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); } 
      else {
        router.push('/admin');
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <BaraldharSVG />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">Ai Calling Nepal - Enterprise Dashboard</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="admin@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="••••••••" />
              </div>
            </div>
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700 text-sm">{error}</div>}
            {message && <div className="rounded-md bg-green-50 p-4 text-green-700 text-sm">{message}</div>}
            <Button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              {isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

fs.writeFileSync('src/app/(auth)/login/page.tsx', content, 'utf8');
