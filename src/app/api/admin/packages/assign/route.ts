import { requireSuperAdmin, withAuth } from "@/lib/authorization";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function assignPackageHandler(req: Request) {
  const superAdmin = await requireSuperAdmin();

  const { organizationId, packageId } = await req.json();

  if (!organizationId || !packageId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  if (!pkg) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  // Use a transaction to assign the package, update balance, and create an audit log
  const result = await prisma.$transaction(async (tx) => {
    const assignment = await tx.packageAssignment.create({
      data: {
        organizationId,
        packageId,
        purchasedMinutes: pkg.minutes,
        remainingMinutes: pkg.minutes,
        packagePrice: pkg.calculatedPrice,
        ratePerMinuteAtPurchase: pkg.ratePerMinute
      }
    });

    const balance = await tx.organizationBalance.upsert({
      where: { organizationId },
      update: {
        remainingMinutes: { increment: pkg.minutes }
      },
      create: {
        organizationId,
        remainingMinutes: pkg.minutes
      }
    });

    await tx.billingTransaction.create({
      data: {
        organizationId,
        type: 'ADDITION',
        minutes: pkg.minutes,
        balanceAfter: balance.remainingMinutes,
        description: `Purchased package: ${pkg.name}`,
        referenceId: assignment.id
      }
    });

    await tx.auditLog.create({
      data: {
        actorUserId: superAdmin.id,
        organizationId,
        action: 'ASSIGN_PACKAGE',
        previousBalance: balance.remainingMinutes - pkg.minutes,
        adjustment: pkg.minutes,
        newBalance: balance.remainingMinutes,
        reason: `Assigned package ${pkg.name}`
      }
    });

    return { assignment, balance };
  });

  return NextResponse.json(result);
}

export const POST = withAuth(assignPackageHandler);
