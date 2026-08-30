'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Plus, Server, Phone, Lock, X, Eye, EyeOff, Info, Activity, Building2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TelephonyClient({ initialTrunks, organizations }: { initialTrunks: any[], organizations: any[] }) {
  const [trunks, setTrunks] = useState(initialTrunks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    organizationId: '',
    providerLabel: '', 
    host: '', port: '5060', outboundProxy: '',
    transport: 'UDP', username: '', password: '', didNumbers: '',
    maxConcurrentCalls: '10',
    inboundExtension: '',
    audioCodec: 'PCMU'
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizationId) {
      alert("Please select an organization");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/providers/telephony', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      console.error(e);
      alert('Error saving SIP Trunk');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SIP Trunk?')) return;
    try {
      const res = await fetch(`/api/admin/providers/telephony?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      alert('Failed to delete');
    }
  }

  return (
    <div className="h-full flex flex-col gap-6 text-slate-700 dark:text-slate-300">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Phone className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /> Organization SIP Trunks
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Map SIP trunks to specific organizations so incoming calls go to the correct AI engine.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-white gap-2 font-bold rounded-xl px-5 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
          <Plus className="w-4 h-4" /> Add SIP Trunk
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col flex-1 shadow-sm">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-gray-50 dark:bg-slate-950/50 border-b border-gray-200 dark:border-white/10 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
            <tr>
              <th className="p-5">Organization</th>
              <th className="p-5">Provider / Label</th>
              <th className="p-5">Host</th>
              <th className="p-5">Username</th>
              <th className="p-5">DIDs</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trunks.map(trunk => (
              <tr key={trunk.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-5 font-bold text-indigo-300 flex items-center gap-2"><Building2 className="w-4 h-4"/>{trunk.organization?.name || 'Unknown'}</td>
                <td className="p-5 font-bold text-slate-900 dark:text-white">{trunk.providerLabel}</td>
                <td className="p-5 font-mono text-emerald-400">{trunk.host}:{trunk.port}</td>
                <td className="p-5">{trunk.username}</td>
                <td className="p-5 font-mono">
                  {trunk.didsJson ? (() => { try { return Array.isArray(trunk.didsJson) ? trunk.didsJson.join(', ') : (typeof trunk.didsJson === 'string' ? (trunk.didsJson.startsWith('[') ? JSON.parse(trunk.didsJson).join(', ') : trunk.didsJson) : ''); } catch (e) { return String(trunk.didsJson); } })() : ''}
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => handleDelete(trunk.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {trunks.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  <Server className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  No SIP Trunks configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-900/90 z-10 shrink-0">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Add SIP Trunk
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
              {/* Left Column: Form */}
              <div className="flex-1 space-y-6">
                
                {/* Ownership Assignment */}
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-lg">
                      <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">Ownership Assignment</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Assign this trunk to a client or organization.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Client (Organization) *</label>
                    <select 
                      required
                      value={formData.organizationId}
                      onChange={e => setFormData({...formData, organizationId: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Select Client</option>
                      {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bot Configuration */}
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">Bot Configuration</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Set up provider, trunk name and call type.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">BOT Provider *</label>
                      <select className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500">
                        <option value="">Select BOT Provider</option>
                        <option value="ELEVENLABS">ELEVENLABS</option>
                        <option value="RETELL">RETELL</option>
                        <option value="CUSTOM">Custom AI Engine</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Trunk Name *</label>
                      <input required placeholder="e.g., Production Trunk" value={formData.providerLabel} onChange={e => setFormData({...formData, providerLabel: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Inbound Extension / DNIS</label>
                      <input placeholder="e.g. 2" value={formData.inboundExtension} onChange={e => setFormData({...formData, inboundExtension: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" />
                      <p className="text-[10px] text-slate-500 mt-1">PABX sends this extension</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Audio Codec *</label>
                      <select required value={formData.audioCodec} onChange={e => setFormData({...formData, audioCodec: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500">
                        <option value="PCMU">PCMU / G.711u</option>
                        <option value="PCMA">PCMA / G.711a</option>
                        <option value="OPUS">Opus</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Status *</label>
                      <select className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500">
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Peer Monitoring</label>
                      <div className="flex items-center gap-3 mt-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                        </label>
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Disabled <span className="text-xs text-slate-500 block">Sends periodic OPTIONS pings.</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Configuration (Old fields) */}
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Connection Details</h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="col-span-3">
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">SIP Host / IP *</label>
                      <input required placeholder="10.x.x.x or sip.provider.com" value={formData.host} onChange={e => setFormData({...formData, host: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Port *</label>
                      <input required type="number" value={formData.port} onChange={e => setFormData({...formData, port: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Auth Username *</label>
                      <input required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Auth Password *</label>
                      <div className="relative">
                        <input required type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:text-slate-300">
                          {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call Routing Configuration */}
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">Call Routing Configuration</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pick the DIDs that will route calls through this trunk.</p>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-400 text-sm mb-4">
                    <Info className="w-5 h-5 inline mr-2" /> Select a client above to properly route DIDs.
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">DID Numbers *</label>
                      <input required placeholder="+97715000000" value={formData.didNumbers} onChange={e => setFormData({...formData, didNumbers: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Channel Limit *</label>
                      <input required type="number" value={formData.maxConcurrentCalls} onChange={e => setFormData({...formData, maxConcurrentCalls: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500" />
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Right Column: Whitelist & Tech Prefix */}
              <div className="w-full lg:w-96 space-y-6">
                
                {/* Whitelist Configuration */}
                <div className="bg-indigo-600 rounded-xl overflow-hidden shadow-lg border border-indigo-500">
                  <div className="p-4 bg-indigo-700/50 flex items-center gap-3 border-b border-indigo-500/50">
                    <Lock className="w-5 h-5 text-slate-900 dark:text-white" />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Whitelist Configuration</h3>
                      <p className="text-indigo-200 text-xs">Add to your firewall whitelist</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Domain</label>
                      <div className="bg-gray-50 dark:bg-slate-950 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/5 space-y-2">
                        <div className="flex justify-between items-center"><span className="text-slate-900 dark:text-white">sip.nexus.com</span><span className="text-slate-500 text-xs">SIP Signaling</span></div>
                        <div className="flex justify-between items-center"><span className="text-slate-900 dark:text-white">media1.nexus.com</span><span className="text-slate-500 text-xs">Media / Recording</span></div>
                        <div className="flex justify-between items-center"><span className="text-slate-900 dark:text-white">media2.nexus.com</span><span className="text-slate-500 text-xs">Media / Recording</span></div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Port</label>
                      <div className="bg-gray-50 dark:bg-slate-950 rounded-lg p-3 text-sm text-slate-900 dark:text-white font-mono border border-slate-200 dark:border-white/5">
                        5060
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">URI</label>
                      <div className="bg-gray-50 dark:bg-slate-950 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/5 space-y-2">
                        <div className="flex justify-between items-center"><span className="text-slate-900 dark:text-white">sip.nexus.com:5060</span></div>
                        <div className="flex justify-between items-center"><span className="text-slate-900 dark:text-white">media1.nexus.com:3300</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Prefix */}
                <div className="bg-blue-600 rounded-xl overflow-hidden shadow-lg border border-blue-500">
                  <div className="p-4 bg-blue-700/50 flex items-center gap-3 border-b border-blue-500/50">
                    <Server className="w-5 h-5 text-slate-900 dark:text-white" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Tech Prefix</h3>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900">
                    <div className="text-3xl font-bold text-blue-400 mb-4">45454</div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Example SIP Dial String</label>
                    <div className="bg-gray-50 dark:bg-slate-950 rounded-lg p-3 text-sm text-slate-900 dark:text-white font-mono border border-slate-200 dark:border-white/5 break-all">
                      SIP/4545491&lt;mobile_number&gt;@trunk
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shrink-0 flex justify-end gap-3">
              <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white border border-slate-700 px-6 py-2">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white font-bold px-8 py-2 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                {loading ? 'Creating...' : 'Create SIP Trunk'}
              </Button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
