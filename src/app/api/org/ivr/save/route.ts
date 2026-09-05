import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { ivrId, welcomeAudioUrl, keypressRoutes } = data;

    if (!ivrId) {
      return NextResponse.json({ error: 'Missing ivrId' }, { status: 400 });
    }

    const ivr = await prisma.iVRMenu.update({
      where: { id: ivrId },
      data: {
        welcomeAudioUrl,
        keypressRoutes
      }
    });

    return NextResponse.json({ success: true, ivr });
  } catch (error: any) {
    console.error("IVR Save Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
