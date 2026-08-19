import { requireOrganizationAdmin, withAuth } from "@/lib/authorization";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getBillingSummaryHandler(req: Request) {
  // STRICT TENANT ISOLATION
  const organizationId = await requireOrganizationAdmin();

  const balance = await prisma.organizationBalance.findUnique({
    where: { organizationId }
  });

  const activeAssignments = await prisma.packageAssignment.findMany({
    where: { organizationId, status: 'ACTIVE' },
    orderBy: { purchasedAt: 'desc' }
  });

  const recentUsage = await prisma.usageRecord.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { call: true }
  });

  return NextResponse.json({
    remainingMinutes: balance?.remainingMinutes || 0,
    activeAssignments,
    recentUsage
  });
}

export const GET = withAuth(getBillingSummaryHandler);
