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
    <div className="h-[750px] bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl flex overflow-hidden shadow-sm">
      
      {/* Sidebar: Chat List */}
      <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-slate-900/80">
        <div className="p-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Unified Inbox</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {CHATS.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => { setActiveChat(chat); setAiEnabled(chat.aiHandling); }}
              className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-gray-900 dark:text-slate-200">{chat.name}</div>
                  {chat.platform === 'whatsapp' && <MessageCircle className="w-3 h-3 text-green-500" />}
                  {chat.platform === 'messenger' && <MessageCircle className="w-3 h-3 text-blue-500" />}
                  {chat.platform === 'instagram' && <Camera className="w-3 h-3 text-pink-500" />}
                  {chat.platform === 'tiktok' && <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full" />}
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-500">{chat.time}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-slate-400 truncate pr-4">{chat.lastMsg}</div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Canvas */}
      <div className="flex-1 flex flex-col relative bg-white dark:bg-slate-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-slate-400 font-bold">
              {activeChat.name[0]}
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {activeChat.name}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-transparent">
                  {activeChat.platform}
                </span>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span> Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setAiEnabled(true)}
                className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${aiEnabled ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'}`}
              >
                <Bot className="w-4 h-4" /> AI Auto-Pilot
              </button>
              <button 
                onClick={() => setAiEnabled(false)}
                className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${!aiEnabled ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'}`}
              >
                <User className="w-4 h-4" /> Human Takeover
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-white"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-gray-100 dark:bg-slate-900 rounded-full text-xs text-gray-500 dark:text-slate-500 font-medium">Today</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-full flex shrink-0 items-center justify-center text-gray-600 dark:text-slate-400 text-xs font-bold">
              {activeChat.name[0]}
            </div>
            <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 text-gray-800 dark:text-slate-200 max-w-md shadow-sm border border-gray-200 dark:border-white/5">
              Hi, I saw your ad for the Smart Voice AI agent. How much is it?
            </div>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex shrink-0 items-center justify-center text-white text-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-indigo-600 rounded-2xl rounded-tr-sm p-4 text-white max-w-md shadow-md">
              Hello {activeChat.name}! 🤖 Our Smart Voice AI agent starts at NPR 5,000/month. Would you like me to send you the full pricing catalog?
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-full flex shrink-0 items-center justify-center text-gray-600 dark:text-slate-400 text-xs font-bold">
              {activeChat.name[0]}
            </div>
            <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 text-gray-800 dark:text-slate-200 max-w-md shadow-sm border border-gray-200 dark:border-white/5">
              {activeChat.lastMsg}
            </div>
          </div>

          {!aiEnabled && (
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-full text-xs text-orange-600 dark:text-orange-400 font-medium flex items-center gap-2">
                <User className="w-3 h-3" /> Human Agent took over
              </span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200 dark:border-white/10 z-10">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl flex items-center px-4 py-2">
              <input 
                type="text" 
                placeholder={aiEnabled ? "AI is handling this conversation..." : "Type a message..."} 
                disabled={aiEnabled}
                className="w-full bg-transparent text-gray-900 dark:text-white outline-none disabled:opacity-50"
              />
            </div>
            <button 
              disabled={aiEnabled}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-200 disabled:dark:bg-slate-800 disabled:text-gray-400 disabled:dark:text-slate-500 text-white rounded-xl transition-all shadow-md disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
