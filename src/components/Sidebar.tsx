'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

/**
 * Sidebar Navigation Component
 * Main navigation for the application
 */
export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/agents', label: 'AI Agents', icon: '🤖' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Voice AI SaaS</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            )}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          <p>Minutes Used: 1,234 / 5,000</p>
        </div>
      </div>
    </aside>
  );
};
