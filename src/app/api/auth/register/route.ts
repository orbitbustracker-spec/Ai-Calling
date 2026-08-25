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

    // Send Confirmation Email
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Nexus Enterprise" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: 'Registration Request Received - Nexus Enterprise',
        html: `<p>Hello <strong>${data.firstName}</strong>,</p>
               <p>Thank you for requesting access to the Nexus Enterprise platform.</p>
               <p>Our team will review your application for <strong>${data.companyName}</strong>. You will receive another email once your account is approved and activated.</p>
               <p>Thank you,<br/>Nexus Team</p>`
      };
      
      await transporter.sendMail(mailOptions).catch(err => {
        console.error("Failed to send registration email", err);
      });
    } else {
      console.warn("SMTP environment variables not configured. Skipping confirmation email.");
    }

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
