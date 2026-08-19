import { requireSuperAdmin, withAuth } from "@/lib/authorization";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPackageHandler(req: Request) {
  await requireSuperAdmin();

  const { name, minutes, ratePerMinute } = await req.json();

  if (!name || !minutes || ratePerMinute === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Calculate automatically server-side
  const calculatedPrice = minutes * ratePerMinute;

  const pkg = await prisma.package.create({
    data: {
      name,
      minutes,
      ratePerMinute,
      calculatedPrice
    }
  });

  return NextResponse.json(pkg);
}

export const POST = withAuth(createPackageHandler);
