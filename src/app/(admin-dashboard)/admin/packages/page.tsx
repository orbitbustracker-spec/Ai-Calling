import { requireSuperAdmin } from '@/lib/authorization';
import { PrismaClient } from '@prisma/client';
import CreatePackageForm from '../../packages/CreatePackageForm';

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
