import { auth } from "./auth"
import { Role } from "@prisma/client"
import { NextResponse } from "next/server"

export class AuthorizationError extends Error {
  constructor(message: string = "Forbidden") {
    super(message)
    this.name = "AuthorizationError"
  }
}

/**
 * Helper to get the currently authenticated user from the session.
 */
export async function getCurrentUser() {
  const session = await auth()
  return session?.user || null
}

/**
 * Retrieves the organizationId from the authenticated server session.
 * Throws if the user does not belong to an organization.
 */
export async function getCurrentOrganization() {
  const user = await getCurrentUser()
  if (!user || !user.organizationId) {
    throw new AuthorizationError("User does not belong to an organization.")
  }
  return user.organizationId
}

/**
 * Ensures the user is a SUPER_ADMIN.
 * If used in an API Route Route Handler, can return a response or throw.
 */
export async function requireSuperAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== Role.SUPER_ADMIN) {
    throw new AuthorizationError("Super Admin access required.")
  }
  return user
}

/**
 * Ensures the user is an ORGANIZATION_ADMIN.
 * Returns the isolated organizationId for database queries.
 */
export async function requireOrganizationAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== Role.ORGANIZATION_ADMIN) {
    throw new AuthorizationError("Organization Admin access required.")
  }
  if (!user.organizationId) {
    throw new AuthorizationError("User does not belong to an organization.")
  }
  return user.organizationId
}

/**
 * Ensures the user belongs to an organization (any role except SUPER_ADMIN unless they are in an org).
 * Returns the isolated organizationId.
 */
export async function requireOrganizationMember() {
  const user = await getCurrentUser()
  if (!user || !user.organizationId) {
    throw new AuthorizationError("Organization member access required.")
  }
  return { user, organizationId: user.organizationId }
}

/**
 * Utility for API Routes to wrap handlers with error catching
 */
export function withAuth(handler: (req: Request, ...args: unknown[]) => Promise<NextResponse> | NextResponse) {
  return async (req: Request, ...args: unknown[]) => {
    try {
      return await handler(req, ...args)
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return new NextResponse(error.message, { status: 403 })
      }
      return new NextResponse("Internal Server Error", { status: 500 })
    }
  }
}
