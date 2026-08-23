import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Insert into PendingRegistration
    const record = await prisma.pendingRegistration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        website: data.website,
        jobTitle: data.jobTitle,
        country: data.country,
        pbxProfile: data.pbxProfile,
      }
    });

    return NextResponse.json({ success: true, record });
  } catch (error: any) {
    console.error("Register Error:", error);
    // If it's a unique constraint error
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Email already registered.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
