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
    <div className="flex h-screen bg-[#0a0a0b] text-gray-200">
      <Sidebar role="SUPER_ADMIN" />
      <main className="flex-1 p-8 overflow-y-auto bg-slate-950 text-slate-300 rounded-tl-3xl shadow-2xl mt-2 ml-2">
        {children}
      </main>
    </div>
  );
}
