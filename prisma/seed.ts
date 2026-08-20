import crypto from 'crypto';
import { PrismaClient, Role } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  

  // 1 SUPER_ADMIN
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'superadmin@example.com',
      name: 'Super Admin',
      
      role: Role.SUPER_ADMIN,
    },
  })

  // 1 demo organization
  const demoOrg = await prisma.organization.upsert({
    where: { id: 'demo-org-id' },
    update: {},
    create: {
      id: 'demo-org-id',
      name: 'Demo Organization',
    },
  })

  // 1 ORGANIZATION_ADMIN
  await prisma.user.upsert({
    where: { email: 'orgadmin@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'orgadmin@example.com',
      name: 'Organization Admin',
      
      role: Role.ORGANIZATION_ADMIN,
      organizationId: demoOrg.id,
    },
  })

  // 1 SUPERVISOR
  await prisma.user.upsert({
    where: { email: 'supervisor@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'supervisor@example.com',
      name: 'Supervisor',
      
      role: Role.SUPERVISOR,
      organizationId: demoOrg.id,
    },
  })

  // 1 AGENT
  await prisma.user.upsert({
    where: { email: 'agent@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'agent@example.com',
      name: 'Agent',
      
      role: Role.AGENT,
      organizationId: demoOrg.id,
    },
  })

  // 1 VIEWER
  await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'viewer@example.com',
      name: 'Viewer',
      
      role: Role.VIEWER,
      organizationId: demoOrg.id,
    },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


