'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssignPackageClient({ organizations, packages }: { organizations: {id:string, name:string}[], packages: {id:string, name:string, minutes:number, calculatedPrice:number}[] }) {
  const router = useRouter();
  const [orgId, setOrgId] = useState(organizations[0]?.id || '');
  const [pkgId, setPkgId] = useState(packages[0]?.id || '');
  const [msg, setMsg] = useState('');

  const selectedPkg = packages.find(p => p.id === pkgId);

  const handleAssign = async () => {
    try {
      const res = await fetch('/api/admin/packages/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId, packageId: pkgId })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Assigned successfully!');
      router.refresh();
    } catch (e: unknown) { if (e instanceof Error)
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded border space-y-4">
      <div>
        <label className="block mb-1">Organization</label>
        <select value={orgId} onChange={e => setOrgId(e.target.value)} className="w-full border p-2 rounded">
          {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block mb-1">Package</label>
        <select value={pkgId} onChange={e => setPkgId(e.target.value)} className="w-full border p-2 rounded">
          {packages.map(p => <option key={p.id} value={p.id}>{p.name} ({p.minutes} mins - Rs. {p.calculatedPrice})</option>)}
        </select>
      </div>
      {selectedPkg && (
        <div className="p-4 bg-gray-50 border rounded">
          <p><strong>Minutes:</strong> {selectedPkg.minutes}</p>
          <p><strong>Price:</strong> Rs. {selectedPkg.calculatedPrice}</p>
        </div>
      )}
      {msg && <div className="text-blue-600">{msg}</div>}
      <button onClick={handleAssign} className="bg-blue-600 text-slate-900 dark:text-white px-4 py-2 rounded">Confirm Assignment</button>
    </div>
  );
}
