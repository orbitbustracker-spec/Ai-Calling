import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Resolves the assigned AI pipeline for a given organization (tenant).
 * If the tenant has assigned nodes, those are used.
 * Otherwise, it falls back to a global default or throws an error.
 */
export async function resolveVoicePipeline(organizationId: string) {
  // Fetch AI Nodes specifically assigned to this tenant
  const orgNodes = await prisma.organizationAiNode.findMany({
    where: { organizationId }
  });

  const llmNode = orgNodes.find(n => n.nodeType === 'LLM');
  const sttNode = orgNodes.find(n => n.nodeType === 'STT');
  const ttsNode = orgNodes.find(n => n.nodeType === 'TTS');

  if (!llmNode || !sttNode || !ttsNode) {
    throw new Error(`Incomplete AI Pipeline configured for Organization: ${organizationId}. Please contact Super Admin.`);
  }

  // Return the resolved pipeline connection details.
  // The actual voice engine (FreeSWITCH/Asterisk via WebRTC) will use these credentials.
  return {
    llm: {
      provider: llmNode.nodeName,
      baseUrl: llmNode.baseUrl,
      modelId: llmNode.modelId,
    },
    stt: {
      provider: sttNode.nodeName,
      baseUrl: sttNode.baseUrl,
      modelId: sttNode.modelId,
    },
    tts: {
      provider: ttsNode.nodeName,
      baseUrl: ttsNode.baseUrl,
      modelId: ttsNode.modelId,
    }
  };
}
