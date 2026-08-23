import { requireSuperAdmin, withAuth } from '@/lib/authorization';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Encryption helper
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text: string) {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export async function GET() {
  await requireSuperAdmin();
  const engines = await prisma.aIEngineConfig.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  // Mask API keys before sending to client
  const maskedEngines = engines.map((engine: any) => ({
    ...engine,
    apiKey: engine.apiKey ? '********' : ''
  }));
  
  return NextResponse.json(maskedEngines);
}

async function createEngine(req: Request) {
  await requireSuperAdmin();
  const data = await req.json();
  
  if (data.isDefault) {
    // If setting as default, unset others in the same category
    await prisma.aIEngineConfig.updateMany({
      where: { category: data.category },
      data: { isDefault: false }
    });
  }

  const engine = await prisma.aIEngineConfig.create({
    data: {
      ...data,
      apiKey: encrypt(data.apiKey || ''),
    }
  });
  return NextResponse.json(engine);
}

export const POST = withAuth(createEngine);
