
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const res = await prisma.pendingRegistration.findMany();
    console.log('Success, found records:', res.length);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();

