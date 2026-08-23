const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:Istuti98510@db.ktnqomkuuisfafoaxwtc.supabase.co:5432/postgres?schema=public'
    }
  }
});
async function run() {
  const users = await prisma.user.findMany();
  console.log('Prisma Users:', users);
  process.exit(0);
}
run().catch(console.error);
