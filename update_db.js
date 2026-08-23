
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});
async function main() {
  console.log("Adding columns...");
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "Organization" ADD COLUMN "isOmnichannelActive" BOOLEAN NOT NULL DEFAULT false;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Organization" ADD COLUMN "omnichannelExpiryDate" TIMESTAMP(3);`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Organization" ADD COLUMN "isCommerceActive" BOOLEAN NOT NULL DEFAULT false;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "Organization" ADD COLUMN "commerceMinutes" INTEGER NOT NULL DEFAULT 0;`);
    console.log("Done!");
  } catch(e) { console.error("Error:", e.message); }
}
main().finally(()=>prisma.$disconnect());

