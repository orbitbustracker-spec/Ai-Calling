import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  FileText, Phone, MessageCircle, Bot, Mail, Users, 
  Settings, Zap, CheckCircle2, Clock, Search 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  source: FileText,
  phone: Phone,
  whatsapp: MessageCircle,
  ai: Bot,
  email: Mail,
  prospect: Users,
  logic: Settings,
  action: Zap,
  delay: Clock,
  search: Search
};

export const CustomNode = memo(({ data, selected }: any) => {
  const Icon = iconMap[data.icon] || Settings;

  return (
    <div className={`
      relative min-w-[200px] rounded-2xl border backdrop-blur-xl transition-all duration-300
      ${selected 
        ? 'border-indigo-500 bg-slate-900/80 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
        : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/60 hover:border-white/20'
      }
    `}>
      {/* Input Handle */}
      {data.type !== 'trigger' && (
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 bg-indigo-400 border-2 border-slate-900"
        />
      )}

      <div className="p-4 flex flex-col items-center gap-3">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${data.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
          ${data.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
          ${data.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
          ${data.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
          ${!data.color ? 'bg-slate-700/50 text-slate-300' : ''}
        `}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-semibold text-slate-200">{data.label}</h3>
          {data.sublabel && (
            <p className="text-xs text-slate-500 mt-1">{data.sublabel}</p>
          )}
        </div>

        {/* Toggle switch placeholder if needed */}
        {data.hasToggle && (
          <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-white/5">
            <span className="text-xs text-slate-400">Enable</span>
            <div className="w-8 h-4 bg-indigo-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Output Handle */}
      {data.type !== 'end' && (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 bg-indigo-400 border-2 border-slate-900"
        />
      )}
    </div>
  );
});
