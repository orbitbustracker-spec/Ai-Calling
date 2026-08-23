import { NextRequest, NextResponse } from 'next/server';
import { generateOllamaStream } from '@/lib/ai/ollama';

export async function POST(request: NextRequest) {
  try {
    const { text, agentId } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    if (!agentId) {
      return NextResponse.json({ error: 'No agent ID provided' }, { status: 400 });
    }

    // Connect to Local Ollama Instance
    const responseText = await generateOllamaStream({
      model: 'llama3:8b',
      stream: false,
      messages: [
        { role: 'system', content: 'You are a helpful, professional AI Receptionist for the RAG knowledge base. Give short, concise answers.' },
        { role: 'user', content: text }
      ]
    });

    return NextResponse.json({
      response: responseText,
      tokens: { prompt: 0, completion: 0 },
      provider: 'ollama (local)',
    });
  } catch (error) {
    console.error('LLM Error:', error);
    return NextResponse.json({ error: 'Failed to process LLM request with Ollama' }, { status: 500 });
  }
}
