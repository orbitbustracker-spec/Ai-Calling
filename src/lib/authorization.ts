import { createClient } from '@/utils/supabase/server'
import { Role, PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export class AuthorizationError extends Error {
  constructor(message: string = "Forbidden") {
    super(message)
    this.name = "AuthorizationError"
  }
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Fetch role and org info from our Prisma DB
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  })

  // Local Dev Fallback: If user exists in Supabase but not in local DB with that ID
  if (!dbUser && user.email) {
    try {
      dbUser = await prisma.user.upsert({
        where: { email: user.email },
        update: { id: user.id },
        create: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || 'Admin User',
          role: Role.SUPER_ADMIN, 
        }
      });
    } catch (e) {
      console.error('Failed to upsert user during auth fallback:', e);
      // In case of extreme race conditions, try fetching one last time
      dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    }
  }

  return dbUser
}

export async function getCurrentOrganization() {
  const user = await getCurrentUser()
  if (!user || !user.organizationId) {
    throw new AuthorizationError("User does not belong to an organization.")
  }
  return user.organizationId
}

export async function requireSuperAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== Role.SUPER_ADMIN) {
    throw new AuthorizationError("Super Admin access required.")
  }
  return user
}

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

export async function requireOrganizationMember() {
  const user = await getCurrentUser()
  if (!user || !user.organizationId) {
    throw new AuthorizationError("Organization member access required.")
  }
  return { user, organizationId: user.organizationId }
}

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
