'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, Send, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

const PLATFORMS = [
  { id: 'WHATSAPP', name: 'WhatsApp Business', icon: MessageCircle, color: 'text-green-600 dark:text-green-500', bg: 'bg-green-100 dark:bg-green-500/10' },
  { id: 'MESSENGER', name: 'FB Messenger', icon: MessageCircle, color: 'text-blue-600 dark:text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
  { id: 'INSTAGRAM', name: 'Instagram DMs', icon: Camera, color: 'text-pink-600 dark:text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/10' },
  { id: 'TIKTOK', name: 'TikTok Shop & DMs', icon: MessageCircle, color: 'text-gray-900 dark:text-white', bg: 'bg-gray-200 dark:bg-gray-500/10' },
  { id: 'TELEGRAM', name: 'Telegram Bot', icon: Send, color: 'text-sky-600 dark:text-sky-500', bg: 'bg-sky-100 dark:bg-sky-500/10' },
  { id: 'CUSTOM_WEBHOOK', name: 'Custom Webhook', icon: LinkIcon, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-200 dark:bg-slate-500/10' },
];

export default function IntegrationsPage() {
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/org/omnichannel/status')
      .then(res => res.json())
      .then(data => {
        if(data.integrations) setIntegrations(data.integrations);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const isConnected = integrations.some(i => i.provider === activePlatform.id && i.isActive);

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Omnichannel Integrations</h1>
        <p className="text-slate-500 dark:text-slate-400">Connect your social accounts to sync messages and automate orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[600px]">
        {/* Sidebar selection */}
        <div className="col-span-1 md:col-span-4 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-4 overflow-y-auto shadow-sm">
          {PLATFORMS.map(platform => {
            const Icon = platform.icon;
            const isActive = activePlatform.id === platform.id;
            const isPlatformConnected = integrations.some(i => i.provider === platform.id && i.isActive);
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all mb-2 ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30' : 'hover:bg-gray-50 dark:hover:bg-slate-800 border-transparent'} border`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bg}`}>
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                </div>
                <div className="flex-1 text-left flex flex-col">
                  <span className={`font-semibold ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
                    {platform.name}
                  </span>
                  {isPlatformConnected && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Connected</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Status Display */}
        <div className="col-span-1 md:col-span-8 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-sm flex flex-col">
           {/* Glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

           <motion.div
             key={activePlatform.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             className="flex-1 flex flex-col"
           >
              <div className="flex items-center gap-4 mb-8">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activePlatform.bg}`}>
                   <activePlatform.icon className={`w-8 h-8 ${activePlatform.color}`} />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activePlatform.name} Status</h2>
                   <p className="text-slate-500 dark:text-slate-400 text-sm">Check your integration status below.</p>
                 </div>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : isConnected ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Successfully Connected!</h3>
                  <p className="text-emerald-600/80 dark:text-emerald-400/80 max-w-sm">
                    Your {activePlatform.name} account is fully active and being managed by the AI engine.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5">
                  <AlertCircle className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Not Connected</h3>
                  <p className="text-slate-500 max-w-md mb-6">
                    For security and quality assurance, API integrations must be securely provisioned by your system administrator.
                  </p>
                  <button onClick={() => window.open('mailto:support@voiceai.com')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md">
                    Contact Support to Activate
                  </button>
                </div>
              )}
           </motion.div>
        </div>
      </div>
    </div>
  );
}
