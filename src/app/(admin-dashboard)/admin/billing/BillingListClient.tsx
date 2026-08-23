'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Coins, Clock, ChevronDown, ChevronUp, PlusCircle, Activity } from 'lucide-react';

export default function BillingListClient({ orgs }: { orgs: any[] }) {
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);

  const toggleOrg = (id: string) => {
    setExpandedOrg(expandedOrg === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {orgs.map((org) => (
        <div key={org.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div 
            onClick={() => toggleOrg(org.id)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
                {org.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{org.name}</h3>
                <p className="text-sm text-gray-500">
                  Remaining: {org.organizationBalance?.remainingMinutes || 0} Minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${(org.organizationBalance?.remainingMinutes || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {(org.organizationBalance?.remainingMinutes || 0) > 0 ? 'Active Balance' : 'Zero Balance'}
              </span>
              {expandedOrg === org.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </div>
          </div>

          {expandedOrg === org.id && (
            <div className="border-t border-gray-100 p-6 bg-gray-50/50">
              <BillingDetailPanel org={org} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BillingDetailPanel({ org }: { org: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addMinutes, setAddMinutes] = useState<number | ''>('');
  
  // Rate: 5 Rs per minute
  const RATE_PER_MINUTE = 5;
  const calculatedCost = addMinutes ? Number(addMinutes) * RATE_PER_MINUTE : 0;

  const handleAddBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addMinutes || addMinutes <= 0) return;
    
    setLoading(true);
    const res = await fetch(`/api/admin/organizations/${org.id}/adjust-balance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        adjustment: Number(addMinutes),
        reason: `Manually added ${addMinutes} mins (Rs. ${calculatedCost}) via Billing Panel.`
      })
    });

    if (res.ok) {
      alert("Balance added successfully!");
      setAddMinutes('');
      router.refresh();
    } else {
      alert("Failed to add balance.");
    }
    setLoading(false);
  };

  // Calculate total spent based on deduct transactions
  const totalSpentMinutes = org.billingTransactions
    ?.filter((t: any) => t.type === 'DEDUCTION')
    ?.reduce((sum: number, t: any) => sum + Math.abs(t.minutes), 0) || 0;
  
  const totalSpentMoney = totalSpentMinutes * RATE_PER_MINUTE;

  const currentMinutes = org.organizationBalance?.remainingMinutes || 0;
  const currentMoneyValue = currentMinutes * RATE_PER_MINUTE;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Overview Stats */}
      <div className="space-y-6">
        <h4 className="font-bold text-gray-800 border-b pb-2">Billing Overview</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500 flex items-center gap-2"><Activity className="h-4 w-4 text-blue-500" /> Total Spent</p>
            <p className="text-2xl font-bold mt-1 text-gray-800">Rs. {totalSpentMoney}</p>
            <p className="text-xs text-gray-400 mt-1">{totalSpentMinutes} Minutes used</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500 flex items-center gap-2"><Coins className="h-4 w-4 text-green-500" /> Current Value</p>
            <p className="text-2xl font-bold mt-1 text-gray-800">Rs. {currentMoneyValue}</p>
            <p className="text-xs text-gray-400 mt-1">{currentMinutes} Minutes left</p>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-sm text-gray-700 mb-2">Recent Transactions</h5>
          <div className="bg-white border rounded-lg max-h-48 overflow-y-auto">
            {org.billingTransactions?.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="divide-y text-sm">
                {org.billingTransactions?.slice(0, 5).map((t: any) => (
                  <li key={t.id} className="p-3 flex justify-between">
                    <span>
                      <span className={`font-medium ${t.type === 'ADDITION' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'ADDITION' ? '+' : '-'}{Math.abs(t.minutes)} mins
                      </span>
                      <span className="text-gray-500 ml-2 text-xs">{new Date(t.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="text-gray-600 text-xs bg-gray-100 px-2 py-0.5 rounded">{t.description || t.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Manual Top-up */}
      <div className="bg-white border rounded-xl shadow-sm p-6 self-start">
        <h4 className="font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-indigo-600" /> Manual Top-up
        </h4>
        
        <form onSubmit={handleAddBalance} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Add Minutes</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="number"
                min="1"
                required
                value={addMinutes}
                onChange={(e) => setAddMinutes(e.target.value ? Number(e.target.value) : '')}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. 500"
              />
            </div>
            <p className="text-xs text-gray-500">Platform rate is Rs. {RATE_PER_MINUTE} per minute.</p>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-indigo-800">Total Calculated Cost:</span>
            <span className="text-2xl font-bold text-indigo-700">Rs. {calculatedCost}</span>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !addMinutes}
            className="w-full bg-indigo-600 text-white font-bold hover:bg-indigo-700"
          >
            {loading ? 'Adding...' : 'Confirm & Add Balance'}
          </Button>
        </form>
      </div>
    </div>
  );
}
