'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Search, Edit, X, Save, MessageSquare, Phone, Shield, Plus, Link as LinkIcon } from 'lucide-react';

const SOCIAL_PLATFORMS = {
  WHATSAPP: { 
    name: 'WhatsApp Cloud API', 
    fields: [
      { id: 'wa_token', label: 'Access Token', placeholder: 'EAAGm...' },
      { id: 'wa_phone_id', label: 'Phone Number ID', placeholder: '103...' }
    ]
  },
  MESSENGER: { 
    name: 'Facebook Messenger', 
    fields: [
      { id: 'fb_token', label: 'Page Access Token', placeholder: 'EAA...' },
      { id: 'fb_page_id', label: 'Page ID', placeholder: '109...' }
    ]
  },
  INSTAGRAM: { 
    name: 'Instagram Graph API', 
    fields: [
      { id: 'ig_token', label: 'Access Token', placeholder: 'IGQ...' }
    ]
  },
  TELEGRAM: { 
    name: 'Telegram Bot API', 
    fields: [
      { id: 'tg_token', label: 'Bot Token', placeholder: '123456:ABC-DEF...' }
    ]
  },
  VIBER: { 
    name: 'Viber Business', 
    fields: [
      { id: 'vb_token', label: 'Auth Token', placeholder: '4b0...' }
    ]
  }
};

export default function AdminCapabilitiesView({ organizations }: { organizations: any[] }) {
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Dynamic Social Media States
  const [selectedPlatform, setSelectedPlatform] = useState<keyof typeof SOCIAL_PLATFORMS>('WHATSAPP');
  const [platformData, setPlatformData] = useState<Record<string, string>>({});
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const openModal = (org: any) => {
    setSelectedOrg(org);
    setModalOpen(true);
    
    // Attempt to parse existing configurations if they exist (Mocking for now)
    setConnectedPlatforms(['WHATSAPP']); // Simulate WhatsApp being connected
    setPlatformData({
      wa_token: 'EAAGm_mock_token_xyz',
      wa_phone_id: '103847293'
    });
  };

  const handleFieldChange = (id: string, value: string) => {
    setPlatformData(prev => ({ ...prev, [id]: value }));
  };

  const handleConnect = () => {
    if (!connectedPlatforms.includes(selectedPlatform)) {
      setConnectedPlatforms(prev => [...prev, selectedPlatform]);
    }
    alert(`Connected ${SOCIAL_PLATFORMS[selectedPlatform].name} Successfully!`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Organizations Configuration Matrix</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search organizations..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Organization</th>
                <th className="p-4 font-semibold">Social AI Status</th>
                <th className="p-4 font-semibold">WhatsApp Call</th>
                <th className="p-4 font-semibold">Voice Broadcast</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {organizations.map(org => (
                <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{org.name}</td>
                  <td className="p-4">
                    {org.isOmnichannelActive 
                      ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium"><CheckCircle className="h-3.5 w-3.5"/> Active</span> 
                      : <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium"><XCircle className="h-3.5 w-3.5"/> Locked</span>}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">Unconfigured</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">Unconfigured</span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openModal(org)} className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium text-sm transition-colors inline-flex items-center gap-2">
                      <Edit className="h-4 w-4" /> Manage Config
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && selectedOrg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-2xl shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Integration Configurations</h2>
                <p className="text-sm text-gray-500 mt-1">Editing global configuration for <span className="font-semibold text-indigo-600">{selectedOrg.name}</span></p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-xl text-gray-500 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-white grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Column 1: Social Media Credentials */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg text-gray-900">Social Media Connect</h3>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 mb-2">Select Platform</label>
                    <select 
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value as keyof typeof SOCIAL_PLATFORMS)}
                      className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-gray-900 font-medium"
                    >
                      {Object.entries(SOCIAL_PLATFORMS).map(([key, platform]) => (
                        <option key={key} value={key}>{platform.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3 pt-2">
                    {SOCIAL_PLATFORMS[selectedPlatform].fields.map(field => (
                      <div key={field.id}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                        <input 
                          type="text" 
                          value={platformData[field.id] || ''} 
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder} 
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleConnect}
                    className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-slate-900 dark:text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <LinkIcon className="h-4 w-4" /> Connect {SOCIAL_PLATFORMS[selectedPlatform].name}
                  </button>
                </div>

                {/* Connected Platforms List */}
                {connectedPlatforms.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">Active Integrations</h4>
                    {connectedPlatforms.map(platformKey => (
                      <div key={platformKey} className="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-800">{SOCIAL_PLATFORMS[platformKey as keyof typeof SOCIAL_PLATFORMS].name}</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Connected</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Column 2: Telephony & Gatekeeper */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-4">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg text-gray-900">Access & Billing Overrides</h3>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Omnichannel Active Status</h4>
                      <p className="text-xs text-gray-500 mt-1">Currently: {selectedOrg.isOmnichannelActive ? 'Unlocked' : 'Frozen due to balance'}</p>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium shrink-0 ${selectedOrg.isOmnichannelActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                      {selectedOrg.isOmnichannelActive ? 'Force Freeze' : 'Force Unlock'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-4 mt-8">
                  <Phone className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg text-gray-900">SIP & Telephony</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom SIP Domain / PBX IP</label>
                    <input 
                      type="text" 
                      placeholder="sip.nexus.com or 192.168.1.50" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-end gap-3 shrink-0">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={() => { alert('Configurations Saved Successfully'); setModalOpen(false); }} className="px-5 py-2.5 bg-indigo-600 text-slate-900 dark:text-white font-medium hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
