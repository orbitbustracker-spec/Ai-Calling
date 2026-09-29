import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireOrganizationMember } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { organizationId } = await requireOrganizationMember();
    const { conversationId, text, takeover } = await req.json();

    const conversation = await prisma.omnichannelConversation.findFirst({
      where: { id: conversationId, organizationId }
    });

    if (!conversation) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // If takeover is true, switch AI off
    if (takeover) {
      await prisma.omnichannelConversation.update({
        where: { id: conversationId },
        data: { aiStatus: 'HUMAN_TAKEOVER' }
      });
    }

    // Save message to DB
    const newMessage = await prisma.omnichannelMessage.create({
      data: {
        conversationId,
        senderType: 'HUMAN_AGENT',
        content: text,
        status: 'SENT'
      }
    });

    // In a real app, send actual WhatsApp API request here

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Send Reply Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}