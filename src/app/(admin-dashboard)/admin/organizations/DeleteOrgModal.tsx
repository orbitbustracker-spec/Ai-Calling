'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteOrgModal({ orgId, orgName }: { orgId: string, orgName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmName, setConfirmName] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/organizations/${orgId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    
    if (res.ok) {
      setIsOpen(false);
      router.refresh();
    } else {
      alert("Failed to delete organization.");
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-sm font-medium text-red-600 hover:underline">
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="bg-red-50 p-5 border-b border-red-100 flex justify-between items-center">
              <div className="flex items-center gap-3 text-red-700 font-bold text-lg">
                <AlertTriangle className="h-6 w-6" />
                Delete Organization
              </div>
              <button onClick={() => setIsOpen(false)} className="text-red-400 hover:text-red-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-700">
                You are about to permanently delete the organization <strong className="text-black">{orgName}</strong>. 
                This action cannot be undone. All data, users, and billing logs will be removed.
              </p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Please type <strong>{orgName}</strong> to confirm:
                </label>
                <input 
                  type="text" 
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={orgName}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Reason for deletion:
                </label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. Account closed"
                  rows={2}
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button onClick={() => setIsOpen(false)} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Cancel
                </Button>
                <Button 
                  onClick={handleDelete} 
                  disabled={confirmName !== orgName || !reason || loading}
                  className="bg-red-600 text-slate-900 dark:text-white hover:bg-red-700 disabled:opacity-50 flex items-center"
                >
                  {loading ? 'Deleting...' : <><Trash2 className="h-4 w-4 mr-2" /> Delete Project</>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
