
'use client';
import React, { useState } from 'react';
import { Layers, CheckCircle2, AlertCircle, Building2, MessageSquare, Webhook, Phone, Settings, Save, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';


export const Icons = {
  WhatsApp: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  Messenger: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.954l-3.046-3.266-5.963 3.266 6.554-6.963 3.125 3.266 5.882-3.266-6.552 6.963z"/>
    </svg>
  ),
  Instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  TikTok: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  Telegram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.282-.346-.086l-6.4 4.024-2.76-.86c-.6-.185-.613-.6.125-.89l10.81-4.167c.5-.19.95.115.794.908z"/>
    </svg>
  )
};


export default function OmnichannelAdminClient({ organizations, initialIntegrations }: { organizations: any[], initialIntegrations: any[] }) {
  const router = useRouter();
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('WHATSAPP');
  const [saving, setSaving] = useState(false);
  
  const [credentials, setCredentials] = useState({
    phone_number_id: '',
    access_token: '',
    webhook_secret: ''
  });

  const providers = [
    { id: 'WHATSAPP', name: 'WhatsApp Business', icon: Icons.WhatsApp, color: 'text-green-500' },
    { id: 'MESSENGER', name: 'FB Messenger', icon: Icons.Messenger, color: 'text-blue-500' },
    { id: 'INSTAGRAM', name: 'Instagram DMs', icon: Icons.Instagram, color: 'text-pink-500' },
    { id: 'TIKTOK', name: 'TikTok Shop & DMs', icon: Icons.TikTok, color: 'text-black dark:text-white' },
    { id: 'TELEGRAM', name: 'Telegram Bot', icon: Icons.Telegram, color: 'text-sky-500' },
    { id: 'CUSTOM_WEBHOOK', name: 'Custom Webhook', icon: Webhook, color: 'text-slate-500' },
  ];

  const pendingRequests = initialIntegrations.filter(i => i.status === 'PENDING');

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!selectedOrgId) return alert('Select Organization First');
    setSaving(true);
    
    try {
      const res = await fetch('/api/admin/omnichannel/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: selectedOrgId,
          provider: selectedProvider,
          credentials
        })
      });
      if (res.ok) {
        alert('Integration Approved and Activated Successfully!');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert('Error: ' + errorData.error);
      }
    } catch (error) {
      console.error(error);
      alert('Network Error');
    }
    setSaving(false);
  };

  const selectedOrg = organizations.find(o => o.id === selectedOrgId);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex-none p-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Omnichannel Master Control</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage pending requests and social API credentials for clients.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Organization & Provider Selection */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending Requests Panel */}
          {pendingRequests.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" /> Pending Requests ({pendingRequests.length})
              </h3>
              <div className="space-y-3">
                {pendingRequests.map(req => {
                  const pInfo = providers.find(p => p.id === req.provider) || providers[0];
                  return (
                    <div key={req.id} className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-amber-100 dark:border-amber-800/30 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <pInfo.icon className={`w-4 h-4 ${pInfo.color}`} />
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{pInfo.name}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Org: <span className="font-semibold text-slate-700 dark:text-slate-300">{req.organization?.name || 'Unknown'}</span></p>
                      <p className="text-xs text-slate-500 mb-3">Requested By: <span className="font-semibold text-slate-700 dark:text-slate-300">{req.requestedBy || 'Unknown User'}</span></p>
                      <button 
                        onClick={() => {
                          setSelectedOrgId(req.organizationId);
                          setSelectedProvider(req.provider);
                        }}
                        className="w-full py-1.5 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        Review & Approve <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" /> Target Organization
            </h3>
            <select
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select Client Organization --</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/50">
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Select Provider</h3>
             </div>
             <div className="p-2 space-y-1">
               {providers.map(p => {
                 const isSelected = selectedProvider === p.id;
                 const PIcon = p.icon;
                 return (
                   <button
                     key={p.id}
                     onClick={() => setSelectedProvider(p.id)}
                     className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isSelected ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                   >
                     <PIcon className={`w-5 h-5 ${p.color}`} />
                     <span className="text-sm">{p.name}</span>
                     {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                   </button>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Right Column: Configuration Form */}
        <div className="lg:col-span-8">
          {selectedOrgId ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-500" />
                    Configure {providers.find(p => p.id === selectedProvider)?.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    for <span className="font-bold text-slate-700 dark:text-slate-300">{selectedOrg?.name}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1">
                <form id="integration-form" onSubmit={handleSave} className="space-y-5">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 p-4 rounded-xl text-sm border border-indigo-100 dark:border-indigo-800/50 flex gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>Enter the official API credentials provided by Meta/Provider. These keys will be encrypted securely. <b>Once saved, this will automatically Approve any pending requests and set the status to ACTIVE.</b></p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number ID / Page ID</label>
                    <input 
                      required
                      type="text" 
                      value={credentials.phone_number_id}
                      onChange={e => setCredentials({...credentials, phone_number_id: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      placeholder="e.g. 102345678901234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Permanent Access Token</label>
                    <textarea 
                      required
                      value={credentials.access_token}
                      onChange={e => setCredentials({...credentials, access_token: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      placeholder="EAAI..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Webhook Verify Token</label>
                    <input 
                      required
                      type="text" 
                      value={credentials.webhook_secret}
                      onChange={e => setCredentials({...credentials, webhook_secret: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      placeholder="A secure random string..."
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-2xl flex justify-end">
                <button 
                  type="submit" 
                  form="integration-form"
                  disabled={saving}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Save & Approve
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 border-dashed dark:border-white/10 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Organization Selected</h3>
              <p className="text-slate-500 max-w-sm">Please select a client organization from the left panel to configure or approve their API integrations.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
