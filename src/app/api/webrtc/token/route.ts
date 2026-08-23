import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Simplified auth check for demo purpose
    const userId = 'demo-user-123';
    const orgId = 'demo-org-456';

    const { extensionNumber, sipServer } = await req.json();

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour session

    const softphoneSession = await prisma.softphoneSession.create({
      data: {
        userId,
        orgId,
        extensionNumber: extensionNumber || '1000',
        sipServer: sipServer || 'wss://sip.demo.com',
        registerStatus: 'REGISTERED',
        expiresAt
      }
    });

    return NextResponse.json({
      token: `sip-token-${softphoneSession.id}`,
      wsServer: softphoneSession.sipServer,
      extension: softphoneSession.extensionNumber,
      expiresAt: softphoneSession.expiresAt
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
