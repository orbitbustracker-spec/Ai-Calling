'use server';

import { PrismaClient, Prisma } from '@prisma/client';
import { requireSuperAdmin } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function getGlobalSystemOverview() {
  await requireSuperAdmin();

  const totalActiveCalls = await prisma.call.count({
    where: { status: { in: ['INITIATED', 'RINGING', 'ANSWERED'] } }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const aiMinutesTodayObj = await prisma.call.aggregate({
    _sum: { billableMinutes: true },
    where: { createdAt: { gte: today } }
  });

  const totalRegisteredOrganizations = await prisma.organization.count();
  const totalAIAgentsConfigured = await prisma.aIAgent.count();
  const activeCampaigns = await prisma.campaign.count({
    where: { status: 'RUNNING' }
  });

  const totalWebhooks = await prisma.webhookEvent.count();
  const failedWebhooks = await prisma.webhookEvent.count({ where: { status: 'FAILED' } });
  const webhookFailureRate = totalWebhooks > 0 ? (failedWebhooks / totalWebhooks) * 100 : 0;

  return {
    totalActiveCalls,
    aiMinutesUsedToday: aiMinutesTodayObj._sum.billableMinutes || 0,
    totalRegisteredOrganizations,
    totalAIAgentsConfigured,
    activeCampaigns,
    webhookFailureRate: webhookFailureRate.toFixed(2)
  };
}

export async function getAllAgentsOverview(search?: string, language?: string, page: number = 1) {
  await requireSuperAdmin();
  const pageSize = 10;
  
  const whereClause: Prisma.AIAgentWhereInput = {};
  if (search) {
    whereClause.name = { contains: search, mode: 'insensitive' };
  }
  if (language) {
    whereClause.language = language;
  }

  const agents = await prisma.aIAgent.findMany({
    where: whereClause,
    include: { organization: { select: { name: true } } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.aIAgent.count({ where: whereClause });

  return { agents, total, page, totalPages: Math.ceil(total / pageSize) };
}

export async function getGlobalCallLogs(orgId?: string, direction?: string, status?: string, dateRange?: {start?: string, end?: string}, page: number = 1) {
  await requireSuperAdmin();
  const pageSize = 20;

  const whereClause: Prisma.CallWhereInput = {};
  if (orgId) whereClause.organizationId = orgId;
  if (direction) whereClause.direction = direction;
  if (status) whereClause.status = status as any;
  if (dateRange && dateRange.start) {
    whereClause.createdAt = { gte: new Date(dateRange.start) };
    if (dateRange.end) {
      whereClause.createdAt = {
        ...whereClause.createdAt,
        lte: new Date(dateRange.end)
      } as Prisma.DateTimeFilter;
    }
  }

  const calls = await prisma.call.findMany({
    where: whereClause,
    include: { organization: { select: { name: true } } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.call.count({ where: whereClause });

  return { calls, total, page, totalPages: Math.ceil(total / pageSize) };
}

export async function getCallCenterTree() {
  await requireSuperAdmin();

  const ivrMenus = await prisma.iVRMenu.findMany({
    include: { organization: { select: { name: true } } }
  });

  const callQueues = await prisma.callQueue.findMany({
    include: { organization: { select: { name: true } } }
  });

  // Human agent status could be inferred from User model if role = AGENT
  const humanAgents = await prisma.user.findMany({
    where: { role: 'AGENT' },
    select: { id: true, name: true, email: true, organization: { select: { name: true } } }
  });

  return { ivrMenus, callQueues, humanAgents };
}

export async function getCampaignsMonitor() {
  await requireSuperAdmin();

  const campaigns = await prisma.campaign.findMany({
    include: { organization: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return { campaigns };
}

export async function getSystemHealthAndWebhooks() {
  await requireSuperAdmin();

  const recentWebhooks = await prisma.webhookEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { organization: { select: { name: true } } }
  });

  const recentSMS = await prisma.sMSLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { organization: { select: { name: true } } }
  });
  
  return { webhooks: recentWebhooks, smsLogs: recentSMS };
}

export async function retriggerWebhook(webhookId: string) {
  await requireSuperAdmin();
  const webhook = await prisma.webhookEvent.findUnique({ where: { id: webhookId } });
  if (!webhook) throw new Error("Webhook not found");

  return await prisma.webhookEvent.update({
    where: { id: webhookId },
    data: { retryCount: { increment: 1 }, status: 'PENDING' }
  });
}
