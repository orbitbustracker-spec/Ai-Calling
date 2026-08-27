import { getCurrentUser } from '@/lib/authorization'; 
import { redirect } from 'next/navigation'; 

export const dynamic = 'force-dynamic'; 

export default async function DashboardRouter() { 
  let user;
  try {
    user = await getCurrentUser(); 
  } catch (err: any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0b] p-4 text-center">
        <div className="bg-white dark:bg-[#111113] p-8 rounded-3xl border border-red-500/30 max-w-lg shadow-xl shadow-red-900/10">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Database Connection Error 🚨</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            It looks like your Vercel project cannot connect to the Postgres Database. This usually happens if the <strong className="text-gray-900 dark:text-white">DATABASE_URL</strong> Environment Variable is missing or incorrect in Vercel.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-left font-mono text-sm text-red-400 overflow-auto mb-6">
            {err.message || String(err)}
          </div>
          <p className="text-sm text-gray-500">
            Please add your Supabase connection string to Vercel Settings &rarr; Environment Variables, and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!user) { 
    redirect('/login'); 
  } 
  
  if (user.role === 'SUPER_ADMIN') { 
    redirect('/admin/analytics/usage'); 
  } else if (user.organizationId) { 
    redirect('/capabilities/dashboard'); 
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0b] p-4 text-center">
        <div className="bg-white dark:bg-[#111113] p-8 rounded-3xl border border-yellow-500/30 max-w-lg shadow-xl shadow-yellow-900/10">
          <h1 className="text-2xl font-bold text-yellow-500 mb-4">No Organization Assigned</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your account does not belong to any organization. Please ask a Super Admin to assign you to an organization in the Users & Approvals dashboard.
          </p>
          <a href="/login" className="text-indigo-500 hover:underline">Return to Login</a>
        </div>
      </div>
    );
  }
}
