"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, PhoneCall, X, Building2, MessageSquare, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestVoiceAgentModal({ 
  onClose, 
  organizations 
}: { 
  onClose: () => void;
  organizations?: any[]; 
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Standby");
  
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [greeting, setGreeting] = useState("नमस्ते! म एआई भर्चुअल सहायक हुँ। म तपाईंलाई कसरी सहयोग गर्न सक्छु?");
  const [chatHistory, setChatHistory] = useState<{role: 'agent'|'user', text: string}[]>([]);
  const [knowledgeContext, setKnowledgeContext] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Use Next.js rewrites to bypass CORS and Mixed Content issues
  const STT_URL = "/api/proxy/stt"; 
  const LLM_URL = "/api/proxy/llm";
  const TTS_URL = "/api/proxy/tts";

  // Fetch Knowledge Base when Org changes
  useEffect(() => {
    if (selectedOrgId) {
      fetch(`/api/admin/organizations/${selectedOrgId}/knowledge-base`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.length > 0) {
            setKnowledgeContext("USE THIS CONTEXT TO ANSWER: " + data.data.map((kb: any) => kb.content).join("\n"));
          } else {
            setKnowledgeContext("");
          }
        })
        .catch(err => console.warn("KB Fetch Error:", err));
    } else {
      setKnowledgeContext("");
    }
  }, [selectedOrgId]);

  const playAudio = async (text: string) => {
    try {
      const ttsRes = await fetch(TTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const audioArrayBuffer = await ttsRes.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      return new Promise((resolve) => {
        source.onended = resolve;
      });
    } catch (e) {
      console.error("TTS Error:", e);
      setStatus("Error: TTS Failed (Is Piper running on 10200?)");
    }
  };

  const startSimulatedCall = async () => {
    setChatHistory([{ role: 'agent', text: greeting }]);
    setStatus("Agent is speaking greeting...");
    await playAudio(greeting);
    setStatus("Standby. You can speak now.");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await processTurn(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Listening...");
    } catch (err) {
      alert("Microphone Access Denied!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus("Processing audio...");
    }
  };

  const processTurn = async (audioBlob: Blob) => {
    try {
      // Step A: Speech to Text (Whisper)
      setStatus("1/3 Transcribing (Whisper)...");
      const formData = new FormData();
      formData.append("file", audioBlob, "speech.webm"); // Groq accepts webm from MediaRecorder

      const sttRes = await fetch(STT_URL, { method: "POST", body: formData });
      const userText = await sttRes.text();
      setChatHistory(prev => [...prev, { role: 'user', text: userText }]);

      // Step B: LLM Generation (Ollama)
      setStatus("2/3 Thinking (Ollama)...");
      // Build conversation history for LLM prompt
      const historyPrompt = chatHistory.map(msg => `${msg.role === 'agent' ? 'Assistant' : 'User'}: ${msg.text}`).join("\n");
      setStatus("2/3 Thinking (AI)...");
      const llmRes = await fetch(LLM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          history: chatHistory,
          knowledgeContext: knowledgeContext
        }),
      });
      const llmData = await llmRes.json();
      const botReply = llmData.response.trim();
      setChatHistory(prev => [...prev, { role: 'agent', text: botReply }]);

      // Step C: Text to Speech (Piper)
      setStatus("3/3 Speaking (Piper)...");
      await playAudio(botReply);
      
      setStatus("Standby. You can speak again.");
    } catch (error) {
      console.error(error);
      setStatus("Error: Pipeline Failed. Check localhost services.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 text-white rounded-xl w-full max-w-2xl border border-indigo-500/30 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 p-6 bg-slate-900/50">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                 <PhoneCall className="w-5 h-5 text-indigo-400" />
              </div>
              Voice Agent Call Simulator
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            
            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 1. Select Organization (RAG)
                </label>
                <select 
                  value={selectedOrgId}
                  onChange={(e) => {
                    const newOrgId = e.target.value;
                    setSelectedOrgId(newOrgId);
                    const org = organizations?.find(o => o.id === newOrgId);
                    if (org) {
                      if (org.name === 'Changunarayan Municipality') {
                        setGreeting('नमस्ते, म चाँगु नारायण नगरपालिकाको एआई बोल्दै छु। म तपाईंलाई के सहयोग गर्न सक्छु?');
                      } else {
                        setGreeting(`नमस्ते, म ${org.name}को एआई बोल्दै छु। म तपाईंलाई के सहयोग गर्न सक्छु?`);
                      }
                    } else {
                      setGreeting('नमस्ते! म एआई भर्चुअल सहायक हुँ। म तपाईंलाई कसरी सहयोग गर्न सक्छु?');
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">-- Generic Assistant --</option>
                  {organizations?.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> 2. Welcome Greeting
                </label>
                <input 
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="नमस्ते..."
                />
              </div>
            </div>

            {/* Start Call Button */}
            {chatHistory.length === 0 && (
              <div className="flex justify-center">
                <button 
                  onClick={startSimulatedCall}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)] flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" /> Simulate Call Connection
                </button>
              </div>
            )}

            {/* Chat History */}
            {chatHistory.length > 0 && (
              <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-4 overflow-y-auto min-h-[200px] flex flex-col gap-4">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'agent' ? 'bg-indigo-900/50 text-indigo-100 rounded-tl-none border border-indigo-500/20' : 'bg-emerald-900/50 text-emerald-100 rounded-tr-none border border-emerald-500/20'}`}>
                      <p className="text-[10px] uppercase font-bold opacity-50 mb-1">{msg.role === 'agent' ? 'AI Agent (TTS)' : 'You (STT)'}</p>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
               <div className="text-sm text-slate-400">Status:</div>
               <span className={`text-xs px-3 py-1 rounded-full border font-mono font-medium shadow-sm transition-colors ${status.includes('Error') ? 'bg-red-900/30 text-red-400 border-red-700/50' : 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50'}`}>
                 {status}
               </span>
            </div>

            {/* Mic Controls */}
            {chatHistory.length > 0 && (
              <div className="flex justify-center pb-2">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5"
                  >
                    <Mic className="w-5 h-5" /> Reply to Agent
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-bold transition-all animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                  >
                    <Square className="w-5 h-5 fill-current" /> Stop & Send
                  </button>
                )}
              </div>
            )}
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
