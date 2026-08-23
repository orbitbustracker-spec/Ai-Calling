const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
    }
  }
});
async function run() {
  try {
    const users = await prisma.user.findMany();
    console.log('Connected via pooler with Istuti98510! Users count:', users.length);
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect:', err);
    process.exit(1);
  }
}
run();
