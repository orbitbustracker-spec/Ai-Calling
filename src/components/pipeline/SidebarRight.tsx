'use client';

import React, { useState } from 'react';
import { Settings, Phone, MessageCircle, Clock, Zap, Mail, Save } from 'lucide-react';
import { Button } from '@/components/Button';

export function SidebarRight({ selectedNode, onCallClick, activeResource }: { selectedNode: any, onCallClick: () => void, activeResource?: string | null }) {
  const [knowledgeText, setKnowledgeText] = useState('');
  
  if (activeResource === 'knowledge') {
    return (
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10">
        <h2 className="text-lg font-bold text-white mb-2">Properties</h2>
        
        <div className="flex-1 flex flex-col mt-4 space-y-4">
           <div className="flex justify-between items-center">
             <div>
               <h3 className="text-sm font-bold text-white bg-blue-600 px-2 py-1 rounded inline-block">Manual Text Entry</h3>
               <p className="text-xs text-white/50 mt-1">Type direct instructions or FAQs</p>
             </div>
             <button onClick={() => alert('Text saved to Knowledge Base')} className="p-2 bg-orange-500/20 text-orange-400 hover:bg-orange-500/40 rounded-xl transition-colors">
               <Save className="w-4 h-4" />
             </button>
           </div>
           
           <p className="text-[10px] text-white/40 leading-tight">
             E.g. Our return policy is 30 days. Our business hours are 9 AM to 5 PM EST...
           </p>

           <textarea
             value={knowledgeText}
             onChange={(e) => setKnowledgeText(e.target.value)}
             className="flex-1 w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 resize-none outline-none focus:border-orange-500/50 h-full min-h-[300px]"
             placeholder="Type your instructions here..."
           />
        </div>
      </div>
    );
  }

  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10">
        <h2 className="text-lg font-bold text-white mb-2">Properties</h2>
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-sm text-slate-500">Select a node on the canvas to view and edit its properties.</p>
        </div>
      </div>
    );
  }

  const { data } = selectedNode;

  return (
    <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col z-10 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-800 rounded-lg text-slate-300">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{data.label}</h2>
          <p className="text-xs text-slate-400">Node Configuration</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Generic Property */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Node Name</label>
          <input 
            type="text" 
            defaultValue={data.label}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
          <textarea 
            defaultValue={data.sublabel}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
          />
        </div>

        {/* Conditional Properties based on Node Type */}
        
        {data.label === 'Make AI Call' && (
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-indigo-400 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Telephony / AI Call Config
            </h3>
            <p className="text-xs text-slate-300">Start an automated AI voice call via Asterisk v20 server.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Telephony Server Profile</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Asterisk v20 (Primary Node)</option>
                <option>Twilio Elastic SIP Trunk</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">AI Agent Profile</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Sales Representative (Sarah)</option>
                <option>Customer Support (John)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Initial Call Script</label>
              <textarea 
                placeholder="Hi, this is Sarah from [Company]. I noticed you requested..."
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none min-h-[80px]"
              />
            </div>

            <Button onClick={onCallClick} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Open Dialer Test
            </Button>
          </div>
        )}

        {data.icon === 'whatsapp' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-green-400 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp Message
            </h3>
            <p className="text-xs text-slate-300">This node will send a WhatsApp template message.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Message Template</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Welcome Message</option>
                <option>Follow Up</option>
                <option>Meeting Reminder</option>
              </select>
            </div>
          </div>
        )}

        {data.label === 'Delay' && (
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-orange-400 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Wait / Delay
            </h3>
            <p className="text-xs text-slate-300">Pause the workflow execution before continuing.</p>
            
            <div className="flex gap-2">
              <div className="space-y-2 flex-1">
                <label className="text-xs text-slate-400">Duration</label>
                <input type="number" defaultValue={2} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-xs text-slate-400">Unit</label>
                <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option>Minutes</option>
                  <option>Hours</option>
                  <option selected>Days</option>
                  <option>Weeks</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {data.label === 'Condition (If/Else)' && (
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-purple-400 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Logic Condition
            </h3>
            <p className="text-xs text-slate-300">Evaluate a rule to split the workflow into Yes/No paths.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">If</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none mb-2">
                <option>Call Status</option>
                <option>Lead Score</option>
                <option>Email Opened</option>
                <option>Custom Variable</option>
              </select>
              
              <div className="flex gap-2">
                <select className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option>Equals</option>
                  <option>Contains</option>
                  <option>Greater than</option>
                </select>
                <input type="text" defaultValue="Answered" className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
              </div>
            </div>
          </div>
        )}

        {data.label === 'Update CRM / Webhook' && (
          <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-sky-400 flex items-center gap-2">
              <Zap className="w-4 h-4" /> External Action
            </h3>
            <p className="text-xs text-slate-300">Sync data back to your Database or CRM.</p>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Connection</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Internal PostgreSQL</option>
                <option>HubSpot CRM</option>
                <option>Zoho CRM</option>
                <option>Custom Webhook</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Action to Perform</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>Update Lead Status</option>
                <option>Add Note</option>
                <option>Create Ticket</option>
              </select>
            </div>
          </div>
        )}

        {data.label === 'Send email' && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-4">
            <h3 className="text-sm font-medium text-rose-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Outreach
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Provider</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                <option>SendGrid</option>
                <option>Resend</option>
                <option>SMTP Custom</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Subject Line</label>
              <input type="text" placeholder="Following up on our call..." className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Email Body</label>
              <textarea 
                placeholder="Hi {{first_name}}, ..."
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none min-h-[120px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
