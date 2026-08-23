'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Voicemail, Play, Pause, Trash2, Archive, User, Clock, PhoneIncoming, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/Button';

export default function VoicemailPage() {
  const [selectedVm, setSelectedVm] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const voicemails = [
    { id: '1', from: '9841234567', name: 'Unknown Caller', duration: '0:45', time: '10:15 AM, Today', transcript: "Hi, I tried calling you earlier. I need help resetting my password. Please call me back on this number. Thank you.", read: false },
    { id: '2', from: '9801122334', name: 'Aashish', duration: '1:12', time: 'Yesterday', transcript: "Hello! This is regarding the invoice you sent last week. There seems to be a mismatch in the total amount. Give me a call when you're free.", read: true },
  ];

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pb-10 text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
            <Voicemail className="w-8 h-8 text-indigo-400" /> Visual Voicemail
          </h1>
          <p className="text-slate-400">Listen to messages and read AI-generated transcripts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Inbox List */}
        <div className="lg:col-span-1 bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 bg-slate-900/80">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Inbox</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-white/5">
              {voicemails.map(vm => (
                <div 
                  key={vm.id} 
                  onClick={() => setSelectedVm(vm)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-800/50 ${selectedVm?.id === vm.id ? 'bg-indigo-500/10 border-l-2 border-indigo-500' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className={`font-bold ${vm.read ? 'text-slate-300' : 'text-white'}`}>{vm.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold">{vm.time}</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="text-slate-500 flex items-center gap-1"><PhoneIncoming className="w-3 h-3"/> {vm.from}</div>
                    <div className="bg-slate-800 text-slate-400 px-2 rounded-full font-mono">{vm.duration}</div>
                  </div>
                  {!vm.read && (
                    <div className="mt-2 text-xs font-bold text-indigo-400">New Message</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {selectedVm ? (
            <div className="flex flex-col h-full">
              {/* Top Bar */}
              <div className="p-6 border-b border-white/10 bg-slate-900/80 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedVm.name}</h2>
                    <p className="text-sm text-slate-400">{selectedVm.from}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors text-slate-300"><Archive className="w-4 h-4" /></button>
                  <button className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Player */}
              <div className="p-8 border-b border-white/5 bg-slate-950/30">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex-shrink-0"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 font-mono">
                      <span>0:00</span>
                      <span>{selectedVm.duration}</span>
                    </div>
                    {/* Fake Waveform */}
                    <div className="h-10 w-full flex items-center gap-1 opacity-70">
                      {[...Array(40)].map((_, i) => (
                        <div key={i} className={`flex-1 rounded-full bg-indigo-500/50 ${isPlaying ? 'animate-pulse' : ''}`} style={{ height: `${Math.max(10, Math.random() * 100)}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="p-8 flex-1">
                <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <MessageSquareText className="w-4 h-4" /> AI Transcript
                </h3>
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-6 text-slate-300 leading-relaxed text-lg font-medium">
                  "{selectedVm.transcript}"
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
              <Voicemail className="w-16 h-16 mb-4 opacity-20" />
              <h2 className="text-xl font-bold text-slate-400 mb-2">Select a Voicemail</h2>
              <p className="text-sm">Click on a message from the inbox to listen and view the AI transcript.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
