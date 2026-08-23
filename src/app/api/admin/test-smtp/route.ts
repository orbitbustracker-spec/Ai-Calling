import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    const success = await transporter.verify();
    return NextResponse.json({ success, host: process.env.SMTP_HOST, user: process.env.SMTP_USER });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, code: err.code, host: process.env.SMTP_HOST });
  }
}
