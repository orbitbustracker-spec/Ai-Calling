'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, Users, BarChart3, Settings2, CreditCard, 
  Cpu, Building2, BookOpen, MessageSquare, Plus, Activity,
  Bot, Radio, Network, Contact, FileText, Layers, Hash, Mic,
  LogOut, UserCircle
} from 'lucide-react';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { UserProfileModal } from '@/components/profile/UserProfileModal';

export const Sidebar = ({ role }: { role?: string }) => {
  const pathname = usePathname();
  const isSuperAdmin = role === 'SUPER_ADMIN';
  
  const standardSections = [
    {
      title: 'CALL MANAGE',
      items: [
        { href: '/capabilities/call-management', label: 'Inbound/Outbound', icon: Phone },
        { href: '/capabilities/extensions', label: 'SIP & Extensions', icon: Network },
      ]
    },
    {
      title: 'WHATSAPP CALL',
      items: [
        { href: '/capabilities/whatsapp-ai', label: 'WhatsApp AI', icon: MessageSquare },
      ]
    },
    {
      title: 'SOCIAL AI',
      items: [
        { href: '/omnichannel', label: 'Social & Commerce', icon: Layers },
      ]
    },
    {
      title: 'CAMPAIGNS',
      items: [
        { href: '/capabilities/voice-broadcasting', label: 'Voice Broadcasting', icon: Radio },
        { href: '/capabilities/campaigns', label: 'Campaign Manager', icon: Phone },
      ]
    },
    {
      title: 'CRM & ANALYTICS',
      items: [
        { href: '/capabilities/customer-crm', label: 'Customer CRM', icon: Contact },
        { href: '/capabilities/call-notes', label: 'Call Notes', icon: FileText },
        { href: '/capabilities/call-tagging', label: 'Call Tagging', icon: Hash },
        { href: '/capabilities/analytics', label: 'Analytics & Insights', icon: BarChart3 },
      ]
    },
    {
      title: 'ADVANCED SETTINGS',
      items: [
        { href: '/capabilities/personalized-messages', label: 'Dynamic TTS', icon: Mic },
        { href: '/capabilities/click-to-call', label: 'Click to Call', icon: Plus },
        { href: '/capabilities/transfers', label: 'Transfers & Routing', icon: Network },
          { href: '/capabilities/ivr-builder', label: 'Multi-Level IVR', icon: Hash },
        { href: '/capabilities/voicemail', label: 'Visual Voicemail', icon: Mic },
        { href: '/billing', label: 'Billing & Usage', icon: CreditCard },
      ]
    }
  ];

  const superAdminSections = [
    {
      title: 'SYSTEM CONFIG',
      items: [
        { href: '/admin/analytics/usage', label: 'Dashboard', icon: Activity },
        { href: '/admin/telephony', label: 'Telephony & SIP', icon: Settings2 },
        { href: '/admin/ai-engines', label: 'AI Engines', icon: Cpu },
        { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
        { href: '/admin/omnichannel', label: 'Omnichannel Integrations', icon: Layers },
        { href: '/admin/billing', label: 'Billing & Config', icon: CreditCard },
        { href: '/admin/new-users', label: 'New Users (Approvals)', icon: Users },
      ]
    },
    {
      title: 'GLOBAL MANAGEMENT',
      items: [
        { href: '/admin/knowledge-base', label: 'Global Knowledge Base', icon: BookOpen },
        { href: '/admin/services-master', label: 'Services Master Center', icon: MessageSquare },
        { href: '/admin/call-summary', label: 'Call Summary', icon: FileText },
        { href: '/admin/audit-logs', label: 'System Logs', icon: Activity },
      ]
    }
  ];

  const sections = isSuperAdmin ? superAdminSections : standardSections;

  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0a0a0b] border-b border-gray-200 dark:border-gray-900 z-50 flex items-center px-4">
        <button onClick={() => setIsOpenMobile(!isOpenMobile)} className="text-gray-900 dark:text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-xl ml-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Nexus {isSuperAdmin ? 'Super' : ''}</span>
      </div>

      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <UserProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed md:relative top-0 left-0 h-screen w-64 bg-white dark:bg-[#0a0a0b] text-gray-900 dark:text-white flex flex-col border-r border-gray-200 dark:border-gray-900 z-50 transition-transform duration-300 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} pt-16 md:pt-0`}>
        <div className="hidden md:block p-6 border-b border-gray-200 dark:border-gray-900">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-gray-900 dark:text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Nexus {isSuperAdmin ? 'Super' : ''}
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-4 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname?.startsWith(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900/50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-300'}`} />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Profile & Logout Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-900 mt-auto">
          <div className="space-y-1">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900/50"
            >
              <UserCircle className="h-5 w-5 text-gray-500 dark:text-gray-500" />
              <span className="text-sm">My Profile</span>
            </button>
            <button
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-red-400 hover:bg-red-950/30"
            >
              <LogOut className="h-5 w-5 text-red-500/70" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

