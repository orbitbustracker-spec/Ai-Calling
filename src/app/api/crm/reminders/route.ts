import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/authorization';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'REMINDER';

    const reminders = await prisma.crmReminder.findMany({
      where: {
        organizationId: user.organizationId,
        type: type
      },
      orderBy: { dueDate: 'asc' }
    });

    return NextResponse.json({ reminders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, title, description, dueDate, status } = await req.json();

    if (!title || !dueDate || !type) {
      return NextResponse.json({ error: 'Title, type, and dueDate are required' }, { status: 400 });
    }

    const reminder = await prisma.crmReminder.create({
      data: {
        organizationId: user.organizationId,
        type,
        title,
        description,
        dueDate: new Date(dueDate),
        status: status || 'PENDING'
      }
    });

    return NextResponse.json({ reminder });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    const reminder = await prisma.crmReminder.updateMany({
      where: {
        id,
        organizationId: user.organizationId
      },
      data: {
        status
      }
    });

    return NextResponse.json({ success: true, count: reminder.count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
