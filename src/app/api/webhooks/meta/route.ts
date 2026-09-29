import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const VERIFY_TOKEN = "orbit_meta_webhook_2026"; // In production, move to .env

// Verify Webhook Challenge from Meta
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Handle Incoming Messages
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json({ error: 'Not Supported' }, { status: 404 });
    }

    for (const entry of body.entry) {
      for (const change of entry.changes) {
        if (change.value && change.value.messages) {
          const message = change.value.messages[0];
          const contact = change.value.contacts[0];
          
          const phone = message.from;
          const text = message.text?.body || "Media/Unsupported message";
          const contactName = contact?.profile?.name || "Unknown";
          const orgId = "cmt8mh6n10001ccu7fl34c04e"; // Hardcoded for Demo (Orbit Bus Tracker Org)
          
          // Find or create conversation
          let conversation = await prisma.omnichannelConversation.findUnique({
            where: {
              organizationId_platform_contactId: {
                organizationId: orgId,
                platform: 'WHATSAPP',
                contactId: phone
              }
            }
          });

          if (!conversation) {
            conversation = await prisma.omnichannelConversation.create({
              data: {
                organizationId: orgId,
                platform: 'WHATSAPP',
                contactId: phone,
                contactName: contactName,
                aiStatus: 'AI_ACTIVE',
              }
            });
          } else {
            conversation = await prisma.omnichannelConversation.update({
              where: { id: conversation.id },
              data: { lastMessageAt: new Date() }
            });
          }

          // Save Message
          await prisma.omnichannelMessage.create({
            data: {
              conversationId: conversation.id,
              senderType: 'CUSTOMER',
              content: text,
              status: 'DELIVERED'
            }
          });

          // Trigger AI Reply if Active (Simulated Async)
          if (conversation.aiStatus === 'AI_ACTIVE') {
            triggerAiReply(conversation.id, phone, text);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function triggerAiReply(conversationId: string, phone: string, text: string) {
  // In a real app, you call your LLM here and then send via WhatsApp Graph API.
  // For now, we simulate an AI response after 2 seconds.
  setTimeout(async () => {
    let replyText = "Thank you for reaching out! Our AI agent will process your request shortly.";
    if (text.toLowerCase().includes("discount")) {
      replyText = "We can offer a 10% discount on your next booking!";
    }

    await prisma.omnichannelMessage.create({
      data: {
        conversationId,
        senderType: 'AI',
        content: replyText,
        status: 'SENT'
      }
    });

    await prisma.omnichannelConversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() }
    });
  }, 2000);
}