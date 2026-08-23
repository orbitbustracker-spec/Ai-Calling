const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:Istuti98510@db.ktnqomkuuisfafoaxwtc.supabase.co:5432/postgres?schema=public'
    }
  }
});
prisma.user.findMany().then(users => {
  console.log('Users in Supabase DB:', users);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
