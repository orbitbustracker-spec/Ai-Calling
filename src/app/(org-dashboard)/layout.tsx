export const dynamic = 'force-dynamic';
import { requireOrganizationMember } from "@/lib/authorization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { DualSidebar } from "@/components/layout/DualSidebar";
import { HeaderCreditBar } from "@/components/layout/HeaderCreditBar";

export default async function OrgDashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireOrganizationMember();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 overflow-hidden transition-colors duration-300">
      <DualSidebar role="ORG_ADMIN" />
      
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <HeaderCreditBar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-6 lg:p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      </div>
    </div>
  );
}
