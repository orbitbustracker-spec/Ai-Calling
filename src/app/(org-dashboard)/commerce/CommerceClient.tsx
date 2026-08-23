'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Lock, Unlock, ShoppingBag, BedDouble, Save, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommerceClient({ isActive, commerceMinutes }: { isActive: boolean, commerceMinutes: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUnfreeze = async () => {
    if (!confirm('Confirm simulated purchase of 500 Commerce AI Minutes?')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/org/payments/unfreeze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature: 'commerce' })
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
        <div className="bg-orange-500/10 p-6 rounded-full mb-6">
          <Lock className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Feature Frozen</h2>
        <p className="text-gray-400 max-w-lg mb-8">
          Unlock the AI Commerce module to let your Voice AI and WhatsApp bots process hotel bookings, restaurant orders, and accept payments securely 24/7.
        </p>
        
        <div className="bg-[#1a1a1d] p-6 rounded-xl border border-gray-800 w-full max-w-md mb-8">
          <h3 className="text-white font-semibold text-lg mb-2">Commerce Starter Pack</h3>
          <p className="text-3xl font-bold text-white mb-4">500 <span className="text-sm font-normal text-gray-500">AI Minutes</span></p>
          <ul className="text-sm text-gray-400 space-y-2 text-left mb-6">
            <li className="flex items-center gap-2">✓ Automated Room Booking Flow</li>
            <li className="flex items-center gap-2">✓ Restaurant Menu Ordering</li>
            <li className="flex items-center gap-2">✓ Payment Gateway Integration (Stripe/eSewa API)</li>
            <li className="flex items-center gap-2">✓ Real-time Inventory Sync</li>
          </ul>
          
          <Button 
            onClick={handleUnfreeze} 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
          >
            {loading ? 'Processing...' : 'Purchase Minutes to Unfreeze'}
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
            <h3 className="text-green-500 font-semibold">Commerce Unfrozen</h3>
            <p className="text-green-500/80 text-sm">Remaining AI Booking Minutes: <strong>{commerceMinutes}</strong></p>
          </div>
        </div>
        <Button onClick={handleUnfreeze} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
          + Top Up Minutes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111113] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-indigo-500" /> Booking / Ordering Webhook
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              When AI successfully confirms a booking or order with the customer, it will send a JSON payload to this endpoint.
            </p>
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Endpoint URL</label>
              <input type="text" placeholder="https://api.yourhotel.com/ai-bookings" className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Authorization Header</label>
              <input type="password" placeholder="Bearer ..." className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="h-4 w-4" /> Save Configuration</Button>
          </div>
        </div>

        <div className="bg-[#111113] border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-500" /> Payment Gateway Links
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Provide the AI with your Payment Links (e.g. Stripe Payment Links, eSewa Merchant Link) to SMS or WhatsApp the user after confirming the order.
            </p>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Payment Link</label>
              <input type="text" placeholder="https://buy.stripe.com/..." className="w-full bg-[#1a1a1d] border border-gray-800 rounded-lg p-2.5 text-white" />
            </div>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"><Save className="h-4 w-4" /> Save Payment Links</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
