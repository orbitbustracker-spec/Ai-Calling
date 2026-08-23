import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const pending = await prisma.pendingRegistration.findUnique({ where: { id } });
    if (!pending) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Mark as approved
    await prisma.pendingRegistration.update({
      where: { id },
      data: { status: 'APPROVED' }
    });

    // Create the Organization
    const org = await prisma.organization.create({
      data: {
        name: pending.companyName,
        isActive: true
      }
    });

    // Send Approval Email using NodeMailer (Requires SMTP env vars in Vercel)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Nexus Admin" <${process.env.SMTP_USER}>`,
        to: pending.email,
        subject: 'Your Nexus Account has been Approved!',
        text: `Hello ${pending.firstName},\n\nYour request for the Nexus Enterprise platform has been approved!\n\nYou can now log in to the activate your account here: https://${req.headers.get('host')}/activate/${pending.id}\n\nThank you,\nNexus Team`,
        html: `<p>Hello <strong>${pending.firstName}</strong>,</p>
               <p>Your request for the Nexus Enterprise platform has been <strong>approved</strong>!</p>
               <p>You can now log in to the <a href="https://${req.headers.get('host')}/activate/${pending.id}">activate your account</a>.</p>
               <p>Thank you,<br/>Nexus Team</p>`
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP environment variables not configured. Skipping email sending.");
    }

    return NextResponse.json({ success: true, orgId: org.id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
