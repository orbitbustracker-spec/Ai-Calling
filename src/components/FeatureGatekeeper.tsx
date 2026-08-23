import { PrismaClient } from '@prisma/client';
import { AlertCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

const prisma = new PrismaClient();

export default async function FeatureGatekeeper({
  organizationId,
  children
}: {
  organizationId: string;
  children: ReactNode;
}) {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: { organizationBalance: true }
  });

  if (!org) return <div>Organization not found</div>;

  const hasMinutes = (org.organizationBalance?.remainingMinutes || 0) > 0;
  
  if (!hasMinutes) {
    return (
      <div className="relative p-8 h-[calc(100vh-2rem)] rounded-2xl overflow-hidden border border-gray-800 bg-[#111113]">
        {/* Blurred out background UI */}
        <div className="absolute inset-0 opacity-10 blur-xl pointer-events-none p-8">
          <div className="h-8 w-1/3 bg-gray-500 rounded mb-8"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-gray-500 rounded-xl"></div>
            <div className="h-32 bg-gray-500 rounded-xl"></div>
            <div className="h-32 bg-gray-500 rounded-xl"></div>
          </div>
          <div className="h-64 bg-gray-500 rounded-xl mt-8"></div>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 p-4">
          <div className="bg-[#1a1a1d] border border-gray-800 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center relative overflow-hidden">
            {/* Top red glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
            
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Subscription Exhausted</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Your AI minutes balance has run out. You must recharge to unlock access to all advanced capabilities.
            </p>

            <Link href="/billing" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-900/20">
              <CreditCard className="h-5 w-5" />
              Recharge NPR 2,500 (500 Mins)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
