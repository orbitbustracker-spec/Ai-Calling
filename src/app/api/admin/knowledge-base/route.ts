import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createKnowledgeBase(req: Request) {
  await requireSuperAdmin();
  const body = await req.json();
  const { organizationId, name, content } = body;

  if (!organizationId || !name || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const kb = await prisma.knowledgeBase.create({
    data: {
      organizationId,
      name,
      content,
    }
  });

  return NextResponse.json(kb);
}

export const POST = withAuth(createKnowledgeBase);
