import { PrismaClient } from '@prisma/client';
import CreatePackageForm from './CreatePackageForm';

const prisma = new PrismaClient();

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Package Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Package</h2>
          <CreatePackageForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Packages</h2>
          <div className="bg-white rounded-lg shadow border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 font-medium text-gray-600">Package Name</th>
                  <th className="p-4 font-medium text-gray-600">Minutes</th>
                  <th className="p-4 font-medium text-gray-600">Rate</th>
                  <th className="p-4 font-medium text-gray-600">Price</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="p-4">{pkg.name}</td>
                    <td className="p-4">{pkg.minutes.toLocaleString()}</td>
                    <td className="p-4">Rs. {pkg.ratePerMinute.toFixed(2)}</td>
                    <td className="p-4 font-semibold text-green-600">Rs. {pkg.calculatedPrice.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">No packages created yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
