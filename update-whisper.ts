import { PrismaClient } from '@prisma/client';
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
  console.log('Updated nodes in AIEngineConfig:', updated.count);

  const updatedOrgNodes = await prisma.organizationAiNode.updateMany({
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
  console.log('Updated nodes in OrganizationAiNode:', updatedOrgNodes.count);
}
main().catch(console.error).finally(() => prisma.());
