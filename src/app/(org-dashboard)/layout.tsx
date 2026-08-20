export const dynamic = 'force-dynamic';
import { requireOrganizationMember } from "@/lib/authorization";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function OrgDashboardLayout({ children }: { children: ReactNode }) {
  try {
    await requireOrganizationMember();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">ORGANIZATION</h2>
        <nav className="space-y-2 flex flex-col">
          <a href="/dashboard" className="hover:text-blue-300">Overview</a>
          <a href="/knowledge-base" className="hover:text-blue-300">Knowledge Base</a>
          <a href="/agents" className="hover:text-blue-300">AI Agents</a>
          <a href="/calls" className="hover:text-blue-300">Call History</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

