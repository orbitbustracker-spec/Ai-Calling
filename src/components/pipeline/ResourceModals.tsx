import React, { useState } from 'react';
import { X, Bot, Link as LinkIcon, FileText, Users, Plus, UploadCloud, Settings, Edit3, Save } from 'lucide-react';

export function ResourceModals({ activeResource, onClose }: { activeResource: string | null, onClose: () => void }) {
  const [editingScript, setEditingScript] = useState<number | null>(null);
  const [scriptText, setScriptText] = useState('');
  
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Pricing_Sheet_2026.pdf', status: 'Processed' },
    { name: 'FAQ_Customer_Support.docx', status: 'Processed' }
  ]);

  if (!activeResource) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles([...uploadedFiles, { name: e.target.files[0].name, status: 'Processing...' }]);
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => f.name === e.target.files![0].name ? { ...f, status: 'Processed' } : f));
      }, 2000);
    }
  };

  const handleScriptSave = () => {
    alert("Script saved successfully!");
    setEditingScript(null);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-8">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[700px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            {activeResource === 'prompts' && <Bot className="text-indigo-400 w-6 h-6" />}
            {activeResource === 'integrations' && <LinkIcon className="text-emerald-400 w-6 h-6" />}
            {activeResource === 'knowledge' && <FileText className="text-orange-400 w-6 h-6" />}
            {activeResource === 'contacts' && <Users className="text-sky-400 w-6 h-6" />}
            <h2 className="text-xl font-bold text-white capitalize">
              {activeResource === 'prompts' && 'AI Prompts & Scripts'}
              {activeResource === 'integrations' && 'Integrations & API Connections'}
              {activeResource === 'knowledge' && 'Knowledge Base & Documents'}
              {activeResource === 'contacts' && 'Contact Lists & Segments'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {activeResource === 'prompts' && (
            <div className="space-y-6">
              {!editingScript ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">Script Library</h3>
                    <button 
                      onClick={() => { setEditingScript(99); setScriptText(''); }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> New Script
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group relative">
                          <h4 className="font-bold text-white mb-2">Outbound Sales Greeting {i}</h4>
                          <p className="text-sm text-white/50 line-clamp-2">"Hi, this is Sarah from Voice AI. I noticed you recently downloaded our guide on..."</p>
                          <button 
                            onClick={() => { setEditingScript(i); setScriptText("Hi, this is Sarah from Voice AI. I noticed you recently downloaded our guide on..."); }}
                            className="absolute top-4 right-4 p-2 bg-indigo-500/20 text-indigo-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-500/40"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                     ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">{editingScript === 99 ? 'Create New Script' : `Edit Script ${editingScript}`}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingScript(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold">Cancel</button>
                      <button onClick={handleScriptSave} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Script
                      </button>
                    </div>
                  </div>
                  <textarea 
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    className="flex-1 w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 resize-none outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Type your AI script here..."
                  />
                </div>
              )}
            </div>
          )}

          {activeResource === 'integrations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 group">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        Asterisk v20
                      </h4>
                      <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase">Connected</div>
                    </div>
                    <p className="text-sm text-white/50">Primary telephony node for AI voice generation and outbound dialing.</p>
                    <div className="pt-4 border-t border-white/5 hidden group-hover:block space-y-3">
                       <div>
                         <label className="text-[10px] uppercase text-white/50 font-bold mb-1 block">API Key</label>
                         <input type="password" value="******************" readOnly className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70" />
                       </div>
                    </div>
                    <button onClick={() => alert('Settings Modal Opened')} className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2">
                      <Settings className="w-4 h-4" /> Configure Settings
                    </button>
                 </div>

                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white">HubSpot CRM</h4>
                      <div className="px-2 py-1 bg-white/10 text-white/50 text-[10px] font-bold rounded uppercase">Not Connected</div>
                    </div>
                    <p className="text-sm text-white/50">Sync contacts, notes, and call recordings automatically to your CRM.</p>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                       <div>
                         <label className="text-[10px] uppercase text-white/50 font-bold mb-1 block">OAuth Client ID</label>
                         <input type="text" placeholder="Enter Client ID" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30" />
                       </div>
                    </div>
                    <button onClick={() => alert('Redirecting to OAuth...')} className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-xl text-sm font-semibold transition-colors">
                      Connect with OAuth
                    </button>
                 </div>

              </div>
            </div>
          )}

          {activeResource === 'knowledge' && (
            <div className="h-full flex flex-col gap-6 max-w-2xl mx-auto">
              
              <div className="flex-1 flex flex-col gap-6">
                <label className="border-2 border-dashed border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-orange-500/50 transition-all cursor-pointer group flex-1">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-white/50 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Upload Documents</h3>
                  <p className="text-sm text-white/50 max-w-sm">Drag and drop PDFs, Text files, or click to browse files.</p>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.txt,.docx,.csv" />
                </label>
                
                <div className="h-48 overflow-y-auto pr-2">
                  <h4 className="font-bold text-white mb-3 text-sm">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-orange-400" /> 
                          <span className="text-sm font-medium text-white/90 truncate max-w-[400px]">{file.name}</span>
                        </div>
                        <span className={`text-xs ${file.status === 'Processed' ? 'text-emerald-400' : 'text-orange-400 animate-pulse'}`}>{file.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeResource === 'contacts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Segments & Lists</h3>
                <button onClick={() => alert('Opening CSV Uploader...')} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Import CSV
                </button>
              </div>
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-white/70">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-bold text-white/50">
                    <tr><th className="p-4">List Name</th><th className="p-4">Records</th><th className="p-4">Last Updated</th><th className="p-4">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="p-4 font-medium text-white">Q3 Outbound Tech Leads</td>
                      <td className="p-4">18,423</td>
                      <td className="p-4">2 hours ago</td>
                      <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded font-bold uppercase">Ready</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="p-4 font-medium text-white">Lost Deals 2025 Re-engagement</td>
                      <td className="p-4">1,204</td>
                      <td className="p-4">3 days ago</td>
                      <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded font-bold uppercase">Ready</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
