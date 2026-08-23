import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Instead of global TelephonyProvider, insert into OrganizationSipTrunk
    const trunk = await prisma.organizationSipTrunk.create({
      data: {
        organizationId: data.organizationId,
        providerLabel: data.providerLabel,
        host: data.host,
        port: parseInt(data.port),
        username: data.username,
        // In real system, password should be encrypted
        encryptedPassword: data.password,
        didsJson: JSON.stringify(data.didNumbers.split(',').map((n: string) => n.trim()))
      }
    });

    return NextResponse.json({ success: true, trunk });
  } catch (error: any) {
    console.error('Error saving SIP Trunk:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) throw new Error('ID missing');
    
    await prisma.organizationSipTrunk.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
