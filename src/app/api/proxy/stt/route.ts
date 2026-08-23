
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Add Groq specific parameters
    formData.append('model', 'whisper-large-v3');
    formData.append('language', 'ne'); // Force Nepali

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to transcribe audio');
    }

    return new NextResponse(data.text);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
