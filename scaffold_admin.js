const fs = require('fs');
const path = require('path');

const files = {
  "src/app/(admin-dashboard)/admin/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function SuperAdminOverview() {
  await requireSuperAdmin();
  
  const orgCount = await prisma.organization.count();
  const activeOrgCount = await prisma.organization.count({ where: { isActive: true } });
  
  const pkgAssignments = await prisma.packageAssignment.findMany();
  const totalPurchased = pkgAssignments.reduce((acc, curr) => acc + curr.purchasedMinutes, 0);
  const totalUsed = pkgAssignments.reduce((acc, curr) => acc + curr.usedMinutes, 0);
  const totalRemaining = pkgAssignments.reduce((acc, curr) => acc + curr.remainingMinutes, 0);
  const totalRevenue = pkgAssignments.reduce((acc, curr) => acc + curr.packagePrice, 0);
  
  const totalCalls = await prisma.call.count();
  const usageRecords = await prisma.usageRecord.findMany();
  const totalBillableMinutes = usageRecords.reduce((acc, curr) => acc + curr.billableMinutes, 0);

  const billingConfig = await prisma.billingConfig.findFirst();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Platform Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Organizations</div><div className="text-2xl font-bold">{orgCount}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Active Organizations</div><div className="text-2xl font-bold">{activeOrgCount}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Revenue</div><div className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Current Rate</div><div className="text-2xl font-bold">Rs. {billingConfig?.customerPricePerMinute || 5}/min</div></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Purchased Minutes</div><div className="text-2xl font-bold">{totalPurchased.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Used Minutes</div><div className="text-2xl font-bold">{totalUsed.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Remaining Minutes</div><div className="text-2xl font-bold">{totalRemaining.toLocaleString()}</div></div>
        <div className="p-4 bg-white shadow rounded border"><div className="text-sm text-gray-500">Total Billable Calls</div><div className="text-2xl font-bold">{totalCalls.toLocaleString()}</div></div>
      </div>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/packages/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import CreatePackageForm from '../../../packages/CreatePackageForm';

const prisma = new PrismaClient();

export default async function AdminPackagesPage() {
  await requireSuperAdmin();
  const packages = await prisma.package.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Package Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div><h2 className="text-xl font-semibold mb-4">Create New Package</h2><CreatePackageForm /></div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Packages</h2>
          <div className="bg-white rounded-lg shadow border overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b"><tr><th className="p-4">Name</th><th className="p-4">Minutes</th><th className="p-4">Price</th></tr></thead>
              <tbody className="divide-y">
                {packages.map(pkg => (
                  <tr key={pkg.id}>
                    <td className="p-4">{pkg.name}</td>
                    <td className="p-4">{pkg.minutes}</td>
                    <td className="p-4 font-bold text-green-600">Rs. {pkg.calculatedPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/packages/assign/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import AssignPackageClient from './AssignPackageClient';

const prisma = new PrismaClient();

export default async function AssignPackagePage() {
  await requireSuperAdmin();
  const orgs = await prisma.organization.findMany({ where: { isActive: true } });
  const packages = await prisma.package.findMany({ where: { isActive: true } });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Assign Package</h1>
      <AssignPackageClient organizations={orgs} packages={packages} />
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/packages/assign/AssignPackageClient.tsx": `
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssignPackageClient({ organizations, packages }: { organizations: any[], packages: any[] }) {
  const router = useRouter();
  const [orgId, setOrgId] = useState(organizations[0]?.id || '');
  const [pkgId, setPkgId] = useState(packages[0]?.id || '');
  const [msg, setMsg] = useState('');

  const selectedPkg = packages.find(p => p.id === pkgId);

  const handleAssign = async () => {
    try {
      const res = await fetch('/api/admin/packages/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId, packageId: pkgId })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Assigned successfully!');
      router.refresh();
    } catch (e: any) {
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded border space-y-4">
      <div>
        <label className="block mb-1">Organization</label>
        <select value={orgId} onChange={e => setOrgId(e.target.value)} className="w-full border p-2 rounded">
          {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block mb-1">Package</label>
        <select value={pkgId} onChange={e => setPkgId(e.target.value)} className="w-full border p-2 rounded">
          {packages.map(p => <option key={p.id} value={p.id}>{p.name} ({p.minutes} mins - Rs. {p.calculatedPrice})</option>)}
        </select>
      </div>
      {selectedPkg && (
        <div className="p-4 bg-gray-50 border rounded">
          <p><strong>Minutes:</strong> {selectedPkg.minutes}</p>
          <p><strong>Price:</strong> Rs. {selectedPkg.calculatedPrice}</p>
        </div>
      )}
      {msg && <div className="text-blue-600">{msg}</div>}
      <button onClick={handleAssign} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Assignment</button>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/organizations/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminOrgsPage() {
  await requireSuperAdmin();
  const orgs = await prisma.organization.findMany({
    include: {
      organizationBalance: true,
      packageAssignments: { where: { status: 'ACTIVE' }, take: 1 }
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Organizations</h1>
      <div className="bg-white rounded shadow border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Name</th><th className="p-4">Status</th><th className="p-4">Remaining Mins</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {orgs.map(org => (
              <tr key={org.id}>
                <td className="p-4">{org.name}</td>
                <td className="p-4">{org.isActive ? 'Active' : 'Inactive'}</td>
                <td className="p-4">{org.organizationBalance?.remainingMinutes || 0}</td>
                <td className="p-4"><Link href={\`/admin/organizations/\${org.id}\`} className="text-blue-600 underline">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/billing/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import BillingConfigClient from './BillingConfigClient';

const prisma = new PrismaClient();

export default async function BillingConfigPage() {
  await requireSuperAdmin();
  const config = await prisma.billingConfig.findFirst();

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-8">Billing Configuration</h1>
      <BillingConfigClient initialConfig={config} />
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/billing/BillingConfigClient.tsx": `
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BillingConfigClient({ initialConfig }: { initialConfig: any }) {
  const router = useRouter();
  const [rate, setRate] = useState(initialConfig?.customerPricePerMinute || 5);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/billing-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerPricePerMinute: rate })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Saved successfully!');
      router.refresh();
    } catch (e: any) {
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded border space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Default Platform Rate (Rs. / minute)</label>
        <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
      <p className="text-sm text-gray-500">Note: Changing this does not affect historical package purchases.</p>
      {msg && <div className="text-blue-600">{msg}</div>}
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Configuration</button>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/audit-logs/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AuditLogsPage() {
  await requireSuperAdmin();
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Audit Logs</h1>
      <div className="bg-white rounded shadow border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Date</th><th className="p-4">Action</th><th className="p-4">Org ID</th><th className="p-4">Adjustment</th><th className="p-4">Reason</th></tr>
          </thead>
          <tbody className="divide-y">
            {logs.map(log => (
              <tr key={log.id}>
                <td className="p-4">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-4 font-mono text-xs">{log.action}</td>
                <td className="p-4 font-mono text-xs">{log.organizationId}</td>
                <td className="p-4">{log.adjustment}</td>
                <td className="p-4">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`,
  "src/app/api/admin/billing-config/route.ts": `
import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateBillingConfig(req: Request) {
  const superAdmin = await requireSuperAdmin();
  const { customerPricePerMinute } = await req.json();

  const existing = await prisma.billingConfig.findFirst();
  let config;
  if (existing) {
    config = await prisma.billingConfig.update({
      where: { id: existing.id },
      data: { customerPricePerMinute, aiCallRatePerMinute: customerPricePerMinute }
    });
  } else {
    config = await prisma.billingConfig.create({
      data: { customerPricePerMinute, aiCallRatePerMinute: customerPricePerMinute }
    });
  }

  await prisma.auditLog.create({
    data: {
      actorUserId: superAdmin.id,
      organizationId: 'SYSTEM',
      action: 'BILLING_RATE_CHANGED',
      previousBalance: 0, adjustment: 0, newBalance: 0,
      reason: \`Rate changed to \${customerPricePerMinute}\`
    }
  });

  return NextResponse.json(config);
}
export const POST = withAuth(updateBillingConfig);
`,
  "src/app/(admin-dashboard)/admin/organizations/[id]/page.tsx": `
import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import AdjustBalanceClient from './AdjustBalanceClient';

const prisma = new PrismaClient();

export default async function OrgDetailPage(props: { params: Promise<{ id: string }> }) {
  await requireSuperAdmin();
  
  // Await the params object before accessing its properties
  const params = await props.params;
  const { id } = params;

  const org = await prisma.organization.findUnique({
    where: { id },
    include: { organizationBalance: true, packageAssignments: { orderBy: { createdAt: 'desc' } } }
  });

  if (!org) return <div>Org not found</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Organization: {org.name}</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <p>Status: {org.isActive ? 'Active' : 'Inactive'}</p>
          <p>Remaining Minutes: <strong>{org.organizationBalance?.remainingMinutes || 0}</strong></p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4">Manual Adjustment</h2>
          <AdjustBalanceClient orgId={org.id} />
        </div>
      </div>
    </div>
  );
}
`,
  "src/app/(admin-dashboard)/admin/organizations/[id]/AdjustBalanceClient.tsx": `
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdjustBalanceClient({ orgId }: { orgId: string }) {
  const router = useRouter();
  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  const handleAdjust = async () => {
    try {
      const res = await fetch(\`/api/admin/organizations/\${orgId}/adjust-balance\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adjustment, reason })
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Adjusted successfully!');
      router.refresh();
    } catch (e: any) {
      setMsg('Error: ' + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Adjustment (Minutes, use negative to remove)</label>
        <input type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm">Reason</label>
        <input type="text" value={reason} onChange={e => setReason(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      {msg && <div className="text-sm text-blue-600">{msg}</div>}
      <button onClick={handleAdjust} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Adjustment</button>
    </div>
  );
}
`,
  "src/app/api/admin/organizations/[id]/adjust-balance/route.ts": `
import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function adjustBalance(req: Request, context: { params: Promise<{ id: string }> }) {
  const superAdmin = await requireSuperAdmin();
  // Await params first
  const { id: orgId } = await context.params;
  const { adjustment, reason } = await req.json();

  if (!reason) return NextResponse.json({ error: "Reason required" }, { status: 400 });

  const result = await prisma.$transaction(async (tx) => {
    const balance = await tx.organizationBalance.upsert({
      where: { organizationId: orgId },
      update: { remainingMinutes: { increment: adjustment } },
      create: { organizationId: orgId, remainingMinutes: adjustment }
    });

    await tx.billingTransaction.create({
      data: {
        organizationId: orgId,
        type: 'ADJUSTMENT',
        minutes: adjustment,
        balanceAfter: balance.remainingMinutes,
        description: \`Manual adjustment: \${reason}\`
      }
    });

    await tx.auditLog.create({
      data: {
        actorUserId: superAdmin.id,
        organizationId: orgId,
        action: 'BALANCE_ADJUSTED',
        previousBalance: balance.remainingMinutes - adjustment,
        adjustment,
        newBalance: balance.remainingMinutes,
        reason
      }
    });

    return balance;
  });

  return NextResponse.json(result);
}

export const POST = withAuth(adjustBalance);
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content.trim() + '\\n');
}
console.log('Scaffold complete.');
