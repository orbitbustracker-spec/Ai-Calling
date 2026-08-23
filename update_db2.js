
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});
async function main() {
  console.log("Updating database schema...");
  try {
    await prisma.$executeRawUnsafe(`CREATE TYPE "Channel" AS ENUM ('NTC_NCELL', 'WHATSAPP', 'MESSENGER', 'INSTAGRAM', 'TIKTOK', 'TELEGRAM', 'VIBER', 'LINKEDIN', 'CUSTOM_WEBHOOK');`);
  } catch(e) { console.error("Error creating Channel enum:", e.message); }
  
  try {
    await prisma.$executeRawUnsafe(`CREATE TYPE "UsageType" AS ENUM ('VOICE_CALL', 'TEXT_MESSAGE', 'MEDIA_MESSAGE');`);
  } catch(e) { console.error("Error creating UsageType enum:", e.message); }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "phone" TEXT;`);
  } catch(e) { console.error("Error adding phone to User:", e.message); }

  try {
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");`);
  } catch(e) { console.error("Error creating unique index for phone:", e.message); }

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "OrganizationUsageLog" (
        "id" TEXT NOT NULL,
        "organizationId" TEXT NOT NULL,
        "type" "UsageType" NOT NULL,
        "channel" "Channel" NOT NULL,
        "durationSeconds" INTEGER,
        "messageCount" INTEGER,
        "rateApplied" DOUBLE PRECISION NOT NULL,
        "totalDeductedNpr" DOUBLE PRECISION NOT NULL,
        "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "OrganizationUsageLog_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "OrganizationUsageLog" ADD CONSTRAINT "OrganizationUsageLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    console.log("Table OrganizationUsageLog created.");
  } catch(e) { console.error("Error creating OrganizationUsageLog:", e.message); }
}
main().finally(()=>prisma.$disconnect());

