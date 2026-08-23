
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, history, knowledgeContext } = await req.json();
    
    // Construct System Prompt with Knowledge Base
    const systemPrompt = `You are a helpful AI assistant. You MUST reply in the Nepali language (Devanagari script) only. Keep your answers short and conversational (under 20 words if possible).
    
${knowledgeContext ? knowledgeContext : ''}`;

    // Construct Messages Array
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        messages.push({
          role: msg.role === 'agent' ? 'assistant' : 'user',
          content: msg.text
        });
      });
    }

    messages.push({ role: "user", content: prompt });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: messages,
        temperature: 0.5,
      }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate response');
    }

    // Return the format that our frontend expects (similar to Ollama's format)
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
