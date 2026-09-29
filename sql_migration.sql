TRUNCATE TABLE "OmnichannelMessage";

CREATE TABLE "OmnichannelConversation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "contactName" TEXT,
    "aiStatus" TEXT NOT NULL DEFAULT 'AI_ACTIVE',
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OmnichannelConversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GoogleSheetsConfig" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "spreadsheetId" TEXT NOT NULL,
    "serviceAccountJson" TEXT NOT NULL,
    "sheetName" TEXT NOT NULL DEFAULT 'Sheet1',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoogleSheetsConfig_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "OmnichannelMessage"
  DROP COLUMN "orgId",
  DROP COLUMN "platform",
  DROP COLUMN "sender",
  ADD COLUMN "conversationId" TEXT NOT NULL,
  ADD COLUMN "senderType" TEXT NOT NULL;

CREATE INDEX "OmnichannelConversation_organizationId_idx" ON "OmnichannelConversation"("organizationId");
CREATE UNIQUE INDEX "OmnichannelConversation_organizationId_platform_contactId_key" ON "OmnichannelConversation"("organizationId", "platform", "contactId");
CREATE UNIQUE INDEX "GoogleSheetsConfig_organizationId_key" ON "GoogleSheetsConfig"("organizationId");
CREATE INDEX "OmnichannelMessage_conversationId_idx" ON "OmnichannelMessage"("conversationId");

ALTER TABLE "OmnichannelConversation" ADD CONSTRAINT "OmnichannelConversation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GoogleSheetsConfig" ADD CONSTRAINT "GoogleSheetsConfig_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OmnichannelMessage" ADD CONSTRAINT "OmnichannelMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "OmnichannelConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;