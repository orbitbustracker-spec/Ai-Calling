const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function main() {
  let org = await prisma.organization.findFirst({ where: { name: 'Changunarayan Municipality' } });
  if (!org) {
    org = await prisma.organization.create({
      data: { name: 'Changunarayan Municipality', isActive: true, organizationBalance: { create: { remainingMinutes: 5000 } } }
    });
  }

  let admin = await prisma.user.findUnique({ where: { email: 'admin@changunarayan.gov.np' } });
  if (!admin) {
    await prisma.user.create({
      data: { id: crypto.randomUUID(), email: 'admin@changunarayan.gov.np', name: 'Changunarayan Admin', role: 'ORGANIZATION_ADMIN', organizationId: org.id }
    });
  }

  await prisma.knowledgeBase.deleteMany({ where: { organizationId: org.id } });
  await prisma.knowledgeBase.create({ data: { name: 'Tax Details 2080-2081.pdf', content: 'This document contains tax details for the fiscal year 2080-2081 for Changunarayan Municipality. Property tax is 2%.', organizationId: org.id } });
  await prisma.knowledgeBase.create({ data: { name: 'Municipality Office Hours', content: 'Office hours are 10 AM to 5 PM Sunday to Thursday. 10 AM to 3 PM on Friday. Closed on Saturday and public holidays.', organizationId: org.id } });
  await prisma.knowledgeBase.create({ data: { name: 'Official Website (changunarayan.gov.np)', content: 'Content scraped from official website. Includes services like birth registration, marriage registration, and building permits.', organizationId: org.id } });

  let provider = await prisma.telephonyProvider.findFirst({ where: { name: 'NTC Main Trunk' } });
  if (!provider) {
    provider = await prisma.telephonyProvider.create({ data: { name: 'NTC Main Trunk', providerType: 'NTC_TRUNK', configuration: '{}' } });
  }

  await prisma.phoneNumberMapping.deleteMany({ where: { organizationId: org.id } });
  await prisma.phoneNumberMapping.create({ data: { phoneNumber: '+97715000000', providerId: provider.id, organizationId: org.id } });

  console.log('Seed completed successfully for Changunarayan Municipality!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
