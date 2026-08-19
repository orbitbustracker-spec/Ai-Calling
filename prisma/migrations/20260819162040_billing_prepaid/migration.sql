/*
  Warnings:

  - The `status` column on the `Call` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `cost` on the `UsageRecord` table. All the data in the column will be lost.
  - You are about to drop the column `minutes` on the `UsageRecord` table. All the data in the column will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('INITIATED', 'RINGING', 'ANSWERED', 'COMPLETED', 'FAILED', 'NO_ANSWER', 'BUSY', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BillingPolicy" AS ENUM ('PER_MINUTE_ROUNDED_UP', 'PER_SECOND');

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_organizationId_fkey";

-- AlterTable
ALTER TABLE "BillingConfig" ADD COLUMN     "billingPolicy" "BillingPolicy" NOT NULL DEFAULT 'PER_MINUTE_ROUNDED_UP';

-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "billableSeconds" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customerPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "providerCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "providerMetadata" JSONB,
DROP COLUMN "status",
ADD COLUMN     "status" "CallStatus" NOT NULL DEFAULT 'INITIATED';

-- AlterTable
ALTER TABLE "UsageRecord" DROP COLUMN "cost",
DROP COLUMN "minutes",
ADD COLUMN     "billableMinutes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "callId" TEXT,
ADD COLUMN     "customerPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "providerCost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "OrganizationBalance" (
    "id" TEXT NOT NULL,
    "remainingMinutes" INTEGER NOT NULL DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "ratePerMinute" DOUBLE PRECISION NOT NULL,
    "calculatedPrice" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageAssignment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "packageId" TEXT,
    "purchasedMinutes" INTEGER NOT NULL,
    "usedMinutes" INTEGER NOT NULL DEFAULT 0,
    "remainingMinutes" INTEGER NOT NULL,
    "packagePrice" DOUBLE PRECISION NOT NULL,
    "ratePerMinuteAtPurchase" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingTransaction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "description" TEXT,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previousBalance" INTEGER NOT NULL,
    "adjustment" INTEGER NOT NULL,
    "newBalance" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdempotencyKey" (
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdempotencyKey_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationBalance_organizationId_key" ON "OrganizationBalance"("organizationId");

-- CreateIndex
CREATE INDEX "OrganizationBalance_organizationId_idx" ON "OrganizationBalance"("organizationId");

-- CreateIndex
CREATE INDEX "PackageAssignment_organizationId_idx" ON "PackageAssignment"("organizationId");

-- CreateIndex
CREATE INDEX "BillingTransaction_organizationId_idx" ON "BillingTransaction"("organizationId");

-- CreateIndex
CREATE INDEX "AuditLog_organizationId_idx" ON "AuditLog"("organizationId");

-- CreateIndex
CREATE INDEX "UsageRecord_callId_idx" ON "UsageRecord"("callId");

-- AddForeignKey
ALTER TABLE "OrganizationBalance" ADD CONSTRAINT "OrganizationBalance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageAssignment" ADD CONSTRAINT "PackageAssignment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageAssignment" ADD CONSTRAINT "PackageAssignment_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingTransaction" ADD CONSTRAINT "BillingTransaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE SET NULL ON UPDATE CASCADE;
