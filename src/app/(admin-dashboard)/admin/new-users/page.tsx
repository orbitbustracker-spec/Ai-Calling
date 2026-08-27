'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { Building, Globe, Mail, Phone, User, CheckCircle2, XCircle, Users, Settings, Edit, Trash2 } from 'lucide-react';

export default function NewUsersPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending');
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editRole, setEditRole] = useState('');
  const [editOrgId, setEditOrgId] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch pending
    const resPending = await fetch('/api/admin/new-users');
    if (resPending.ok) {
      const data = await resPending.json();
      setPendingUsers(data.users || []);
    }
    
    // Fetch active
    const resActive = await fetch('/api/admin/users');
    if (resActive.ok) {
      const data = await resActive.json();
      setActiveUsers(data.users || []);
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

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: editRole, organizationId: editOrgId || null })
    });
    if (res.ok) {
      setEditingUser(null);
      fetchUsers();
    } else {
      alert("Error updating user.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchUsers();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Users className="w-8 h-8" />
            </span>
            Users & Approvals
          </h1>
          <p className="text-gray-500 mt-2">Manage pending registrations and active admin users.</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'pending' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Pending Registrations ({pendingUsers.length})
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'active' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Active Users ({activeUsers.length})
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading data...</div>
      ) : activeTab === 'pending' ? (
        pendingUsers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">All Caught Up</h3>
            <p className="text-gray-500 mt-2">There are no pending user registrations right now.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingUsers.map(user => (
              <div key={user.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName} <span className="text-sm font-normal text-gray-500">({user.jobTitle})</span></h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Building className="h-4 w-4" /> {user.companyName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Contact</p>
                      <p className="text-sm font-medium flex items-center gap-2 dark:text-gray-300"><Mail className="h-4 w-4 text-gray-400" /> {user.email}</p>
                      <p className="text-sm font-medium flex items-center gap-2 dark:text-gray-300"><Phone className="h-4 w-4 text-gray-400" /> {user.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Website</p>
                      <a href={user.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                        <Globe className="h-4 w-4" /> {user.website}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Setup Type</p>
                      <span className="inline-flex px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-md">
                        {user.pbxProfile.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Button onClick={() => alert("Request Rejected")} className="bg-red-50 hover:bg-red-100 text-red-600 font-medium border border-red-200 px-6 py-2">
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </Button>
                  <Button onClick={() => handleApprove(user.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 shadow">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Notify
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Organization</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {activeUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{user.name || 'No Name'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'ORGANIZATION_ADMIN' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {user.organization?.name || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => {
                        setEditingUser(user);
                        setEditRole(user.role);
                        setEditOrgId(user.organizationId || '');
                      }} className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm">
           <form onSubmit={handleUpdateUser} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit User Role</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="text" disabled value={editingUser.email} className="w-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select value={editRole} onChange={e => setEditRole(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none">
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ORGANIZATION_ADMIN">Organization Admin</option>
                    <option value="SUPERVISOR">Supervisor</option>
                    <option value="AGENT">Agent</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization ID (Optional)</label>
                  <input type="text" value={editOrgId} onChange={e => setEditOrgId(e.target.value)} placeholder="UUID" className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white outline-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button type="button" onClick={() => setEditingUser(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Cancel</Button>
                <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold">Save Changes</Button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
}
