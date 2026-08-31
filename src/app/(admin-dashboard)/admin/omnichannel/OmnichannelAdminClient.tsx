'use client';
import React, { useState } from 'react';
import { Layers, CheckCircle2, AlertCircle, Building2, MessageSquare, Instagram, Webhook, Phone, Settings, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OmnichannelAdminClient({ organizations, initialIntegrations }: { organizations: any[], initialIntegrations: any[] }) {
  const router = useRouter();
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('WHATSAPP');
  const [saving, setSaving] = useState(false);
  
  const [credentials, setCredentials] = useState<any>({
    phone_number_id: '',
    access_token: '',
    webhook_secret: ''
  });

  const providers = [
    { id: 'WHATSAPP', name: 'WhatsApp Business', icon: Phone },
    { id: 'MESSENGER', name: 'FB Messenger', icon: MessageSquare },
    { id: 'INSTAGRAM', name: 'Instagram DMs', icon: Instagram },
    { id: 'CUSTOM_WEBHOOK', name: 'Custom Webhook', icon: Webhook },
  ];

  const handleSave = async (e: React.FormEvent) => {
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
        alert('Integration Configured and Activated Successfully!');
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

  const getIntegrationForProvider = (provider: string) => {
    return initialIntegrations.find(i => i.organizationId === selectedOrgId && i.provider === provider);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Layers className="w-8 h-8 text-indigo-600" /> Super Admin Omnichannel Hub
        </h1>
        <p className="text-slate-500 mt-2">Activate and configure social API credentials for clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Org & Provider Select */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" /> Target Organization
            </label>
            <select 
              value={selectedOrgId}
              onChange={(e) => {
                setSelectedOrgId(e.target.value);
                setCredentials({ phone_number_id: '', access_token: '', webhook_secret: '' });
              }}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select Client Organization --</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/10 font-bold text-slate-700 dark:text-slate-300">
              Select Provider to Activate
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {providers.map(prov => {
                const isConfigured = !!getIntegrationForProvider(prov.id);
                const Icon = prov.icon;
                return (
                  <button 
                    key={prov.id}
                    onClick={() => {
                       setSelectedProvider(prov.id);
                       const existing = getIntegrationForProvider(prov.id);
                       if (existing && existing.credentials) {
                         setCredentials(existing.credentials);
                       } else {
                         setCredentials({ phone_number_id: '', access_token: '', webhook_secret: '' });
                       }
                    }}
                    className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${selectedProvider === prov.id ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${selectedProvider === prov.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className={`font-medium ${selectedProvider === prov.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}>
                        {prov.name}
                      </span>
                    </div>
                    {isConfigured && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Credentials Form */}
        <div className="col-span-1 lg:col-span-2">
          {selectedOrgId ? (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
               <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-white/10">
                 <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
                   <Settings className="w-6 h-6" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white">Configure {selectedProvider}</h2>
                   <p className="text-slate-500 text-sm">Enter API credentials to activate this channel for the client.</p>
                 </div>
               </div>

               <form onSubmit={handleSave} className="space-y-6">
                 {/* WhatsApp Specific Fields */}
                 {selectedProvider === 'WHATSAPP' && (
                   <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">WhatsApp Phone Number ID</label>
                      <input 
                        required 
                        value={credentials.phone_number_id} 
                        onChange={e=>setCredentials({...credentials, phone_number_id: e.target.value})}
                        placeholder="e.g. 1029384756" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">System User Access Token (Permanent Token)</label>
                      <input 
                        required 
                        type="password"
                        value={credentials.access_token} 
                        onChange={e=>setCredentials({...credentials, access_token: e.target.value})}
                        placeholder="EAAG..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Webhook Secret Verify Token</label>
                      <input 
                        required 
                        value={credentials.webhook_secret} 
                        onChange={e=>setCredentials({...credentials, webhook_secret: e.target.value})}
                        placeholder="my_super_secret_verify_token" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono text-sm"
                      />
                    </div>
                   </>
                 )}

                 {/* FB Messenger / Instagram Fields */}
                 {(selectedProvider === 'MESSENGER' || selectedProvider === 'INSTAGRAM') && (
                   <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Page ID / Account ID</label>
                      <input 
                        required 
                        value={credentials.phone_number_id} 
                        onChange={e=>setCredentials({...credentials, phone_number_id: e.target.value})}
                        placeholder="ID..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Page Access Token</label>
                      <input 
                        required 
                        type="password"
                        value={credentials.access_token} 
                        onChange={e=>setCredentials({...credentials, access_token: e.target.value})}
                        placeholder="EAAG..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono text-sm"
                      />
                    </div>
                   </>
                 )}

                 <div className="pt-6">
                   <button 
                     disabled={saving}
                     type="submit" 
                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                   >
                     <Save className="w-5 h-5" />
                     {saving ? 'Saving & Activating...' : `Activate ${selectedProvider} Integration`}
                   </button>
                 </div>
               </form>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/10 border-dashed text-center">
               <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
               <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Organization Selected</h3>
               <p className="text-slate-500 max-w-sm">Please select a client organization from the left panel to configure their API integrations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
