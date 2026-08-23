'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Lock, Unlock, MessageCircle, AlertCircle, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OmnichannelClient({ isActive, expiryDate }: { isActive: boolean, expiryDate: string | null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUnfreeze = async () => {
    if (!confirm('Confirm simulated payment of Rs 5,000 to unfreeze Omnichannel module for 1 month?')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/org/payments/unfreeze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature: 'omnichannel' })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert(data.message);
        router.refresh();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to process payment');
    }
    setLoading(false);
  };

  if (!isActive) {
    return (
      <div className="bg-[#111113] border border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
          <Lock className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Feature Frozen</h2>
        <p className="text-gray-400 max-w-lg mb-8">
          Unlock the AI Omnichannel module to automatically respond to customers across WhatsApp, Facebook, and Instagram. 
          Stop losing leads and engage with your customers 24/7.
        </p>
        
        <div className="bg-[#1a1a1d] p-6 rounded-xl border border-gray-800 w-full max-w-md mb-8">
          <h3 className="text-white font-semibold text-lg mb-2">Omnichannel Premium</h3>
          <p className="text-3xl font-bold text-white mb-4">Rs 5,000 <span className="text-sm font-normal text-gray-500">/ month</span></p>
          <ul className="text-sm text-gray-400 space-y-2 text-left mb-6">
            <li className="flex items-center gap-2">✓ Unlimited AI Chat Responses</li>
            <li className="flex items-center gap-2">✓ WhatsApp Business API Setup</li>
            <li className="flex items-center gap-2">✓ Social Media Auto-Replies</li>
            <li className="flex items-center gap-2">✓ CRM Lead Synchronization</li>
          </ul>
          
          <Button 
            onClick={handleUnfreeze} 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3"
          >
            {loading ? 'Processing Payment...' : 'Want to Unfreeze? Pay Now'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Unlock className="h-5 w-5 text-green-500" />
          <div>
            <h3 className="text-green-500 font-semibold">Module Unfrozen</h3>
            <p className="text-green-500/80 text-sm">Valid until: {new Date(expiryDate!).toLocaleDateString()}</p>
          </div>
        </div>
        <Button onClick={() => router.push('/omnichannel/integrations')} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Configure Integrations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-500" /> WhatsApp Integration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">WhatsApp Webhook URL</label>
              <input type="text" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" value="https://api.nexus.com/webhooks/whatsapp" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">WhatsApp Token (from Meta)</label>
              <input type="password" placeholder="EAAB..." className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="h-4 w-4" /> Save WhatsApp Setup</Button>
          </div>
        </div>

        <div className="bg-[#111113] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" /> Messenger / Instagram
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Page Access Token</label>
              <input type="password" placeholder="EAAB..." className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Verify Token</label>
              <input type="text" placeholder="nexus_verify_xyz" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="h-4 w-4" /> Save FB/IG Setup</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
