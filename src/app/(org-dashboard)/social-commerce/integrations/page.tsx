'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, Send, Link as LinkIcon, Plus, CheckCircle2 } from 'lucide-react';
// We'll use basic SVGs or icons for platforms without standard Lucide icons (TikTok, Viber)

const PLATFORMS = [
  { id: 'whatsapp', name: 'WhatsApp Business', icon: MessageCircle, color: 'text-green-600 dark:text-green-500', bg: 'bg-green-100 dark:bg-green-500/10' },
  { id: 'messenger', name: 'FB Messenger', icon: MessageCircle, color: 'text-blue-600 dark:text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
  { id: 'instagram', name: 'Instagram DMs', icon: Camera, color: 'text-pink-600 dark:text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/10' },
  { id: 'tiktok', name: 'TikTok Shop & DMs', icon: MessageCircle, color: 'text-gray-900 dark:text-white', bg: 'bg-gray-200 dark:bg-gray-500/10' },
  { id: 'telegram', name: 'Telegram Bot', icon: Send, color: 'text-sky-600 dark:text-sky-500', bg: 'bg-sky-100 dark:bg-sky-500/10' },
  { id: 'viber', name: 'Viber Business', icon: PhoneIcon, color: 'text-purple-600 dark:text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/10' },
  { id: 'linkedin', name: 'LinkedIn Marketing', icon: LinkIcon, color: 'text-blue-800 dark:text-blue-700', bg: 'bg-blue-200 dark:bg-blue-700/10' },
  { id: 'webhook', name: 'Custom Webhook', icon: LinkIcon, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-200 dark:bg-slate-500/10' },
];

function PhoneIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
}

// Dynamic Webhook URL generator based on domain context
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.yourdomain.com";
export const getWebhookUrl = (platform: string) => {
  return `${API_BASE_URL}/webhooks/${platform}`;
};

export default function IntegrationsPage() {
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);

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
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all mb-2 ${
                  isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30' : 'hover:bg-gray-50 dark:hover:bg-slate-800 border-transparent'
                } border`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bg}`}>
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                </div>
                <span className={`font-semibold ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  {platform.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Configuration Form */}
        <div className="col-span-1 md:col-span-8 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-sm">
           {/* Glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

           <motion.div
             key={activePlatform.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
           >
              <div className="flex items-center gap-4 mb-8">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activePlatform.bg}`}>
                   <activePlatform.icon className={`w-8 h-8 ${activePlatform.color}`} />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activePlatform.name} Setup</h2>
                   <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your credentials to enable AI automation.</p>
                 </div>
              </div>

              <div className="space-y-5">
                {activePlatform.id === 'whatsapp' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Phone Number ID</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="e.g., 1029384756" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">System User Access Token</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="EAAG..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl('whatsapp')} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                {(activePlatform.id === 'messenger' || activePlatform.id === 'instagram') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Page ID / Instagram ID</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Page Access Token</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">App Secret</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl(activePlatform.id)} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'tiktok' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">TikTok App Key</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">App Secret</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Seller Cipher Token</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl('tiktok')} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'telegram' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Bot Token (from @BotFather)</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook Secret Key (Optional)</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl('telegram')} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}
                
                {activePlatform.id === 'viber' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Service Account Auth Token</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl('viber')} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'linkedin' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Client ID</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Client Secret</label>
                      <input type="password" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Organization Page URN</label>
                      <input type="text" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="urn:li:organization:123456" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value={getWebhookUrl('linkedin')} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/5 rounded-lg p-3 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                <div className="pt-6">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] w-full md:w-auto">
                    Connect & Verify
                  </button>
                </div>

              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
