
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 'test-user-id' },
    update: {},
    create: {
      id: 'test-user-id', // Needs to match their Supabase user ID ideally
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'SUPER_ADMIN'
    }
  });
  console.log(user);
}
main();
