import { requireSuperAdmin } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireSuperAdmin();
  const { id } = await params;
  const nodes = await prisma.organizationAiNode.findMany({
    where: { organizationId: id }
  });
  return NextResponse.json(nodes);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireSuperAdmin();
  const { id } = await params;
  const data = await req.json(); // Array of assignments: { nodeType, nodeName, baseUrl, modelId }
  
  // Clear existing nodes for this org
  await prisma.organizationAiNode.deleteMany({
    where: { organizationId: id }
  });

  // Create new nodes
  const newNodes = await prisma.organizationAiNode.createMany({
    data: data.map((n: any) => ({
      organizationId: id,
      nodeType: n.nodeType,
      nodeName: n.nodeName,
      baseUrl: n.baseUrl,
      modelId: n.modelId
    }))
  });

  return NextResponse.json({ success: true, count: newNodes.count });
}
