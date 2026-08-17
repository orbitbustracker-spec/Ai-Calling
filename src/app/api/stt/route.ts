import { NextRequest, NextResponse } from 'next/server';

/**
 * Speech-to-Text (STT) API Route
 * Converts audio to text using configured STT provider
 * 
 * POST /api/stt
 * Body: FormData with audio file
 * Response: { text: string, duration: number }
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as File;

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // TODO: Integrate with STT provider (Google Cloud, AssemblyAI, Deepgram, etc.)
    const text = 'Transcribed text will appear here';

    return NextResponse.json({
      text,
      duration: 0,
      provider: 'pending',
    });
  } catch (error) {
    console.error('STT Error:', error);
    return NextResponse.json(
      { error: 'Failed to process audio' },
      { status: 500 }
    );
  }
}
