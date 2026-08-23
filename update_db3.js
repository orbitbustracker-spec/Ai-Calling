
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.ktnqomkuuisfafoaxwtc:Istuti98510@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});
async function main() {
  console.log("Updating database schema 3...");
  try {
    await prisma.$executeRawUnsafe(`CREATE TYPE "FeatureKey" AS ENUM ('EXTENSIONS', 'VOICEMAIL', 'THREE_WAY_CALLING', 'TRANSFERS', 'CAMPAIGNS', 'SMART_DIALER', 'VOICE_BROADCASTING', 'CLICK_TO_CALL', 'CUSTOMER_CRM', 'CALL_NOTES', 'CALL_TAGGING', 'PERSONALIZED_MESSAGES', 'SOCIAL_INTEGRATIONS');`);
  } catch(e) { console.error("Error creating FeatureKey enum:", e.message); }
  
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "FeatureConfiguration" (
        "id" TEXT NOT NULL,
        "organizationId" TEXT NOT NULL,
        "featureKey" "FeatureKey" NOT NULL,
        "configData" JSONB NOT NULL DEFAULT '{}',
        "isEnabledByAdmin" BOOLEAN NOT NULL DEFAULT false,
        "isUnlockedByPayment" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "FeatureConfiguration_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX "FeatureConfiguration_organizationId_featureKey_key" ON "FeatureConfiguration"("organizationId", "featureKey");
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "FeatureConfiguration" ADD CONSTRAINT "FeatureConfiguration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  } catch(e) { console.error("Error creating FeatureConfiguration:", e.message); }

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "SuperAdminAuditLog" (
        "id" TEXT NOT NULL,
        "superAdminId" TEXT NOT NULL,
        "targetOrgId" TEXT NOT NULL,
        "featureKey" TEXT,
        "action" TEXT NOT NULL,
        "details" JSONB,
        "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "SuperAdminAuditLog_pkey" PRIMARY KEY ("id")
      );
    `);
  } catch(e) { console.error("Error creating SuperAdminAuditLog:", e.message); }
}
main().finally(()=>prisma.$disconnect());

