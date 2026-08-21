export const dynamic = 'force-dynamic';
import { PrismaClient } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';
import { BaraldharSVG } from '@/components/BaraldharSVG';
import { Button } from '@/components/Button';
import { Plus, Server, Phone, Lock } from 'lucide-react';

const prisma = new PrismaClient();

export default async function TelephonyConfigPage() {
  await requireSuperAdmin();

  const providers = await prisma.telephonyProvider.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Server className="h-6 w-6 text-indigo-600" />
            Telephony & SIP Configuration
          </h1>
          <p className="text-gray-500 mt-1">Manage IP-PBX, NTC/Ncell SIP Trunks, and third-party vendors.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add SIP Trunk / Provider
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200">
        {providers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Server className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No SIP Providers Configured</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by adding your NTC/Ncell IP-PBX details or a 3rd party provider.
            </p>
            <div className="mt-6">
              <Button>Configure First Provider</Button>
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {providers.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.providerType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {p.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-gray-600" />
            NTC / Ncell SIP Requirements
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            To configure a direct SIP trunk with Nepali telecoms, you will need the following details provided by the ISP/Telecom:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li>SIP Server IP Address (e.g. 10.x.x.x)</li>
            <li>SIP Port (usually 5060)</li>
            <li>Authentication Username / Digest</li>
            <li>Authentication Password</li>
            <li>Provided Phone Numbers / DID Pool</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-gray-600" />
            Security & Encryption
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            All SIP passwords and IP-PBX configuration secrets are encrypted at rest using AES-256-GCM. 
          </p>
          <p className="text-sm text-gray-600">
            Organization Admins <strong>cannot</strong> view or access these credentials. Only the Super Admin can modify infrastructure settings.
          </p>
        </div>
      </div>
    </div>
  );
}
