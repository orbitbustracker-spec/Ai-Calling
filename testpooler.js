const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti%4098510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
    }
  }
});
async function run() {
  try {
    const users = await prisma.user.findMany();
    console.log('Connected via pooler! Users count:', users.length);
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect:', err);
    process.exit(1);
  }
}
run();
