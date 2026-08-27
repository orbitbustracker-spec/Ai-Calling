import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  FileText, Phone, MessageCircle, Bot, Mail, Users, 
  Settings, Zap, CheckCircle2, Clock, Search, Lock, X, Plus, MoreHorizontal
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
      relative min-w-[240px] rounded-2xl border backdrop-blur-2xl transition-all duration-300
      ${selected 
        ? 'border-white/40 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)]' 
        : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
      }
    `}>
      
      {/* Top Tab (Lock, X, +, ...) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 backdrop-blur-xl rounded-t-xl text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
         <Lock className="w-3 h-3 hover:text-white cursor-pointer" />
         <X className="w-3 h-3 hover:text-white cursor-pointer" />
         <Plus className="w-3 h-3 hover:text-white cursor-pointer" />
         <MoreHorizontal className="w-3 h-3 hover:text-white cursor-pointer" />
      </div>

      {/* Input Handle */}
      {data.type !== 'trigger' && (
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 bg-white border-2 border-slate-900 -mt-1.5"
        />
      )}

      {/* Layout for nodes where Icon is on Left, Text on Right */}
      {data.layout === 'horizontal' ? (
        <div className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 shrink-0">
             <Icon className={`w-full h-full ${data.iconColor || 'text-white/80'}`} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-semibold text-white tracking-wide">{data.label}</h3>
            {data.sublabel && (
              <p className="text-xs text-white/50 mt-0.5">{data.sublabel}</p>
            )}
          </div>
        </div>
      ) : (
        /* Layout for nodes where Icon is on Top, Text Below (e.g., Source files) */
        <div className="p-5 flex flex-col items-center gap-3">
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center shrink-0
            ${data.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
            ${data.color === 'green' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''}
            ${data.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
            ${data.color === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : ''}
            ${!data.color ? 'bg-white/10 text-white/70 border border-white/20' : ''}
          `}>
            <Icon className="w-8 h-8" strokeWidth={1.5} />
          </div>
          
          <div className="text-center">
            <h3 className="text-[15px] font-semibold text-white tracking-wide">{data.label}</h3>
            {data.sublabel && (
              <p className="text-xs text-white/50 mt-1">{data.sublabel}</p>
            )}
          </div>
        </div>
      )}

      {/* Toggle Switch inside Node */}
      {data.hasToggle && (
        <div className="w-full flex items-center justify-between px-4 pb-4 border-t border-white/10 mt-2 pt-3">
          <span className="text-xs text-white/50 font-medium">{data.toggleLabel || 'Browse internet'}</span>
          <div className="w-8 h-4.5 bg-blue-500 rounded-full relative shadow-inner">
            <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      )}

      {/* Output Handle */}
      {data.type !== 'end' && (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 bg-white border-2 border-slate-900 -mb-1.5"
        />
      )}
    </div>
  );
});
