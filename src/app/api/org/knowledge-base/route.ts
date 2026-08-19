import { requireOrganizationAdmin, withAuth } from "@/lib/authorization";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createKnowledgeBaseHandler(req: Request) {
  // STRICT BACKEND SECURITY: Gets the organizationId from the secure session.
  // Throws HTTP 403 if user is not an ORGANIZATION_ADMIN.
  const sessionOrganizationId = await requireOrganizationAdmin();

  const body = await req.json();

  // TENANT ISOLATION: We forcefully use the session's organizationId, 
  // ignoring any potentially malicious organizationId sent in the frontend body.
  const newKB = await prisma.knowledgeBase.create({
    data: {
      name: body.name,
      content: body.content,
      organizationId: sessionOrganizationId,
    }
  });

  return NextResponse.json({ message: "Knowledge base created", data: newKB });
}

export const POST = withAuth(createKnowledgeBaseHandler);
