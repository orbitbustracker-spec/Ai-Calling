const dgram = require('dgram');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const alawmulaw = require('alawmulaw'); // For G.711 PCMA/PCMU to PCM conversion

const prisma = new PrismaClient();

// ---------------------------------------------------------
// 1. SIP & RTP Gateway Settings
// ---------------------------------------------------------
const SIP_PORT = 5060;
const RTP_START_PORT = 10000;
const AI_WS_URL = process.env.AI_WS_URL || 'ws://localhost:9000'; // Whisper/Piper WebSocket

const sipServer = dgram.createSocket('udp4');
const activeCalls = new Map();

// ---------------------------------------------------------
// 2. Handling Incoming SIP Messages (PABX -> Gateway)
// ---------------------------------------------------------
sipServer.on('message', async (msg, rinfo) => {
  const message = msg.toString();
  
  // Basic SIP INVITE Parsing
  if (message.startsWith('INVITE')) {
    console.log(`\n[SIP] Received INVITE from ${rinfo.address}:${rinfo.port}`);
    
    // Extract Caller ID and Target Extension (DNIS)
    const fromMatch = message.match(/From:\s*"?([^"<]+)"?\s*<sip:([^@>]+)[^>]*>/i) || message.match(/From:\s*<sip:([^@>]+)[^>]*>/i);
    const toMatch = message.match(/To:\s*<sip:([^@>]+)[^>]*>/i);
    const callIdMatch = message.match(/Call-ID:\s*([^ \r\n]+)/i);
    
    const callerId = fromMatch ? (fromMatch[2] || fromMatch[1]) : 'Unknown';
    const extension = toMatch ? toMatch[1] : 'Unknown';
    const callId = callIdMatch ? callIdMatch[1] : `call-${Date.now()}`;

    console.log(`[SIP] Caller ID: ${callerId} | Extension: ${extension}`);

    // Create Call Record in Database for Transcript & Summary
    const dbCall = await prisma.call.create({
      data: {
        organizationId: 'default-org-id', // You can fetch this based on extension
        fromNumber: callerId,
        toNumber: extension,
        status: 'RINGING',
        providerCallId: callId
      }
    });

    // ---------------------------------------------------------
    // 3. Audio Streaming (RTP <-> AI WebSocket)
    // ---------------------------------------------------------
    // Allocate an RTP port for this call
    const rtpPort = RTP_START_PORT + activeCalls.size * 2; 
    const rtpSocket = dgram.createSocket('udp4');
    
    const aiSocket = new WebSocket(AI_WS_URL);

    aiSocket.on('open', () => {
      console.log(`[WebSocket] Connected to AI Engine for Call ${callId}`);
      // Send initial metadata to AI (so AI knows caller ID)
      aiSocket.send(JSON.stringify({ event: 'start', callerId, extension, callRecordId: dbCall.id }));
    });

    // Receive G.711 RTP from PABX -> Convert to PCM -> Send to AI
    rtpSocket.on('message', (rtpPacket) => {
      // Basic RTP parsing: skip 12 byte header
      const payload = rtpPacket.slice(12);
      
      // Convert G.711 (PCMU) to PCM 16-bit 16kHz for Whisper
      // (Using alawmulaw package)
      const pcmData = alawmulaw.mulaw.decode(payload);
      
      if (aiSocket.readyState === WebSocket.OPEN) {
        aiSocket.send(pcmData); // Stream raw audio to AI
      }
    });

    // Receive PCM from AI (Piper TTS) -> Convert to G.711 -> Send to PABX
    aiSocket.on('message', (aiData) => {
      if (typeof aiData === 'string') {
        const msg = JSON.parse(aiData);
        
        // ---------------------------------------------------------
        // 4. Call Transfer Logic (AI initiates transfer)
        // ---------------------------------------------------------
        if (msg.event === 'transfer') {
          console.log(`[SIP] AI requested transfer to extension: ${msg.targetExtension}`);
          // Logic to send SIP REFER back to PABX
          sendSipRefer(rinfo.address, rinfo.port, callId, msg.targetExtension);
        }

        // ---------------------------------------------------------
        // 5. Final Transcript & Summary Logic
        // ---------------------------------------------------------
        if (msg.event === 'end') {
          // AI sends the final conversation text and summary when call ends
          prisma.call.update({
            where: { id: dbCall.id },
            data: {
              status: 'COMPLETED',
              transcriptText: msg.transcript,
              summaryText: msg.summary
            }
          }).then(() => console.log(`[DB] Saved transcript for call ${callId}`));
        }
      } else {
        // AI sent audio (TTS). Convert PCM -> G.711 -> RTP Packet -> Send to PABX
        const g711Data = alawmulaw.mulaw.encode(aiData);
        // build RTP packet and send via rtpSocket.send(...)
      }
    });

    rtpSocket.bind(rtpPort);

    // Send SIP 200 OK back to PABX with SDP containing the RTP port
    // (SDP creation omitted for brevity)
    const sip200Ok = `SIP/2.0 200 OK\r\n... (SDP with port ${rtpPort})`;
    sipServer.send(sip200Ok, rinfo.port, rinfo.address);

    activeCalls.set(callId, { rtpSocket, aiSocket });
  }

  // Handle SIP BYE (Hangup)
  if (message.startsWith('BYE')) {
    const callIdMatch = message.match(/Call-ID:\s*([^ \r\n]+)/i);
    const callId = callIdMatch ? callIdMatch[1] : null;
    
    if (callId && activeCalls.has(callId)) {
      console.log(`[SIP] Call Ended: ${callId}`);
      const { rtpSocket, aiSocket } = activeCalls.get(callId);
      rtpSocket.close();
      aiSocket.close();
      activeCalls.delete(callId);
    }
  }
});

sipServer.on('listening', () => {
  const address = sipServer.address();
  console.log(`[SIP] Gateway listening for PABX on UDP ${address.address}:${address.port}`);
});

sipServer.bind(SIP_PORT);

// Dummy function to demonstrate transfer logic
function sendSipRefer(pabxIp, pabxPort, callId, targetExtension) {
  const referMsg = `REFER sip:${targetExtension}@${pabxIp} SIP/2.0\r\nRefer-To: sip:${targetExtension}@${pabxIp}\r\nCall-ID: ${callId}\r\n\r\n`;
  sipServer.send(referMsg, pabxPort, pabxIp, (err) => {
    if (err) console.error('Error sending REFER:', err);
    else console.log(`[SIP] Sent REFER to PABX for extension ${targetExtension}`);
  });
}
