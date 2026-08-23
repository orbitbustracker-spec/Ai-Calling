'use client';

import React, { useState } from 'react';
import { MessageCircle, Search, MoreVertical, Send, Image as ImageIcon, Bot, User, Camera } from 'lucide-react';

const CHATS = [
  { id: 1, name: 'Sneh Raj', platform: 'whatsapp', lastMsg: 'I want to buy the black jacket.', time: '10:42 AM', unread: 2, aiHandling: true },
  { id: 2, name: 'Rajan Koirala', platform: 'messenger', lastMsg: 'Is delivery available in Pokhara?', time: '09:15 AM', unread: 0, aiHandling: false },
  { id: 3, name: 'Istuti', platform: 'instagram', lastMsg: 'Payment sent via eSewa.', time: 'Yesterday', unread: 1, aiHandling: true },
  { id: 4, name: 'Bikash', platform: 'tiktok', lastMsg: 'Can I get a discount?', time: 'Yesterday', unread: 0, aiHandling: true },
];

export default function UnifiedInboxPage() {
  const [activeChat, setActiveChat] = useState(CHATS[0]);
  const [aiEnabled, setAiEnabled] = useState(activeChat.aiHandling);

  return (
    <div className="h-[750px] bg-slate-900/50 border border-white/10 rounded-2xl flex overflow-hidden">
      
      {/* Sidebar: Chat List */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-slate-900/80">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Unified Inbox</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {CHATS.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => { setActiveChat(chat); setAiEnabled(chat.aiHandling); }}
              className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-indigo-500/10' : 'hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-slate-200">{chat.name}</div>
                  {chat.platform === 'whatsapp' && <MessageCircle className="w-3 h-3 text-green-500" />}
                  {chat.platform === 'messenger' && <MessageCircle className="w-3 h-3 text-blue-500" />}
                  {chat.platform === 'instagram' && <Camera className="w-3 h-3 text-pink-500" />}
                  {chat.platform === 'tiktok' && <div className="w-3 h-3 bg-black rounded-full" />}
                </div>
                <div className="text-xs text-slate-500">{chat.time}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-400 truncate pr-4">{chat.lastMsg}</div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Canvas */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-bold">
              {activeChat.name[0]}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                {activeChat.name}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400">
                  {activeChat.platform}
                </span>
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setAiEnabled(true)}
                className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${aiEnabled ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Bot className="w-4 h-4" /> AI Auto-Pilot
              </button>
              <button 
                onClick={() => setAiEnabled(false)}
                className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${!aiEnabled ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <User className="w-4 h-4" /> Human Takeover
              </button>
            </div>
            <button className="text-slate-400 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-500">Today</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-full flex shrink-0 items-center justify-center text-slate-400 text-xs font-bold">
              {activeChat.name[0]}
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-4 text-slate-200 max-w-md shadow-lg border border-white/5">
              Hi, I saw your ad for the Smart Voice AI agent. How much is it?
            </div>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex shrink-0 items-center justify-center text-white text-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-indigo-600 rounded-2xl rounded-tr-sm p-4 text-white max-w-md shadow-lg shadow-indigo-500/20">
              Hello {activeChat.name}! 🤖 Our Smart Voice AI agent starts at NPR 5,000/month. Would you like me to send you the full pricing catalog?
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-full flex shrink-0 items-center justify-center text-slate-400 text-xs font-bold">
              {activeChat.name[0]}
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-4 text-slate-200 max-w-md shadow-lg border border-white/5">
              {activeChat.lastMsg}
            </div>
          </div>

          {!aiEnabled && (
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400 flex items-center gap-2">
                <User className="w-3 h-3" /> Human Agent took over
              </span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-white/10 z-10">
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-slate-950 border border-white/10 rounded-xl flex items-center px-4 py-2">
              <input 
                type="text" 
                placeholder={aiEnabled ? "AI is handling this conversation..." : "Type a message..."} 
                disabled={aiEnabled}
                className="w-full bg-transparent text-white outline-none disabled:opacity-50"
              />
            </div>
            <button 
              disabled={aiEnabled}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
