
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const all = await prisma.pendingRegistration.findMany();
  console.log(all.map(a => a.email));
}
main().finally(() => prisma.$disconnect());

