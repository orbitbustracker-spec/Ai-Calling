import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    await requireSuperAdmin();
    const { organizationId, provider, credentials } = await req.json();

    const integration = await prisma.omnichannelIntegration.upsert({
      where: {
        organizationId_provider: {
          organizationId,
          provider
        }
      },
      update: {
        credentials,
        isActive: true
      },
      create: {
        organizationId,
        provider,
        credentials,
        isActive: true
      }
    });

    return NextResponse.json({ success: true, integration });
  } catch (error: any) {
    console.error('Omnichannel Save Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
