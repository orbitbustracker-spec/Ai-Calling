'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { Bot, ArrowRight, Building, Mail, Globe, User, Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function RegisterForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: initialEmail,
    phone: '',
    companyName: '',
    website: '',
    jobTitle: '',
    country: 'Nepal',
    pbxProfile: 'NEW_SETUP'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Call the API route to submit pending registration
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Registration Request Sent!</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Thank you for requesting an account. Our Super Admin team will review your application and website details. 
          You will receive an email once your account is approved and activated.
        </p>
        <Link href="/">
          <Button className="bg-indigo-600 text-white font-medium hover:bg-indigo-700">
            Return to Homepage
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">First Name</label>
          <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="John" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Last Name</label>
          <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="Doe" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Business Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="john@company.com" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Phone Number</label>
          <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="+977..." />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Company Name</label>
        <input required name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="Acme Corp" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between transition-colors duration-300">
          <span>Website URL <span className="text-red-500 dark:text-red-400">*</span></span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400">Mandatory for approval</span>
        </label>
        <input required type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="https://www.company.com" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Job Title</label>
          <input required name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="CEO / IT Manager" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Telephony Setup</label>
          <select name="pbxProfile" value={formData.pbxProfile} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none">
            <option value="NEW_SETUP">New Setup (Need SIP Trunk)</option>
            <option value="EXISTING_PBX">Existing IP-PBX</option>
            <option value="CLOUD_API">Twilio/Plivo/Cloud</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/30 transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Submitting...' : 'Request Enterprise Access'} <ArrowRight className="h-5 w-5" />
      </Button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0b] text-gray-900 dark:text-white flex items-center justify-center p-4 relative overflow-hidden py-12 transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white dark:bg-[#111113] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-2xl dark:shadow-indigo-900/10 transition-colors duration-300">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-xl">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <span className="font-bold text-3xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Nexus
                </span>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2 transition-colors duration-300">Create an Account</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm max-w-md mx-auto transition-colors duration-300">
            Join the next-gen AI Voice platform. Fill out this application, and our Super Admin will review your details to approve access.
          </p>

          <Suspense fallback={<div>Loading form...</div>}>
            <RegisterForm />
          </Suspense>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center transition-colors duration-300">
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
