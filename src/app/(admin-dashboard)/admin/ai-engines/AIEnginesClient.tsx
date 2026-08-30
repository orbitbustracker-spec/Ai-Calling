'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Cpu, Network, Plus, 
  TerminalSquare, Activity, Key, Globe,
  Server, Phone, Link2, X
} from 'lucide-react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import TestVoiceAgentModal from './components/TestVoiceAgentModal';

export function AIEnginesClient({ initialGlobalNodes, organizations }: { initialGlobalNodes: any[], organizations: any[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'global-catalog' | 'org-mapping'>('global-catalog');
  
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [savingNode, setSavingNode] = useState(false);
  
  // Create Node Form
  const [nodeForm, setNodeForm] = useState({
    name: '', type: 'LLM', endpoint: '', authKey: '', modelId: ''
  });

  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [orgPipeline, setOrgPipeline] = useState({ llm: '', stt: '', tts: '' });
  const [savingPipeline, setSavingPipeline] = useState(false);

  const llmNodes = initialGlobalNodes.filter(n => n.category === 'LLM');
  const sttNodes = initialGlobalNodes.filter(n => n.category === 'STT');
  const ttsNodes = initialGlobalNodes.filter(n => n.category === 'TTS');

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingNode(true);
    try {
      const res = await fetch('/api/admin/ai-engines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerName: nodeForm.name,
          category: nodeForm.type,
          providerType: 'CUSTOM_OPENSOURCE',
          baseUrl: nodeForm.endpoint,
          apiKey: nodeForm.authKey,
          modelId: nodeForm.modelId || 'default',
          authType: nodeForm.authKey ? 'BEARER_TOKEN' : 'NONE',
          status: 'ACTIVE'
        })
      });
      if (res.ok) {
        setShowNodeModal(false);
        setNodeForm({ name: '', type: 'LLM', endpoint: '', authKey: '', modelId: '' });
        router.refresh();
      } else {
        alert("Failed to save node");
      }
    } catch (e) {
      alert("Error saving");
    } finally {
      setSavingNode(false);
    }
  };

  const handleSavePipeline = async () => {
    if (!selectedOrgId) return alert('Select org first');
    
    // Find the actual nodes
    const llm = initialGlobalNodes.find(n => n.id === orgPipeline.llm);
    const stt = initialGlobalNodes.find(n => n.id === orgPipeline.stt);
    const tts = initialGlobalNodes.find(n => n.id === orgPipeline.tts);

    const nodesToBind = [];
    if (llm) nodesToBind.push({ nodeType: 'LLM', nodeName: llm.providerName, baseUrl: llm.baseUrl, modelId: llm.modelId });
    if (stt) nodesToBind.push({ nodeType: 'STT', nodeName: stt.providerName, baseUrl: stt.baseUrl, modelId: stt.modelId });
    if (tts) nodesToBind.push({ nodeType: 'TTS', nodeName: tts.providerName, baseUrl: tts.baseUrl, modelId: tts.modelId });

    if (nodesToBind.length === 0) return alert('Select at least one engine');

    setSavingPipeline(true);
    try {
      const res = await fetch(`/api/admin/organizations/${selectedOrgId}/ai-nodes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nodesToBind)
      });
      if (res.ok) {
        alert("Pipeline assigned successfully!");
      }
    } catch (e) {
      alert("Failed to bind pipeline.");
    } finally {
      setSavingPipeline(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-200 dark:border-white/10 pb-4 mb-6">
        <button 
          onClick={() => setActiveTab('global-catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'global-catalog' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-700 dark:text-slate-300'}`}
        >
          <Server className="w-4 h-4" /> Global Node Catalog
        </button>
        <button 
          onClick={() => setActiveTab('org-mapping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'org-mapping' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-700 dark:text-slate-300'}`}
        >
          <Link2 className="w-4 h-4" /> Client Assignments
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'global-catalog' && (
          <motion.div key="catalog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-900 dark:text-white">Master AI Catalog</h2>
                <p className="text-sm text-slate-500 dark:text-slate-500 dark:text-slate-400">Configure LLM, STT, and TTS engines once, then reuse them across clients.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => setShowTestModal(true)} className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl py-2 px-4 flex items-center gap-2 transition-all">
                  <span className="text-lg leading-none">🧪</span> Test Voice Pipeline
                </Button>
                <Button onClick={() => setShowNodeModal(true)} className="bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-slate-900 dark:text-white font-bold rounded-xl py-2 px-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Create Global Node
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {initialGlobalNodes.map(node => (
                <div key={node.id} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <TerminalSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-900 dark:text-white">{node.providerName}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-400 font-mono uppercase bg-gray-50 dark:bg-gray-50 dark:bg-slate-950 px-2 py-0.5 rounded mt-1 inline-block">{node.category} ENGINE</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-500 dark:text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex gap-2 truncate"><span className="text-slate-500">URL:</span> {node.baseUrl}</div>
                  </div>
                </div>
              ))}
              {initialGlobalNodes.length === 0 && <p className="text-slate-500">No global nodes found.</p>}
            </div>
          </motion.div>
        )}

        {activeTab === 'org-mapping' && (
          <motion.div key="mapping" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            
            <div className="bg-white dark:bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl p-6">
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">Select Target Client</label>
              <select 
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="w-full max-w-md bg-gray-900/50 dark:bg-gray-900/50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-bold"
              >
                <option value="">-- Choose Organization --</option>
                {organizations.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
              </select>
            </div>

            {selectedOrgId && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/> Assign AI Pipeline</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-1">Assigned LLM Engine</label>
                      <select value={orgPipeline.llm} onChange={e => setOrgPipeline({...orgPipeline, llm: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-900 dark:text-white">
                        <option value="">-- Select LLM --</option>
                        {llmNodes.map(n => <option key={n.id} value={n.id}>{n.providerName}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-1">Assigned STT Engine</label>
                      <select value={orgPipeline.stt} onChange={e => setOrgPipeline({...orgPipeline, stt: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-900 dark:text-white">
                        <option value="">-- Select STT --</option>
                        {sttNodes.map(n => <option key={n.id} value={n.id}>{n.providerName}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-500 dark:text-slate-400 mb-1">Assigned TTS Engine</label>
                      <select value={orgPipeline.tts} onChange={e => setOrgPipeline({...orgPipeline, tts: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-900 dark:text-white">
                        <option value="">-- Select TTS --</option>
                        {ttsNodes.map(n => <option key={n.id} value={n.id}>{n.providerName}</option>)}
                      </select>
                    </div>
                    <Button onClick={handleSavePipeline} disabled={savingPipeline} className="w-full bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-slate-900 dark:text-white font-bold py-2 rounded-lg mt-4">
                      {savingPipeline ? 'Binding...' : 'Bind AI Pipeline to Organization'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showNodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm">
           <form onSubmit={handleCreateNode} autoComplete="off" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-white/10 shrink-0">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TerminalSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Create Global AI Node
                </h3>
                <button type="button" onClick={()=>setShowNodeModal(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5"/></button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Preset Provider</label>
                    <select onChange={(e) => {
                      const val = e.target.value;
                      if(val === 'groq_llm') setNodeForm({...nodeForm, type: 'LLM', endpoint: 'https://api.groq.com/openai/v1/chat/completions', modelId: 'openai/gpt-oss-20b', name: 'Groq LLM'});
                      if(val === 'groq_stt') setNodeForm({...nodeForm, type: 'STT', endpoint: 'https://api.groq.com/openai/v1/audio/transcriptions', modelId: 'whisper-large-v3', name: 'Groq STT'});
                      if(val === 'elevenlabs_tts') setNodeForm({...nodeForm, type: 'TTS', endpoint: 'https://api.elevenlabs.io/v1/text-to-speech/', modelId: 'eleven_multilingual_v2', name: 'ElevenLabs TTS'});
                      if(val === 'google_tts') setNodeForm({...nodeForm, type: 'TTS', endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize', modelId: 'ne-NP-Neural2-A', name: 'Google Cloud TTS'});
                      if(val === 'gemini_llm') setNodeForm({...nodeForm, type: 'LLM', endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', modelId: 'gemini-2.0-flash', name: 'Google Gemini (LLM)'});
                      if(val === 'google_stt') setNodeForm({...nodeForm, type: 'STT', endpoint: 'https://speech.googleapis.com/v1/speech:recognize', modelId: 'default', name: 'Google Cloud Speech-to-Text (STT)'});
                    }} className="w-full bg-white dark:bg-slate-900 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 rounded-lg px-4 py-2 text-sm focus:outline-none mb-4">
                      <option value="">-- Choose a Quick Preset --</option>
                      <option value="gemini_llm">Google Gemini (LLM)</option>
                      <option value="google_stt">Google Cloud Speech-to-Text (STT)</option>
                      <option value="google_tts">Google Cloud Text-to-Speech (TTS)</option>
                      <option value="groq_llm">Groq LLM (Fast)</option>
                      <option value="groq_stt">Groq STT (Whisper)</option>
                      <option value="elevenlabs_tts">ElevenLabs TTS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Node Name</label>
                    <input required autoComplete="off" value={nodeForm.name} onChange={e=>setNodeForm({...nodeForm, name: e.target.value})} type="text" placeholder="e.g. Groq LLM" className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Engine Type</label>
                    <select required value={nodeForm.type} onChange={e=>setNodeForm({...nodeForm, type: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none">
                      <option value="LLM">LLM (Language Model)</option>
                      <option value="STT">STT (Speech to Text)</option>
                      <option value="TTS">TTS (Text to Speech)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Base URL / Endpoint</label>
                    <input required autoComplete="off" value={nodeForm.endpoint} onChange={e=>setNodeForm({...nodeForm, endpoint: e.target.value})} type="url" placeholder="https://api..." className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white font-mono focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">Model ID (Optional)</label>
                    <input autoComplete="new-password" value={nodeForm.modelId} onChange={e=>setNodeForm({...nodeForm, modelId: e.target.value})} type="text" placeholder="e.g. llama3:8b" className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white font-mono focus:border-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase">API Key / Auth Token (Optional)</label>
                    <input autoComplete="new-password" value={nodeForm.authKey} onChange={e=>setNodeForm({...nodeForm, authKey: e.target.value})} type="password" placeholder="sk-..." className="w-full bg-gray-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white font-mono focus:border-indigo-500 focus:outline-none" />
                    <p className="text-[10px] text-slate-500 mt-1">This key will be encrypted in the database.</p>
                  </div>
              </div>
              
              <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-white/10 shrink-0">
                <Button type="button" onClick={()=>setShowNodeModal(false)} className="flex-1 bg-transparent border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Cancel</Button>
                <Button type="submit" disabled={savingNode} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold">{savingNode ? 'Saving...' : 'Save AI Node'}</Button>
              </div>
           </form>
        </div>
      )}

      {showTestModal && (
        <TestVoiceAgentModal 
           onClose={() => setShowTestModal(false)} 
           organizations={organizations}
        />
      )}
    </div>
  );
}
