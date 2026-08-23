'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Users, BarChart3, Settings2, CreditCard, 
  Cpu, MessageSquare, Network, Box, Database, LogOut,
  UserCircle, Workflow, Zap, Headphones, Globe
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const MAIN_MODULES = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', href: '/capabilities/dashboard' },
  { id: 'crm', icon: Users, label: 'Customer CRM', subItems: [
    { label: 'Activity', href: '/capabilities/customer-crm?view=activity' },
    { label: 'Reminder', href: '/capabilities/customer-crm?view=reminder' },
    { label: 'Stay in Touch', href: '/capabilities/customer-crm?view=stay-in-touch' },
    { label: 'Tickets', href: '/capabilities/customer-crm?view=tickets' },
    { label: 'Transactions', href: '/capabilities/customer-crm?view=transactions' },
  ]},
  { id: 'telephony', icon: Phone, label: 'Telephony', subItems: [
    { label: 'Extensions', href: '/capabilities/extensions' },
    { label: 'Visual Voicemail', href: '/capabilities/voicemail' },
    { label: 'Transfers & Routing', href: '/capabilities/transfers' },
    { label: '3-Way Calling', href: '/capabilities/three-way-calling' },
  ]},
  { id: 'campaigns', icon: Zap, label: 'Campaigns', subItems: [
    { label: 'Voice Broadcasting', href: '/capabilities/voice-broadcasting' },
    { label: 'Smart Dialer', href: '/capabilities/smart-dialer' },
    { label: 'Campaign Manager', href: '/capabilities/campaigns' },
  ]},
  { id: 'omnichannel', icon: MessageSquare, label: 'Omnichannel', subItems: [
    { label: 'Social Commerce', href: '/social-commerce/integrations' },
    { label: 'Unified Inbox', href: '/social-commerce/inbox' },
    { label: 'Orders', href: '/social-commerce/orders' },
  ]},
  { id: 'knowledge', icon: Database, label: 'Knowledge Base', href: '/capabilities/knowledge-base' },
  { id: 'billing', icon: CreditCard, label: 'Billing', href: '/billing' },
];

export const DualSidebar = ({ role }: { role?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Try to find the active module based on current pathname
  const initialModule = MAIN_MODULES.find(m => 
    pathname.startsWith(m.href || 'INVALID') || 
    m.subItems?.some(sub => pathname.startsWith(sub.href.split('?')[0]))
  ) || MAIN_MODULES[0];

  const [activeModule, setActiveModule] = useState(initialModule);

  useEffect(() => {
    // Keep sidebar synced when route changes
    const current = MAIN_MODULES.find(m => 
      pathname.startsWith(m.href || 'INVALID') || 
      m.subItems?.some(sub => pathname.startsWith(sub.href.split('?')[0]))
    );
    if (current) setActiveModule(current);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleModuleClick = (module: any) => {
    setActiveModule(module);
    if (!module.subItems && module.href) {
      router.push(module.href);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans border-r border-white/10 shrink-0 relative z-50">
      
      {/* Primary Icon Rail */}
      <div className="w-16 flex flex-col items-center py-4 bg-slate-950/80 backdrop-blur-md border-r border-white/5 z-20">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          Nx
        </div>

        <div className="flex-1 w-full flex flex-col items-center gap-2">
          {MAIN_MODULES.map(module => {
            const Icon = module.icon;
            const isActive = activeModule.id === module.id;
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 relative group ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div layoutId="activeRail" className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />
                )}
                
                {/* Tooltip */}
                <div className="absolute left-14 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {module.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center gap-2 mt-auto">
           <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
              <UserCircle className="w-5 h-5" />
           </button>
           <button onClick={handleSignOut} className="w-10 h-10 flex items-center justify-center rounded-xl text-red-500/70 hover:text-red-400 hover:bg-red-950/30 transition-colors">
              <LogOut className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Secondary Dynamic Menu */}
      <AnimatePresence mode="wait">
        {activeModule.subItems && activeModule.subItems.length > 0 && (
          <motion.div 
            key={activeModule.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 224, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 relative overflow-hidden overflow-y-auto"
          >
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
  
            <div className="p-6 shrink-0 w-56">
              <h2 className="text-sm font-bold text-slate-100 tracking-wide uppercase">{activeModule.label}</h2>
            </div>
  
            <div className="flex-1 px-4 space-y-1 w-56">
              {activeModule.subItems.map((item: any) => {
                // If it contains query param like ?view=..., we check exact match on client or roughly
                const isExact = typeof window !== 'undefined' && window.location.search ? pathname + window.location.search === item.href : pathname === item.href;
                // Basic fallback for path-only match
                const isActive = isExact || (pathname === item.href.split('?')[0] && !window.location.search && activeModule.subItems?.[0]?.href === item.href);

                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                      ? 'bg-indigo-500/15 text-indigo-400 shadow-[inset_2px_0_0_rgba(99,102,241,1)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
