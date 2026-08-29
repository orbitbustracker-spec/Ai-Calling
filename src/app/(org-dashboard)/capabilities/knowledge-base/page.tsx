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
    <div className="h-full flex flex-col xl:flex-row gap-8">
      
      {/* Left side: Management */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-500 dark:text-indigo-400" /> Knowledge Base RAG
          </h1>
          <p className="text-gray-500 dark:text-slate-400">Manage vector embeddings to inject context into your Voice AI and chatbots.</p>
        </div>

        {/* Upload/Ingestion Box */}
        <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-sm">
           <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
             <button onClick={() => setActiveTab('files')} className={`font-semibold flex items-center gap-2 ${activeTab === 'files' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-500 dark:hover:text-slate-300'}`}><UploadCloud className="w-4 h-4" /> File Upload</button>
             <button onClick={() => setActiveTab('web')} className={`font-semibold flex items-center gap-2 ${activeTab === 'web' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-500 dark:hover:text-slate-300'}`}><Globe className="w-4 h-4" /> Web Scraper</button>
             <button onClick={() => setActiveTab('qa')} className={`font-semibold flex items-center gap-2 ${activeTab === 'qa' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-500 dark:hover:text-slate-300'}`}><FileText className="w-4 h-4" /> Manual Q&A</button>
           </div>

           {activeTab === 'files' && (
             <div 
               onClick={() => alert("File browser would open here. (Simulated Upload)")}
               className="border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-slate-950/50 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
             >
               <UploadCloud className="w-12 h-12 text-gray-400 dark:text-slate-500 mb-4" />
               <h3 className="text-gray-900 dark:text-white font-bold mb-1">Click to upload or drag and drop</h3>
               <p className="text-xs text-gray-500 dark:text-slate-400">PDF, DOCX, TXT, CSV (Max 50MB)</p>
             </div>
           )}

           {activeTab === 'web' && (
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-slate-400 mb-1">Crawl Website URL</label>
                 <div className="flex gap-3">
                   <input type="text" className="flex-1 bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="https://example.com/faqs" />
                   <button 
                     onClick={() => alert("Scraping engine triggered... Crawling website.")}
                     className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors shadow-sm"
                   >
                     Start Crawler
                   </button>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'qa' && (
             <div className="space-y-4">
               <input type="text" className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-indigo-500 outline-none" placeholder="Question (e.g., What are your opening hours?)" />
               <textarea className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-indigo-500 outline-none resize-none h-32" placeholder="Answer..." />
               <button 
                 onClick={() => alert("Q&A Pair saved to Vector Database.")}
                 className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors w-full shadow-sm"
               >
                 Save to Vector Database
               </button>
             </div>
           )}
        </div>

        {/* Documents Table */}
        <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Vector Index Status</h3>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
               <thead className="text-xs uppercase text-gray-500 dark:text-slate-500 border-b border-gray-200 dark:border-white/10">
                 <tr>
                   <th className="pb-3 font-bold">Document</th>
                   <th className="pb-3 font-bold">Type</th>
                   <th className="pb-3 font-bold text-right">Chunks</th>
                   <th className="pb-3 font-bold text-right">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                 {DOCS.map(doc => (
                   <tr key={doc.id}>
                     <td className="py-4 font-medium text-gray-900 dark:text-white">{doc.name}</td>
                     <td className="py-4 uppercase text-[10px] tracking-wider text-gray-500 dark:text-slate-400">{doc.type}</td>
                     <td className="py-4 text-right font-mono">{doc.chunks}</td>
                     <td className="py-4 text-right">
                       <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${doc.status === 'Indexed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-transparent' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-transparent animate-pulse'}`}>
                         {doc.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Right side: Playground */}
      <div className="w-full xl:w-96 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col relative overflow-hidden shadow-sm h-[600px] xl:h-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="p-6 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-600 dark:text-purple-400" /> RAG Playground
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Test your embeddings with ChatGPT</p>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto relative z-10">
          {testResponse && (
            <>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tr-sm text-gray-800 dark:text-slate-200 text-sm ml-8 shadow-sm border border-gray-200 dark:border-white/5">
                {testQuery}
              </div>
              <div className="bg-purple-50 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 p-4 rounded-2xl rounded-tl-sm text-purple-900 dark:text-purple-100 text-sm mr-8 shadow-sm">
                {testResponse}
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-white/10 relative z-10">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Ask your knowledge base..." 
               value={testQuery}
               onChange={(e) => setTestQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleTest()}
               className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-gray-900 dark:text-white focus:border-purple-500 outline-none shadow-sm dark:shadow-inner"
             />
             <button onClick={handleTest} className="absolute right-2 top-2 p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-sm">
               <PlayCircle className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
