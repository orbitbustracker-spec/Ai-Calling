'use client';

import React from 'react';
import { 
  FileText, Phone, MessageCircle, Bot, Mail, Users, 
  Settings, Zap, Clock, Search, Link as LinkIcon 
} from 'lucide-react';

const NODE_TYPES = [
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

export function SidebarLeft() {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-[#4F6474]/40 backdrop-blur-3xl border-r border-white/10 p-5 flex flex-col gap-6 overflow-y-auto z-10 shadow-2xl">
      
      {/* Top Tabs */}
      <div className="flex items-center p-1 bg-white/10 rounded-full border border-white/5">
        <button className="flex-1 py-2 px-4 rounded-full bg-white/20 text-white text-sm font-semibold shadow-sm transition-all text-center">
          Workflow
        </button>
        <button className="flex-1 py-2 px-4 rounded-full text-white/60 hover:text-white text-sm font-semibold transition-all text-center">
          Resources
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-8">
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
    </div>
  );
}
