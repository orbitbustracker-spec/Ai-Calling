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
import { UserProfileModal } from '@/components/profile/UserProfileModal';

const MAIN_MODULES = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', href: '/capabilities/dashboard' },
  { id: 'pipeline', icon: Workflow, label: 'AI Pipeline Builder', href: '/capabilities/pipeline' },
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    // Keep sidebar synced when route changes
    const current = MAIN_MODULES.find(m => 
      pathname.startsWith(m.href || 'INVALID') || 
      m.subItems?.some(sub => pathname.startsWith(sub.href.split('?')[0]))
    );
    if (current) setActiveModule(current);
    setIsOpenMobile(false); // Close sidebar on mobile route change
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
      setIsOpenMobile(false);
    }
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-white/10 z-50 flex items-center px-4">
        <button onClick={() => setIsOpenMobile(!isOpenMobile)} className="text-slate-900 dark:text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-xl ml-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Nexus</span>
      </div>

      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/60 z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed md:relative top-0 left-0 h-screen glass-panel text-slate-700 dark:text-slate-300 font-sans shrink-0 z-50 flex transition-transform duration-300 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} pt-16 md:pt-0`}>
        
        {/* Primary Icon Rail */}
        <div className="w-16 flex flex-col items-center py-4 bg-transparent border-r border-gray-200 dark:border-white/10 z-20">
          <div className="hidden md:flex w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl items-center justify-center text-slate-900 dark:text-white font-black text-xl mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            Nx
          </div>

          <div className="flex-1 w-full flex flex-col items-center gap-2 mt-4 md:mt-0">
            {MAIN_MODULES.map(module => {
              const Icon = module.icon;
              const isActive = activeModule.id === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 relative group ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-800'}`}
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
             <button 
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-800 transition-colors"
             >
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
              animate={{ width: 192, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-panel flex flex-col z-10 relative overflow-hidden overflow-y-auto border-l border-white/5"
            >
              {/* Subtle Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
    
              <div className="p-6 shrink-0 w-48">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wide uppercase">{activeModule.label}</h2>
              </div>
    
              <div className="flex-1 px-4 space-y-1 w-48">
                {activeModule.subItems.map((item: any) => {
                  const isExact = typeof window !== 'undefined' && window.location.search ? pathname + window.location.search === item.href : pathname === item.href;
                  const isActive = isExact || (pathname === item.href.split('?')[0] && !window.location.search && activeModule.subItems?.[0]?.href === item.href);

                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      onClick={() => setIsOpenMobile(false)}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                        ? 'bg-indigo-500/15 text-indigo-400 shadow-[inset_2px_0_0_rgba(99,102,241,1)]' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-gray-200/50 dark:hover:bg-white/5'
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

      {/* Profile Modal - MUST BE OUTSIDE THE TRANSFORM CONTAINER */}
      {isProfileOpen && (
        <UserProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}
    </>
  );
};

