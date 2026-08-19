'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdjustBalanceClient({ orgId }: { orgId: string }) {
  const router = useRouter();
  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  const handleAdjust = async () => {
    try {
      const res = await fetch(`/api/admin/organizations/${orgId}/adjust-balance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adjustment, reason })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Adjusted successfully!');
      router.refresh();
    } catch (e: unknown) { if (e instanceof Error)
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Adjustment (Minutes, use negative to remove)</label>
        <input type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm">Reason</label>
        <input type="text" value={reason} onChange={e => setReason(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      {msg && <div className="text-sm text-blue-600">{msg}</div>}
      <button onClick={handleAdjust} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Adjustment</button>
    </div>
  );
}
