'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminOmnichannelActions({ orgId, isSocialActive }: { orgId: string, isSocialActive: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleSocial = async () => {
    if (!confirm(`Are you sure you want to ${isSocialActive ? 'freeze' : 'unfreeze'} Social Media for this organization?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/omnichannel/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_social', orgId })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.refresh();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Action failed');
    }
    setLoading(false);
  };

  const handleAddMinutes = async () => {
    const minStr = prompt('Enter number of minutes to add to this organization:');
    if (!minStr) return;
    
    const minutes = parseInt(minStr, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Invalid minutes amount.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/omnichannel/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_minutes', orgId, minutes })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.refresh();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Action failed');
    }
    setLoading(false);
  };

  return (
    <div className="space-x-2">
      <button 
        onClick={handleToggleSocial}
        disabled={loading}
        className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors font-medium disabled:opacity-50"
      >
        {isSocialActive ? 'Freeze Social' : 'Unfreeze Social'}
      </button>
      <button 
        onClick={handleAddMinutes}
        disabled={loading}
        className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1.5 rounded hover:bg-orange-100 transition-colors font-medium disabled:opacity-50"
      >
        Add Mins
      </button>
    </div>
  );
}
