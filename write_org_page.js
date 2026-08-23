
const fs = require("fs");
const content = `export const dynamic = "force-dynamic";
import { requireSuperAdmin } from "@/lib/authorization";
import { PrismaClient } from "@prisma/client";
import AdjustBalanceClient from "./AdjustBalanceClient";
import { Database, Phone, Link2, UserCircle } from "lucide-react";

const prisma = new PrismaClient();

export default async function OrgDetailPage(props: { params: Promise<{ id: string }> }) {
  await requireSuperAdmin();
  
  const params = await props.params;
  const { id } = params;

  const org = await prisma.organization.findUnique({
    where: { id },
    include: { 
      organizationBalance: true, 
      packageAssignments: { orderBy: { createdAt: "desc" } },
      knowledgeBases: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!org) return <div>Org not found</div>;

  const sipMappings = await prisma.phoneNumberMapping.findMany({
    where: { organizationId: org.id }
  });

  const clientDetails = await prisma.pendingRegistration.findFirst({
    where: { companyName: org.name, status: { in: ["COMPLETED", "APPROVED"] } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organization: {org.name}</h1>
        <span className={\`px-4 py-2 rounded-full text-sm font-bold \${org.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}\`}>
          {org.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {clientDetails && (
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserCircle className="h-5 w-5 text-indigo-600"/> Client Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Contact Person</p>
              <p className="font-medium text-gray-900">{clientDetails.firstName} {clientDetails.lastName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Job Title</p>
              <p className="font-medium text-gray-900">{clientDetails.jobTitle}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
              <p className="font-medium text-gray-900">{clientDetails.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Phone</p>
              <p className="font-medium text-gray-900">{clientDetails.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Website</p>
              <a href={clientDetails.website} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:underline">{clientDetails.website}</a>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Country</p>
              <p className="font-medium text-gray-900">{clientDetails.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Telephony Setup</p>
              <p className="font-medium text-gray-900">{clientDetails.pbxProfile}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Database className="h-5 w-5 text-indigo-600"/> Balance & Credits</h2>
          <p className="text-gray-600">Remaining Minutes:</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{org.organizationBalance?.remainingMinutes || 0} <span className="text-sm font-normal text-gray-500">mins</span></p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">Adjust Balance</h3>
            <AdjustBalanceClient orgId={org.id} />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Phone className="h-5 w-5 text-indigo-600"/> SIP / Provider Connections</h2>
          {sipMappings.length === 0 ? (
            <p className="text-gray-500 text-sm">No phone numbers or SIP trunks mapped to this organization.</p>
          ) : (
            <ul className="space-y-3">
              {sipMappings.map(sip => (
                <li key={sip.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                  <span className="font-medium text-gray-800">{sip.phoneNumber}</span>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">Mapped</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Link2 className="h-5 w-5 text-indigo-600"/> Knowledge Bases</h2>
          {org.knowledgeBases.length === 0 ? (
            <p className="text-gray-500 text-sm">No knowledge bases uploaded by this organization yet.</p>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {org.knowledgeBases.map(kb => (
                <li key={kb.id} className="p-3 bg-blue-50 rounded border border-blue-100">
                  <p className="font-semibold text-blue-900 text-sm truncate">{kb.name}</p>
                  <p className="text-xs text-blue-600 mt-1">Added: {new Date(kb.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}`;
fs.writeFileSync("src/app/(admin-dashboard)/admin/organizations/[id]/page.tsx", content);

