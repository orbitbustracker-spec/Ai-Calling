'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, MoreVertical, Send, Image as ImageIcon, Bot, User, Camera } from 'lucide-react';

export default function UnifiedInboxPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchInbox = async () => {
    try {
      const res = await fetch('/api/org/omnichannel/inbox');
      const data = await res.json();
      if (data.conversations) {
        setConversations(data.conversations);
        if (data.conversations.length > 0 && !activeChat) {
          setActiveChat(data.conversations[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
    // Poll every 5 seconds for real-time demo
    const interval = setInterval(fetchInbox, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!replyText.trim() || !activeChat) return;

    const optimisticMsg = {
      id: Date.now().toString(),
      senderType: 'HUMAN_AGENT',
      content: replyText,
      createdAt: new Date().toISOString()
    };
    
    // Optimistic update
    const updatedChat = { ...activeChat, messages: [optimisticMsg, ...activeChat.messages] };
    setActiveChat(updatedChat);
    setConversations(prev => prev.map(c => c.id === activeChat.id ? updatedChat : c));
    setReplyText('');

    try {
      await fetch('/api/org/omnichannel/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeChat.id,
          text: optimisticMsg.content,
          takeover: true // Sending manually triggers takeover
        })
      });
      fetchInbox();
    } catch (e) {
      console.error(e);
    }
  };

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
          {loading && conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">Loading chats...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">No conversations found. Add your webhook to Meta!</div>
          ) : (
            conversations.map(chat => {
              const lastMsg = chat.messages[0]?.content || 'No messages';
              return (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer transition-colors ${activeChat?.id === chat.id ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-gray-900 dark:text-slate-200 truncate w-32">{chat.contactName || chat.contactId}</div>
                      {chat.platform === 'WHATSAPP' && <MessageCircle className="w-3 h-3 text-green-500" />}
                      {chat.platform === 'MESSENGER' && <MessageCircle className="w-3 h-3 text-blue-500" />}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-500">
                      {new Date(chat.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-slate-400 truncate pr-2 w-48">{lastMsg}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
          <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold">
                {(activeChat.contactName || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {activeChat.contactName || activeChat.contactId}
                  <span className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-600 dark:text-slate-400 uppercase tracking-wider font-bold">
                    {activeChat.platform}
                  </span>
                </div>
                <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={async () => {
                  await fetch('/api/org/omnichannel/reply', { method: 'POST', body: JSON.stringify({ conversationId: activeChat.id, takeover: false }) });
                  fetchInbox();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${activeChat.aiStatus === 'AI_ACTIVE' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'}`}
              >
                <Bot className="w-4 h-4" /> AI Auto-Pilot
              </button>
              <button 
                onClick={async () => {
                  await fetch('/api/org/omnichannel/reply', { method: 'POST', body: JSON.stringify({ conversationId: activeChat.id, takeover: true }) });
                  fetchInbox();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${activeChat.aiStatus === 'HUMAN_TAKEOVER' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'}`}
              >
                <User className="w-4 h-4" /> Human Takeover
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4">
            {activeChat.messages.map((msg: any) => {
              const isMe = msg.senderType !== 'CUSTOMER';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[70%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                    {msg.senderType === 'AI' ? <Bot className="w-4 h-4 text-indigo-500" /> : 
                     msg.senderType === 'HUMAN_AGENT' ? <User className="w-4 h-4 text-emerald-500" /> :
                     <span className="text-xs font-bold text-gray-500">{(activeChat.contactName || 'U').charAt(0)}</span>}
                  </div>
                  
                  <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                    isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 text-gray-800 dark:text-slate-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/50 border-t border-gray-200 dark:border-white/10">
            {activeChat.aiStatus === 'AI_ACTIVE' && (
              <div className="mb-3 text-xs text-center text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-500/10 py-1.5 rounded-lg">
                🤖 AI is currently handling this conversation. Type below to take over manually.
              </div>
            )}
            <div className="flex items-center gap-2">
              <button className="p-3 text-gray-400 hover:text-indigo-600 transition-colors rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800">
                <ImageIcon className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-indigo-500 outline-none"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center flex-col text-gray-400 dark:text-slate-600">
          <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
          <p>Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}