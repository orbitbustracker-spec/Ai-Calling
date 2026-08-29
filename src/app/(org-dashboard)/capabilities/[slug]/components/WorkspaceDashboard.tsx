'use client';

import React, { useState } from 'react';
import { 
  Building2, ChevronDown, CheckCircle2, PhoneCall, MessageSquare, 
  Bot, AlertTriangle, MapPin, TrendingUp, Clock, Zap, Send, Phone, User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkspaceDashboard() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [channel, setChannel] = useState('WHATSAPP');
  const [payload, setPayload] = useState('');
  const [useRAG, setUseRAG] = useState(true);
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !payload) return;
    setSending(true);
    
    try {
      const res = await fetch('/api/dashboard/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, channel, payload, useAiRAG: useRAG })
      });
      const data = await res.json();
      alert(`Success: ${data.message}`);
      setPayload('');
      setRecipient('');
      setShowDrawer(false);
    } catch (err) {
      alert('Error sending quick action.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex relative text-gray-900 dark:text-gray-100">
      
      {/* Main Dashboard Content */}
      <div className={`flex-1 transition-all duration-300 pr-0 ${showDrawer ? 'xl:pr-[400px]' : ''}`}>
        
        {/* Top bar: Company Profile & Switcher */}
        <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900/50 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">TechVanguard Solutions</h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded border border-amber-200 dark:border-amber-500/30">
                  Enterprise Plan
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">Organization ID: ORG-9842X</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            Switch Company <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Escalated Issues Alert Banner */}
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg text-red-600 dark:text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-800 dark:text-red-400">Escalated Issues (3 Human Transfers Pending)</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">AI Voice Bot could not resolve intent for customers: Rajesh K, Sunita M, and Nima L. Immediate manual intervention required.</p>
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-sm">
            View Tickets
          </button>
        </div>

        {/* Meters and Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Real-Time Balance Gauge 1 */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-slate-400">
              <PhoneCall className="w-4 h-4" /> <span className="font-bold uppercase text-xs tracking-wider">Voice Minutes</span>
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">4,850</div>
            <div className="w-full bg-gray-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 w-[65%] h-full rounded-full"></div>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-right">65% used of 7,500 limit</div>
          </div>

          {/* Real-Time Balance Gauge 2 */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-500/10 rounded-full blur-3xl" />
             <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-slate-400">
               <MessageSquare className="w-4 h-4" /> <span className="font-bold uppercase text-xs tracking-wider">WhatsApp Credits</span>
             </div>
             <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">12,400</div>
             <div className="w-full bg-gray-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
               <div className="bg-green-500 w-[40%] h-full rounded-full"></div>
             </div>
             <div className="text-xs text-gray-400 mt-2 text-right">40% used of 31,000 limit</div>
          </div>

          {/* Real-Time Balance Gauge 3 */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-500/10 rounded-full blur-3xl" />
             <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-slate-400">
               <Bot className="w-4 h-4" /> <span className="font-bold uppercase text-xs tracking-wider">AI Tokens</span>
             </div>
             <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">1.2M</div>
             <div className="w-full bg-gray-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
               <div className="bg-purple-500 w-[80%] h-full rounded-full"></div>
             </div>
             <div className="text-xs text-gray-400 mt-2 text-right">80% used of 1.5M limit</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Quick Performance Analytics */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Today's Performance
            </h3>
            <div className="space-y-6">
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <div className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Total Outbound Calls Made</div>
                   <div className="text-xl font-bold">1,248</div>
                 </div>
                 <div className="w-full bg-gray-100 dark:bg-slate-950 h-3 rounded-full overflow-hidden">
                   <div className="bg-indigo-500 w-[85%] h-full rounded-full"></div>
                 </div>
               </div>
               
               <div>
                 <div className="flex justify-between items-end mb-2">
                   <div className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Successful Conversions</div>
                   <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">32.4%</div>
                 </div>
                 <div className="w-full bg-gray-100 dark:bg-slate-950 h-3 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 w-[32.4%] h-full rounded-full"></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between items-end mb-2">
                   <div className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Average Call Duration</div>
                   <div className="text-xl font-bold text-amber-600 dark:text-amber-400">2m 45s</div>
                 </div>
                 <div className="w-full bg-gray-100 dark:bg-slate-950 h-3 rounded-full overflow-hidden">
                   <div className="bg-amber-500 w-[60%] h-full rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Live Call & Chat Monitor Map/Widget */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden flex flex-col">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
              <MapPin className="w-5 h-5 text-emerald-500" /> Live Monitor Map
            </h3>
            <div className="flex-1 bg-gray-50 dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-white/5 relative overflow-hidden flex items-center justify-center">
              {/* Abstract Map Background Simulation */}
              <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Pulsing markers to simulate live calls/chats */}
              <div className="absolute top-[30%] left-[40%]">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
              <div className="absolute top-[60%] left-[20%]">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
              <div className="absolute top-[20%] right-[30%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
              
              <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 dark:border-white/10 text-center">
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">42</div>
                <div className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Active Channels</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Toggle for Quick Message if drawer is hidden */}
        {!showDrawer && (
          <button 
            onClick={() => setShowDrawer(true)}
            className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold z-40 transition-transform hover:scale-105"
          >
            <Zap className="w-5 h-5" /> Quick Message
          </button>
        )}
      </div>

      {/* Right Side Quick Message Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-white/10 shadow-2xl z-50 transition-transform duration-300 transform ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" /> Quick Action
            </h2>
            <button 
              onClick={() => setShowDrawer(false)}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSend} className="flex-1 flex flex-col gap-6 relative z-10 overflow-y-auto">
            
            {/* Recipient Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Recipient</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  required
                  placeholder="Name or Number (e.g. Rajesh K.)" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Channel Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Communication Channel</label>
              <select 
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-sm appearance-none"
              >
                <option value="VOICE_CALL">AI Voice Call (Outbound Dial)</option>
                <option value="WHATSAPP">WhatsApp Business</option>
                <option value="MESSENGER">FB Messenger / Instagram DM</option>
                <option value="SMS">SMS / Viber</option>
              </select>
            </div>

            {/* RAG Engine Toggle */}
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-500/20 rounded-xl">
              <div>
                <div className="font-bold text-sm text-purple-900 dark:text-purple-300">Use Knowledge Base (RAG)</div>
                <div className="text-xs text-purple-700 dark:text-purple-400/70">Auto-retrieve context for this message</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={useRAG} onChange={(e) => setUseRAG(e.target.checked)} />
                <div className="w-11 h-6 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Message Box */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Message Script / Payload</label>
              <textarea 
                required
                placeholder="Type your message or script here..." 
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full flex-1 min-h-[150px] bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-sm"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
              <button 
                type="submit"
                disabled={sending}
                className="col-span-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors disabled:opacity-50"
              >
                {channel === 'VOICE_CALL' ? (
                  <><Phone className="w-5 h-5" /> Trigger AI Voice Call Now</>
                ) : (
                  <><Send className="w-5 h-5" /> Send Instant Message</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
