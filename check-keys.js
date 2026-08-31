const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const nodes = await prisma.aIEngineConfig.findMany();
  nodes.forEach(n => {
    console.log(Name: , Type: , HasKey: );
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
