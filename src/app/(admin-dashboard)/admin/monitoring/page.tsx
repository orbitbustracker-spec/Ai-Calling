import { getGlobalSystemOverview, getAllAgentsOverview, getGlobalCallLogs, getCallCenterTree, getCampaignsMonitor, getSystemHealthAndWebhooks } from '@/actions/admin/monitoring';
import MonitoringDashboardClient from './MonitoringDashboardClient';

export default async function MonitoringPage() {
  const overview = await getGlobalSystemOverview();
  const agentsData = await getAllAgentsOverview();
  const callsData = await getGlobalCallLogs();
  const callCenterTree = await getCallCenterTree();
  const campaignsData = await getCampaignsMonitor();
  const webhooksData = await getSystemHealthAndWebhooks();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">360° Platform Observability & Control</h1>
      
      {/* Header KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
          <div className="text-gray-500 text-sm">Live Active Calls</div>
          <div className="text-2xl font-bold">{overview.totalActiveCalls}</div>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">AI Voice Minutes Today</div>
          <div className="text-2xl font-bold">{overview.aiMinutesUsedToday}</div>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm">Running Campaigns</div>
          <div className="text-2xl font-bold">{overview.activeCampaigns}</div>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
          <div className="text-gray-500 text-sm">Webhook Failure Rate</div>
          <div className="text-2xl font-bold">{overview.webhookFailureRate}%</div>
        </div>
      </div>

      <MonitoringDashboardClient 
        initialAgents={agentsData}
        initialCalls={callsData}
        callCenterTree={callCenterTree}
        campaigns={campaignsData}
        webhooksData={webhooksData}
      />
    </div>
  );
}
