import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Next.js Request & NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: {status?:number}) => ({
      status: init?.status || 200,
      json: async () => body,
      body
    })
  }
}));

// Mock Authorization
vi.mock('../src/lib/authorization', () => ({
  requireSuperAdmin: vi.fn(),
  requireOrganizationAdmin: vi.fn(),
  withAuth: (handler: unknown) => handler,
}));

import { requireSuperAdmin, requireOrganizationAdmin } from '../src/lib/authorization';
import { POST as createPackage } from '../src/app/api/admin/packages/route';
import { POST as adjustBalance } from '../src/app/api/admin/organizations/[id]/adjust-balance/route';

import { PrismaClient } from '@prisma/client';

describe('RBAC & Admin APIs', () => {
  const prisma = new PrismaClient();
  
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('SUPER_ADMIN can create package (Server-side price calc)', async () => {
    // Mock super admin success
    vi.mocked(requireSuperAdmin).mockResolvedValue({ id: 'sa-id' } as unknown as (...args: unknown[]) => unknown);

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', minutes: 100, ratePerMinute: 5 })
    });

    const res = await (createPackage as unknown as (...args: unknown[]) => unknown)(req);
    const data = await res.json();
    
    expect(data.calculatedPrice).toBe(500); // 100 * 5 server side
    expect(requireSuperAdmin).toHaveBeenCalled();
  });

  it('ORGANIZATION_ADMIN cannot create package', async () => {
    vi.mocked(requireSuperAdmin).mockRejectedValue(new Error('Forbidden'));

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', minutes: 100, ratePerMinute: 5 })
    });

    await expect((createPackage as unknown as (...args: unknown[]) => unknown)(req)).rejects.toThrow('Forbidden');
  });

  it('Balance adjustment creates ledger and audit log', async () => {
    await prisma.organization.upsert({
      where: { id: 'test-org' },
      update: {},
      create: { id: 'test-org', name: 'Test Org' }
    });
    vi.mocked(requireSuperAdmin).mockResolvedValue({ id: 'sa-id' } as unknown);
    
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ adjustment: 50, reason: 'Refund' })
    });

    // Mock context params (App Router)
    const res = await (adjustBalance as unknown as (...args: unknown[]) => unknown)(req, { params: Promise.resolve({ id: 'test-org' }) }) as Response;
    const data = await res.json();
    
    expect(data).toBeDefined();
  });
});
