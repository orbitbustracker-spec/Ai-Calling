'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BillingConfigClient({ initialConfig }: { initialConfig: { customerPricePerMinute?: number } | null }) {
  const router = useRouter();
  const [rate, setRate] = useState(initialConfig?.customerPricePerMinute || 5);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/billing-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerPricePerMinute: rate })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Saved successfully!');
      router.refresh();
    } catch (e: unknown) { if (e instanceof Error)
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded border space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Default Platform Rate (Rs. / minute)</label>
        <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
      <p className="text-sm text-gray-500">Note: Changing this does not affect historical package purchases.</p>
      {msg && <div className="text-blue-600">{msg}</div>}
      <button onClick={handleSave} className="bg-blue-600 text-slate-900 dark:text-white px-4 py-2 rounded">Save Configuration</button>
    </div>
  );
}
