import { requireSuperAdmin, withAuth } from "@/lib/authorization";
import { NextResponse } from "next/server";

async function getProvidersHandler(req: Request) {
  // STRICT BACKEND SECURITY: Throws HTTP 403 if not SUPER_ADMIN
  await requireSuperAdmin();

  // If we reach here, the user is proven to be a SUPER_ADMIN.
  return NextResponse.json({ message: "Successfully accessed admin providers list." });
}

export const GET = withAuth(getProvidersHandler);
