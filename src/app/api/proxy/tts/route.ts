
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    // ElevenLabs Voice ID (Rachel - works well with multilingual v2)
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; 
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY || ''
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2", // Important for non-English languages
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.message || 'Failed to synthesize speech using ElevenLabs');
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
