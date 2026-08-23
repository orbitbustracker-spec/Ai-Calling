
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const record = await prisma.pendingRegistration.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '123456',
        companyName: 'Test Inc',
        website: 'https://test.com',
        jobTitle: 'CEO',
        country: 'Nepal',
        pbxProfile: 'NEW_SETUP',
      }
    });
    console.log(record);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

