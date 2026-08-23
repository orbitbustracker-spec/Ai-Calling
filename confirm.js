require('dotenv').config(); 
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true' } } }); 

async function main() { 
  const email = 'manepali133@gmail.com';
  console.log('Confirming:', email);
  
  const authUsers = await prisma.$queryRawUnsafe(`SELECT id FROM auth.users WHERE email = '${email}'`);
  if (!authUsers || authUsers.length === 0) {
    console.error('User not found in auth.users');
    return;
  }
  
  const userId = authUsers[0].id;
  await prisma.$executeRawUnsafe(`UPDATE auth.users SET email_confirmed_at = NOW() WHERE id = '${userId}'`); 
  console.log('Confirmed in auth.users!'); 
  
  // Also ensure they are in public.User
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    console.log("Adding to public.User...");
    await prisma.user.create({
      data: {
        id: userId,
        email,
        role: 'ORGANIZATION_ADMIN',
        status: 'ACTIVE'
      }
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'ORGANIZATION_ADMIN', status: 'ACTIVE' }
    });
  }
  
  console.log('User setup complete!');
} 
main().catch(console.error).finally(() => prisma.$disconnect());
