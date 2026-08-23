import { getCurrentUser } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import CommerceClient from './CommerceClient';
import { ShoppingCart } from 'lucide-react';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CommercePage() {
  const user = await getCurrentUser(); if (!user) return <div>Unauthorized</div>;
  
  if (!user.organizationId) {
    return <div>Please join an organization first.</div>;
  }

  const org = await prisma.organization.findUnique({
    where: { id: user.organizationId }
  });

  if (!org) return <div>Org not found</div>;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
        <div className="bg-orange-600/20 p-3 rounded-xl border border-orange-500/30">
          <ShoppingCart className="h-8 w-8 text-orange-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Commerce & Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">Accept payments and bookings automatically via AI Calls & WhatsApp.</p>
        </div>
      </div>

      <CommerceClient 
        isActive={org.isCommerceActive} 
        commerceMinutes={org.commerceMinutes}
      />
    </div>
  );
}
