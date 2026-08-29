'use client';

import React from 'react';
import { 
  FileText, Phone, MessageCircle, Bot, Mail, Users, 
  Settings, Zap, Clock, Search, Link as LinkIcon 
} from 'lucide-react';

const NODE_TYPES = [
  {
    category: 'TRIGGER',
    items: [
      { type: 'custom', data: { label: 'Condition (If/Else)', icon: 'logic', layout: 'vertical', sublabel: '' } },
    ]
  },
  {
    category: 'LOGIC',
    items: [
      { type: 'custom', data: { label: 'New branch', icon: 'logic', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Delay', icon: 'delay', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Score & qualify', icon: 'action', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Intent', icon: 'ai', layout: 'vertical', sublabel: '' } },
    ]
  },
  {
    category: 'ACTION',
    items: [
      { type: 'custom', data: { label: 'Make AI Call', icon: 'phone', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Update CRM / Webhook', icon: 'action', layout: 'vertical', sublabel: '' } },
    ]
  },
  {
    category: 'PROSPECTING',
    items: [
      { type: 'custom', data: { label: 'Find prospects', icon: 'search', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Import list', icon: 'source', layout: 'vertical', sublabel: '' } },
    ]
  },
  {
    category: 'OUTREACH',
    items: [
      { type: 'custom', data: { label: 'Send email', icon: 'email', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Connect', icon: 'whatsapp', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'Enrich contacts', icon: 'prospect', layout: 'vertical', sublabel: '' } },
      { type: 'custom', data: { label: 'AI signal', icon: 'action', layout: 'vertical', sublabel: '' } },
    ]
  }
];

export function SidebarLeft({ onResourceClick }: { onResourceClick?: (id: string) => void }) {
  const [activeTab, setActiveTab] = React.useState<'workflow' | 'resources'>('workflow');

  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-[#4F6474]/40 backdrop-blur-3xl border-r border-white/10 p-5 flex flex-col gap-6 overflow-y-auto z-10 shadow-2xl">

      
      {/* Top Tabs */}
      <div className="flex items-center p-1 bg-white/10 rounded-full border border-white/5 flex-shrink-0">
        <button 
          onClick={() => setActiveTab('workflow')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all text-center ${activeTab === 'workflow' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
        >
          Workflow
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all text-center ${activeTab === 'resources' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
        >
          Resources
        </button>
      </div>

      {activeTab === 'workflow' ? (
        <div className="flex-1 flex flex-col gap-8 pb-4">
          {NODE_TYPES.map((group, i) => (
            <div key={i}>
              <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors">
                {group.category}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {group.items.map((item, j) => (
                  <div 
                    key={j}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.type, item.data)}
                    className="flex flex-col items-center justify-center p-4 h-28 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl cursor-grab active:cursor-grabbing transition-all shadow-sm hover:shadow-md group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-white/70 group-hover:text-white group-hover:scale-110 transition-all">
                      {item.data.icon === 'source' && <FileText className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'phone' && <Phone className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'whatsapp' && <LinkIcon className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'email' && <Mail className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'ai' && <Bot className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'action' && <Zap className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'delay' && <Clock className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'search' && <Search className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'logic' && <Settings className="w-6 h-6" strokeWidth={1.5} />}
                      {item.data.icon === 'prospect' && <Users className="w-6 h-6" strokeWidth={1.5} />}
                    </div>
                    <div className="text-xs font-medium text-white/80 group-hover:text-white text-center leading-tight">
                      {item.data.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 pb-4">
          
          <div onClick={() => onResourceClick?.('prompts')} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">AI Prompts & Scripts</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Manage initial greetings, rebuttal libraries, and closing scripts for your AI callers.
            </p>
          </div>

          <div onClick={() => onResourceClick?.('integrations')} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Integrations & API</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Connect Telephony (Asterisk/Twilio), SendGrid, and link your CRM (HubSpot/Salesforce).
            </p>
          </div>

          <div onClick={() => onResourceClick?.('knowledge')} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">Knowledge Base</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Upload PDFs, FAQs, and pricing sheets that the AI should reference during calls.
            </p>
          </div>

          <div onClick={() => onResourceClick?.('contacts')} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">Contact Lists</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Manage lead lists, import CSVs, and organize segments to attach to the Source node.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
