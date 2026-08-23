/**
 * Ollama AI Streaming Helper
 * Connects the Next.js backend to a locally running Ollama instance for free, unlimited AI generation.
 */

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaChatParams {
  model?: string;
  messages: OllamaMessage[];
  stream?: boolean;
}

export async function generateOllamaStream(
  { model = 'llama3:8b', messages, stream = true }: OllamaChatParams,
  endpoint: string = 'http://localhost:11434'
) {
  try {
    const response = await fetch(`${endpoint}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    if (!stream) {
      const data = await response.json();
      return data.message.content;
    }

    // Return the readable stream directly for Next.js to stream to the client
    return response.body;

  } catch (error) {
    console.error('Error streaming from Ollama:', error);
    throw error;
  }
}
