import { requireSuperAdmin } from "@/lib/authorization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireSuperAdmin();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">SUPER ADMIN</h2>
        <nav className="space-y-2 flex flex-col">
          <a href="/providers" className="hover:text-blue-300">Providers</a>
          <a href="/billing" className="hover:text-blue-300">Billing Config</a>
          <a href="/organizations" className="hover:text-blue-300">Organizations</a>
          <a href="/system" className="hover:text-blue-300">System Logs</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
