export const dynamic = 'force-dynamic';
import { requireOrganizationMember } from "@/lib/authorization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { DualSidebar } from "@/components/layout/DualSidebar";
import { HeaderCreditBar } from "@/components/layout/HeaderCreditBar";
import { GlobalFloatingDialer } from "@/components/global/GlobalFloatingDialer";

export default async function OrgDashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireOrganizationMember();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen text-slate-900 dark:text-white overflow-hidden relative">
      {/* Dynamic Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 bg-[#f8fafc] dark:bg-gradient-to-br dark:from-[#536979] dark:to-[#8C7672] transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/50 dark:bg-white/5 rounded-full blur-[120px] dark:mix-blend-overlay pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/50 dark:bg-black/10 rounded-full blur-[150px] dark:mix-blend-overlay pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-200/50 dark:bg-indigo-900/20 rounded-full blur-[100px] dark:mix-blend-overlay pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <DualSidebar role="ORG_ADMIN" />
        
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <HeaderCreditBar />
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-6 lg:p-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          
          <GlobalFloatingDialer />
        </div>
      </div>
    </div>
  );
}
