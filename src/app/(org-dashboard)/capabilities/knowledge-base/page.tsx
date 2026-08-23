'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Globe, FileText, Database, Plus, Search, PlayCircle, BrainCircuit } from 'lucide-react';

const DOCS = [
  { id: 1, type: 'pdf', name: 'Product_Catalog_2026.pdf', status: 'Indexed', chunks: 145 },
  { id: 2, type: 'web', name: 'https://aakashtel.com/pricing', status: 'Indexed', chunks: 24 },
  { id: 3, type: 'qa', name: 'Manual QA: Refund Policy', status: 'Processing', chunks: 2 },
];

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('files');
  const [testQuery, setTestQuery] = useState('');
  const [testResponse, setTestResponse] = useState('');

  const handleTest = () => {
    if (!testQuery) return;
    setTestResponse('...Thinking');
    setTimeout(() => {
      setTestResponse('Based on the knowledge base, the refund policy states that refunds are processed within 5-7 business days if the claim is valid. Do you need further assistance?');
    }, 1000);
  };

  return (
    <div className="h-full flex gap-8">
      
      {/* Left side: Management */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-400" /> Knowledge Base RAG
          </h1>
          <p className="text-slate-400">Manage vector embeddings to inject context into your Voice AI and chatbots.</p>
        </div>

        {/* Upload/Ingestion Box */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
           <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
             <button onClick={() => setActiveTab('files')} className={`font-semibold flex items-center gap-2 ${activeTab === 'files' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}><UploadCloud className="w-4 h-4" /> File Upload</button>
             <button onClick={() => setActiveTab('web')} className={`font-semibold flex items-center gap-2 ${activeTab === 'web' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}><Globe className="w-4 h-4" /> Web Scraper</button>
             <button onClick={() => setActiveTab('qa')} className={`font-semibold flex items-center gap-2 ${activeTab === 'qa' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}><FileText className="w-4 h-4" /> Manual Q&A</button>
           </div>

           {activeTab === 'files' && (
             <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-slate-950/50 hover:bg-slate-900 transition-colors cursor-pointer">
               <UploadCloud className="w-12 h-12 text-slate-500 mb-4" />
               <h3 className="text-white font-bold mb-1">Click to upload or drag and drop</h3>
               <p className="text-xs text-slate-400">PDF, DOCX, TXT, CSV (Max 50MB)</p>
             </div>
           )}

           {activeTab === 'web' && (
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-1">Crawl Website URL</label>
                 <div className="flex gap-3">
                   <input type="text" className="flex-1 bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="https://example.com/faqs" />
                   <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-500 transition-colors">Start Crawler</button>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'qa' && (
             <div className="space-y-4">
               <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="Question (e.g., What are your opening hours?)" />
               <textarea className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none resize-none h-32" placeholder="Answer..." />
               <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-500 transition-colors w-full">Save to Vector Database</button>
             </div>
           )}
        </div>

        {/* Documents Table */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
           <h3 className="text-lg font-bold text-white mb-6">Vector Index Status</h3>
           <table className="w-full text-left text-sm text-slate-300">
             <thead className="text-xs uppercase text-slate-500 border-b border-white/10">
               <tr>
                 <th className="pb-3 font-bold">Document</th>
                 <th className="pb-3 font-bold">Type</th>
                 <th className="pb-3 font-bold text-right">Chunks</th>
                 <th className="pb-3 font-bold text-right">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
               {DOCS.map(doc => (
                 <tr key={doc.id}>
                   <td className="py-4 font-medium text-white">{doc.name}</td>
                   <td className="py-4 uppercase text-[10px] tracking-wider text-slate-400">{doc.type}</td>
                   <td className="py-4 text-right font-mono">{doc.chunks}</td>
                   <td className="py-4 text-right">
                     <span className={`px-2 py-1 text-xs font-bold rounded-md ${doc.status === 'Indexed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400 animate-pulse'}`}>
                       {doc.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* Right side: Playground */}
      <div className="w-96 bg-slate-900 border border-white/10 rounded-2xl flex flex-col relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="p-6 border-b border-white/10 bg-slate-900/80 backdrop-blur-md relative z-10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-400" /> RAG Playground
          </h2>
          <p className="text-xs text-slate-400 mt-1">Test your embeddings with ChatGPT</p>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto relative z-10">
          {testResponse && (
            <>
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tr-sm text-slate-200 text-sm ml-8 shadow-lg">
                {testQuery}
              </div>
              <div className="bg-purple-600/20 border border-purple-500/30 p-4 rounded-2xl rounded-tl-sm text-purple-100 text-sm mr-8 shadow-lg">
                {testResponse}
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-white/10 relative z-10">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Ask your knowledge base..." 
               value={testQuery}
               onChange={(e) => setTestQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleTest()}
               className="w-full bg-slate-900 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:border-purple-500 outline-none shadow-inner"
             />
             <button onClick={handleTest} className="absolute right-2 top-2 p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-lg">
               <PlayCircle className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
