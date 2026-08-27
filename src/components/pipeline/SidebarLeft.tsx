'use client';

import React from 'react';
import { 
  FileText, Phone, MessageCircle, Bot, Mail, Users, 
  Settings, Zap, CheckCircle2, Clock, Search 
} from 'lucide-react';

const NODE_TYPES = [
  {
    category: 'Trigger',
    items: [
      { type: 'custom', data: { label: 'Source files', icon: 'source', color: 'blue', type: 'trigger', sublabel: 'Upload data' } }
    ]
  },
  {
    category: 'Outreach & Comms',
    items: [
      { type: 'custom', data: { label: 'Phone Call', icon: 'phone', color: 'green', hasToggle: true, sublabel: 'AI Voice Agent' } },
      { type: 'custom', data: { label: 'WhatsApp', icon: 'whatsapp', color: 'green', sublabel: 'Send Template' } },
      { type: 'custom', data: { label: 'Send Email', icon: 'email', color: 'purple', sublabel: 'Sales Outreach' } },
    ]
  },
  {
    category: 'Logic & AI',
    items: [
      { type: 'custom', data: { label: 'AI Intent', icon: 'ai', color: 'orange', sublabel: 'Analyze response' } },
      { type: 'custom', data: { label: 'Score & Quality', icon: 'action', color: 'orange', sublabel: 'Lead Scoring' } },
      { type: 'custom', data: { label: 'Delay', icon: 'delay', color: '', sublabel: 'Wait duration' } },
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
    <div className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col gap-6 overflow-y-auto z-10">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Workflow Builder</h2>
        <p className="text-xs text-slate-400">Drag and drop nodes to create your AI agent pipeline.</p>
      </div>

      {NODE_TYPES.map((group, i) => (
        <div key={i}>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{group.category}</h3>
          <div className="flex flex-col gap-3">
            {group.items.map((item, j) => (
              <div 
                key={j}
                draggable
                onDragStart={(e) => onDragStart(e, item.type, item.data)}
                className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 rounded-xl cursor-grab active:cursor-grabbing transition-colors"
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                  ${item.data.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${item.data.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                  ${item.data.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                  ${item.data.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
                  ${!item.data.color ? 'bg-slate-700/50 text-slate-300' : ''}
                `}>
                  {item.data.icon === 'source' && <FileText className="w-4 h-4" />}
                  {item.data.icon === 'phone' && <Phone className="w-4 h-4" />}
                  {item.data.icon === 'whatsapp' && <MessageCircle className="w-4 h-4" />}
                  {item.data.icon === 'email' && <Mail className="w-4 h-4" />}
                  {item.data.icon === 'ai' && <Bot className="w-4 h-4" />}
                  {item.data.icon === 'action' && <Zap className="w-4 h-4" />}
                  {item.data.icon === 'delay' && <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{item.data.label}</div>
                  <div className="text-xs text-slate-500">{item.data.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
