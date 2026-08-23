'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Save, AlertCircle } from 'lucide-react';

const CHANNELS = [
  { id: 'WHATSAPP', name: 'WhatsApp Business API' },
  { id: 'MESSENGER', name: 'Facebook Messenger' },
  { id: 'INSTAGRAM', name: 'Instagram DMs' },
  { id: 'TIKTOK', name: 'TikTok for Business' },
  { id: 'TELEGRAM', name: 'Telegram Bot' },
  { id: 'VIBER', name: 'Viber Business' },
  { id: 'LINKEDIN', name: 'LinkedIn Pages' },
  { id: 'CUSTOM_WEBHOOK', name: 'Custom Website / Webhook' }
];

export default function IntegrationsClient({ isActive }: { isActive: boolean }) {
  const [selectedChannel, setSelectedChannel] = useState('WHATSAPP');

  if (!isActive) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Social Module Frozen</h3>
        <p className="text-gray-400">You must unfreeze the Omnichannel module to access integrations.</p>
      </div>
    );
  }

  const renderFields = () => {
    switch(selectedChannel) {
      case 'WHATSAPP':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">WhatsApp Business Account (WABA) ID</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="e.g. 1029384756..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number ID</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="e.g. 104593920..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Permanent Access Token</label>
              <input type="password" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="EAAB..." />
            </div>
          </>
        );
      case 'MESSENGER':
      case 'INSTAGRAM':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Facebook Page ID / IG Account ID</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">App Secret</label>
              <input type="password" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Page Access Token</label>
              <input type="password" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
          </>
        );
      case 'CUSTOM_WEBHOOK':
        return (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Website Target URL (We will POST messages here)</label>
              <input type="url" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="https://yourwebsite.com/api/webhook" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Webhook Secret (For signature verification)</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="sk_test_..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Embeddable Script Generator Code (Read-Only)</label>
              <textarea readOnly className="w-full h-24 bg-gray-900 border border-gray-800 rounded-lg p-3 text-green-400 font-mono text-sm outline-none" value={`<script src="https://nexus.ai/widget.js" data-org="YOUR_ORG_ID"></script>`} />
            </div>
          </>
        );
      default:
        return (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Platform App Key / Client ID</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Secret Key / Bot Token</label>
              <input type="password" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-3 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
          </>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left sidebar for selection */}
      <div className="md:col-span-1 bg-[#111113] border border-gray-800 rounded-xl overflow-hidden h-[500px] flex flex-col">
        <div className="p-4 border-b border-gray-800 bg-[#1a1a1d]">
          <h3 className="font-semibold text-white">Select Channel</h3>
        </div>
        <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1">
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedChannel === ch.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {ch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right side form */}
      <div className="md:col-span-3 bg-[#111113] border border-gray-800 rounded-xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">{CHANNELS.find(c => c.id === selectedChannel)?.name} Configuration</h2>
          <p className="text-gray-400 text-sm mt-1">Configure your API credentials to enable automated AI messaging.</p>
        </div>

        <div className="space-y-6 max-w-2xl">
          {renderFields()}

          <div className="pt-6 border-t border-gray-800">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              <Save className="h-4 w-4" /> Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
