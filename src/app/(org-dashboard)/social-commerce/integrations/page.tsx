'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, Send, Link as LinkIcon, Plus, CheckCircle2 } from 'lucide-react';
// We'll use basic SVGs or icons for platforms without standard Lucide icons (TikTok, Viber)

const PLATFORMS = [
  { id: 'whatsapp', name: 'WhatsApp Business', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'messenger', name: 'FB Messenger', icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'instagram', name: 'Instagram DMs', icon: Camera, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'tiktok', name: 'TikTok Shop & DMs', icon: MessageCircle, color: 'text-black dark:text-white', bg: 'bg-gray-500/10' },
  { id: 'telegram', name: 'Telegram Bot', icon: Send, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { id: 'viber', name: 'Viber Business', icon: PhoneIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'linkedin', name: 'LinkedIn Marketing', icon: LinkIcon, color: 'text-blue-700', bg: 'bg-blue-700/10' },
  { id: 'webhook', name: 'Custom Webhook', icon: LinkIcon, color: 'text-slate-400', bg: 'bg-slate-500/10' },
];

function PhoneIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
}

export default function IntegrationsPage() {
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Omnichannel Integrations</h1>
        <p className="text-slate-400">Connect your social accounts to sync messages and automate orders.</p>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[600px]">
        {/* Sidebar selection */}
        <div className="col-span-4 bg-slate-900/50 border border-white/10 rounded-2xl p-4 overflow-y-auto">
          {PLATFORMS.map(platform => {
            const Icon = platform.icon;
            const isActive = activePlatform.id === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all mb-2 ${
                  isActive ? 'bg-indigo-500/10 border border-indigo-500/30' : 'hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bg}`}>
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                </div>
                <span className={`font-semibold ${isActive ? 'text-indigo-400' : 'text-slate-300'}`}>
                  {platform.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Configuration Form */}
        <div className="col-span-8 bg-slate-900/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
           {/* Glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

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
                   <h2 className="text-2xl font-bold text-white">{activePlatform.name} Setup</h2>
                   <p className="text-slate-400 text-sm">Enter your credentials to enable AI automation.</p>
                 </div>
              </div>

              <div className="space-y-5">
                {activePlatform.id === 'whatsapp' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number ID</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="e.g., 1029384756" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">System User Access Token</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="EAAG..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Webhook URL (Read-only)</label>
                      <input type="text" readOnly value="https://api.aakashtel.com/webhooks/whatsapp" className="w-full bg-slate-800 border border-white/5 rounded-lg p-3 text-slate-400 outline-none cursor-not-allowed" />
                    </div>
                  </>
                )}

                {(activePlatform.id === 'messenger' || activePlatform.id === 'instagram') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Page ID / Instagram ID</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Page Access Token</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">App Secret</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'tiktok' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">TikTok App Key</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">App Secret</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Seller Cipher Token</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'telegram' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Bot Token (from @BotFather)</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Webhook Secret Key (Optional)</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                  </>
                )}
                
                {activePlatform.id === 'viber' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Service Account Auth Token</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                  </>
                )}

                {activePlatform.id === 'linkedin' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Client ID</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Client Secret</label>
                      <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Organization Page URN</label>
                      <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="urn:li:organization:123456" />
                    </div>
                  </>
                )}

                <div className="pt-6">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
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
