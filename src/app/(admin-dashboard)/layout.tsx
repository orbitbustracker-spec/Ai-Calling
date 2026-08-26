export const dynamic = 'force-dynamic';
import { requireSuperAdmin } from "@/lib/authorization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireSuperAdmin();
  } catch (error: any) {
    if (error.name === "AuthorizationError") {
      redirect("/login");
    }
    throw error;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0a0a0b] text-gray-900 dark:text-gray-200 overflow-hidden">
      <Sidebar role="SUPER_ADMIN" />
      <main className="flex-1 p-6 pt-20 md:p-8 md:mt-2 md:ml-2 overflow-y-auto bg-white dark:bg-slate-950 text-gray-800 dark:text-slate-300 md:rounded-tl-3xl shadow-2xl relative">
        {children}
      </main>
    </div>
  );
}

