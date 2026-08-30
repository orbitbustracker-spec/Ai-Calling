const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.aIEngineConfig.updateMany({
    where: {
      providerName: {
        contains: 'Whisper',
        mode: 'insensitive'
      }
    },
    data: {
      baseUrl: 'https://appshall-devotion-update.ngrok-free.app'
    }
  });
  console.log('Updated AIEngineConfig:', updated.count);

  const updatedOrg = await prisma.organizationAiNode.updateMany({
    where: {
      nodeName: {
        contains: 'Whisper',
        mode: 'insensitive'
      }
    },
    data: {
      baseUrl: 'https://appshall-devotion-update.ngrok-free.app'
    }
  });
  console.log('Updated OrganizationAiNode:', updatedOrg.count);
}
main().catch(console.error).finally(() => prisma.$disconnect());
