'use client';

import { useState } from 'react';
import { retriggerWebhook } from '@/actions/admin/monitoring';

export default function MonitoringDashboardClient({
  initialAgents,
  initialCalls,
  callCenterTree,
  campaigns,
  webhooksData
}: { initialAgents: any, initialCalls: any, callCenterTree: any, campaigns: any, webhooksData: any }) {
  const [activeTab, setActiveTab] = useState('agents');
  const [retrying, setRetrying] = useState<string | null>(null);

  const handleRetrigger = async (id: string) => {
    setRetrying(id);
    try {
      await retriggerWebhook(id);
      alert('Webhook re-triggered successfully (Status reset to PENDING)');
    } catch (e: any) {
      alert('Error re-triggering webhook: ' + e.message);
    }
    setRetrying(null);
  };

  return (
    <div>
      <div className="flex border-b mb-6 space-x-4">
        {[
          { id: 'agents', label: '🤖 AI Voice Agents Directory' },
          { id: 'ivr', label: '🔀 Call Center, IVR & Queues' },
          { id: 'calls', label: '📞 Live Telephony & Call Logs' },
          { id: 'campaigns', label: '📢 Campaigns & Voice Broadcasting' },
          { id: 'webhooks', label: '⚠️ SMS, WhatsApp & Webhooks' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={
              "px-4 py-2 border-b-2 font-medium " +
              (activeTab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 shadow rounded border">
        
        {/* TAB 1: AI AGENTS */}
        {activeTab === 'agents' && (
          <div>
            <h2 className="text-xl font-bold mb-4">AI Voice Agents Directory</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2">Organization</th>
                  <th className="p-2">Agent Name</th>
                  <th className="p-2">Language</th>
                  <th className="p-2">System Prompt Preview</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {initialAgents.agents.map((agent: any) => (
                  <tr key={agent.id} className="border-b">
                    <td className="p-2">{agent.organization.name}</td>
                    <td className="p-2 font-medium">{agent.name}</td>
                    <td className="p-2">{agent.language || 'Default'}</td>
                    <td className="p-2 text-sm text-gray-500 max-w-xs truncate">{agent.systemPrompt || 'N/A'}</td>
                    <td className="p-2">
                      <button className="text-blue-600 text-sm border border-blue-600 px-2 py-1 rounded hover:bg-blue-50">Inspect</button>
                    </td>
                  </tr>
                ))}
                {initialAgents.agents.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">No agents found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: IVR & QUEUES */}
        {activeTab === 'ivr' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Call Center, IVR & Queues</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">IVR Menus</h3>
                <ul className="space-y-2">
                  {callCenterTree.ivrMenus.map((ivr: any) => (
                    <li key={ivr.id} className="p-3 bg-gray-50 border rounded">
                      <strong>{ivr.name}</strong> <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">{ivr.organization.name}</span>
                    </li>
                  ))}
                  {callCenterTree.ivrMenus.length === 0 && <li className="text-gray-500">No IVR Menus</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Call Queues</h3>
                <ul className="space-y-2">
                  {callCenterTree.callQueues.map((queue: any) => (
                    <li key={queue.id} className="p-3 bg-gray-50 border rounded">
                      <strong>{queue.name}</strong> <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2">{queue.organization.name}</span>
                      <div className="text-sm text-gray-600">Strategy: {queue.strategy} | Max Wait: {queue.maxWaitTimeSeconds}s</div>
                    </li>
                  ))}
                  {callCenterTree.callQueues.length === 0 && <li className="text-gray-500">No Call Queues</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CALL LOGS */}
        {activeTab === 'calls' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Live Telephony & Call Logs</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2">Organization</th>
                  <th className="p-2">Direction</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Duration (s)</th>
                  <th className="p-2">Cost (NPR)</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialCalls.calls.map((call: any) => (
                  <tr key={call.id} className="border-b">
                    <td className="p-2">{call.organization.name}</td>
                    <td className="p-2">{call.direction}</td>
                    <td className="p-2">{call.status}</td>
                    <td className="p-2">{call.durationSeconds}</td>
                    <td className="p-2">{call.costNPR}</td>
                    <td className="p-2 space-x-2 text-sm">
                      <button className="text-blue-600 hover:underline">Transcript</button>
                      <button className="text-green-600 hover:underline">Audio</button>
                    </td>
                  </tr>
                ))}
                {initialCalls.calls.length === 0 && (
                  <tr><td colSpan={6} className="p-4 text-center text-gray-500">No calls found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Campaigns & Voice Broadcasting</h2>
            <div className="space-y-4">
              {campaigns.campaigns.map((camp: any) => (
                <div key={camp.id} className="p-4 border rounded shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{camp.name} <span className="text-sm font-normal text-gray-500">({camp.organization.name})</span></span>
                    <span className={
                      "px-2 py-1 text-xs rounded text-slate-900 dark:text-white " + (camp.status === 'RUNNING' ? 'bg-green-500' : 'bg-gray-500')
                    }>{camp.status}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Type: {camp.type}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: (camp.totalContacts > 0 ? (camp.processedCount / camp.totalContacts) * 100 : 0) + '%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{camp.processedCount} / {camp.totalContacts} processed ({camp.successCount} successful)</div>
                </div>
              ))}
              {campaigns.campaigns.length === 0 && <div className="text-gray-500">No active campaigns.</div>}
            </div>
          </div>
        )}

        {/* TAB 5: WEBHOOKS */}
        {activeTab === 'webhooks' && (
          <div>
            <h2 className="text-xl font-bold mb-4">SMS, WhatsApp & Webhooks</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2">Organization</th>
                  <th className="p-2">Event Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Retries</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {webhooksData.webhooks.map((wh: any) => (
                  <tr key={wh.id} className="border-b">
                    <td className="p-2">{wh.organization.name}</td>
                    <td className="p-2 font-mono text-sm">{wh.eventType}</td>
                    <td className="p-2">
                      <span className={
                        "px-2 py-1 text-xs rounded text-slate-900 dark:text-white " + (wh.status === 'SUCCESS' ? 'bg-green-500' : wh.status === 'FAILED' ? 'bg-red-500' : 'bg-yellow-500')
                      }>
                        {wh.status}
                      </span>
                    </td>
                    <td className="p-2">{wh.retryCount}</td>
                    <td className="p-2">
                      <button 
                        onClick={() => handleRetrigger(wh.id)}
                        disabled={retrying === wh.id}
                        className="text-sm bg-gray-100 border px-2 py-1 rounded hover:bg-gray-200"
                      >
                        {retrying === wh.id ? 'Retrying...' : 'Re-trigger'}
                      </button>
                    </td>
                  </tr>
                ))}
                {webhooksData.webhooks.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">No webhooks logged.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
