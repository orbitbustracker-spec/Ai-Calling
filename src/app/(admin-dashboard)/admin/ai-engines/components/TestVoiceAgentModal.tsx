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
  const [greeting, setGreeting] = useState("नमस्ते, म यहाँको एआई सहायक हुँ। हजुरलाई कसरी सहयोग गर्न सक्छु?");
  const [chatHistory, setChatHistory] = useState<{role: 'agent'|'user', text: string}[]>([]);
  const [knowledgeContext, setKnowledgeContext] = useState("");

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ne-NP";
      window.speechSynthesis.speak(utterance);
    }
  };

  const startSimulatedCall = async () => {
    setStatus("Connecting to AI Engine Pipeline...");
    try {
      // Simulate pipeline warmup delay
      await new Promise(r => setTimeout(r, 1500));
      setStatus("Connected (Pipeline Active)");
      setChatHistory([{ role: 'agent', text: greeting }]);
      speakText(greeting);
    } catch (error) {
      console.error(error);
      setStatus("Error: Pipeline Failed. Check localhost services.");
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setStatus("Listening (STT Active)...");
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatus("Processing (LLM -> TTS)...");
    
    // Simulate STT and LLM response
    const responseText = "??? ????? ? ?? ????????, ????? ???? ????? ????? ????????? ????? ????? ????? ??";
    speakText(responseText);
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { role: 'user', text: "वडा नम्बर ४ को कार्यालय कहाँ छ?" },
        { role: 'agent', text: "वडा नम्बर ४ को कार्यालय, मुख्य बजार नजिकै रहेको सामुदायिक भवनको पहिलो तलामा छ।" }
      ]);
      setStatus("Connected (Pipeline Active)");
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 dark:bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl w-full max-w-2xl border border-gray-200 dark:border-indigo-500/30 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 p-6 bg-gray-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                 <PhoneCall className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              Voice Agent Call Simulator
            </h2>
            <button onClick={onClose} className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            
            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-slate-950/50 p-4 rounded-lg border border-gray-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase flex items-center gap-2">
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
                        setGreeting('नमस्ते, म चाँगुनारायण नगरपालिकाको एआई सहायक हुँ। हजुरलाई कसरी सहयोग गर्न सक्छु?');
                      } else {
                        setGreeting(`नमस्ते, म ${org.name} को एआई सहायक हुँ। हजुरलाई कसरी सहयोग गर्न सक्छु?`);
                      }
                    } else {
                      setGreeting('नमस्ते, म यहाँको एआई सहायक हुँ। हजुरलाई कसरी सहयोग गर्न सक्छु?');
                    }
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">-- Generic Assistant --</option>
                  {organizations?.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 dark:bg-slate-950/50 p-4 rounded-lg border border-gray-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> 2. Welcome Greeting
                </label>
                <input 
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="नमस्ते..."
                />
              </div>
            </div>

            {/* Start Call Button */}
            {chatHistory.length === 0 && (
              <div className="flex justify-center">
                <button 
                  onClick={startSimulatedCall}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" /> Simulate Call Connection
                </button>
              </div>
            )}

            {/* Chat History */}
            {chatHistory.length > 0 && (
              <div className="flex-1 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-800 p-4 overflow-y-auto min-h-[200px] flex flex-col gap-4">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'agent' 
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100 rounded-tl-none border border-indigo-200 dark:border-indigo-500/20' 
                        : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 rounded-tr-none border border-emerald-200 dark:border-emerald-500/20'
                    }`}>
                      <p className="text-[10px] uppercase font-bold opacity-50 mb-1">{msg.role === 'agent' ? 'AI Agent (TTS)' : 'You (STT)'}</p>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 dark:border-slate-800 pt-4">
               <div className="text-sm text-gray-500 dark:text-slate-400">Status:</div>
               <span className={`text-xs px-3 py-1 rounded-full border font-mono font-medium shadow-sm transition-colors ${status.includes('Error') ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700/50' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/50'}`}>
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
