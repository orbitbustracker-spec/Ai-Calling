import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Here we would typically save to database and send an email
    // e.g. await sendEmail({ to: data.email, subject: "Welcome to Nexus Voice Trial" });
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Free trial form submitted:", data);
    console.log(`Simulated sending confirmation email to: ${data.email}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you, your form has been submitted. A confirmation email has been sent to you.' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
