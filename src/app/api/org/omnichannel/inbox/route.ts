import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { organizationId } = await requireOrganizationMember();

    const conversations = await prisma.omnichannelConversation.findMany({
      where: { organizationId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 50
        }
      },
      orderBy: { lastMessageAt: 'desc' }
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Fetch Inbox Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}