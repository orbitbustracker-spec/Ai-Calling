'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { Building, Globe, Mail, Phone, User, CheckCircle2, XCircle } from 'lucide-react';

export default function NewUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/new-users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await fetch(`/api/admin/new-users/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      alert("User Approved and Email Sent!");
      fetchUsers();
    } else {
      alert("Error approving user.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Registrations</h1>
          <p className="text-gray-500 mt-2">Review new organization requests and verify their website details before approval.</p>
        </div>
      </div>

      {loading ? (
        <div>Loading pending requests...</div>
      ) : users.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">All Caught Up</h3>
          <p className="text-gray-500 mt-2">There are no pending user registrations right now.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName} <span className="text-sm font-normal text-gray-500">({user.jobTitle})</span></h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Building className="h-4 w-4" /> {user.companyName}
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Contact</p>
                    <p className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /> {user.email}</p>
                    <p className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /> {user.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Website</p>
                    <a href={user.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" /> {user.website}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Setup Type</p>
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">
                      {user.pbxProfile.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button onClick={() => alert("Request Rejected")} className="bg-red-50 hover:bg-red-100 text-red-600 font-medium border border-red-200 px-6 py-2">
                  <XCircle className="h-4 w-4 mr-2" /> Reject
                </Button>
                <Button onClick={() => handleApprove(user.id)} className="bg-indigo-600 hover:bg-indigo-700 text-slate-900 dark:text-white font-medium px-6 py-2 shadow">
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Notify
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
