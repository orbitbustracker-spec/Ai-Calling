require('dotenv').config(); 
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true' } } }); 

async function main() { 
  await prisma.user.update({ 
    where: { email: 'istuti1133@gmail.com' }, 
    data: { role: 'ORGANIZATION_ADMIN' } 
  }); 
  console.log('Downgraded to ORGANIZATION_ADMIN'); 
} 
main().catch(console.error).finally(() => prisma.$disconnect());
