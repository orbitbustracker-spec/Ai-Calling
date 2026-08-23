'use client';

import React from 'react';
import { Play, Pause, FastForward, Rewind, MessageCircle, FileText, CheckCircle, Tag, Phone } from 'lucide-react';

export default function CallNotes() {
  return (
    <div className="flex h-[750px] bg-white rounded-2xl border border-gray-200 overflow-hidden text-sm">
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-200 bg-white">
          <input type="text" placeholder="Search call notes..." className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 ${i === 1 ? 'bg-indigo-50 border-indigo-100' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900">+977-984123456{i}</div>
                <div className="text-xs text-gray-500">10:4{i} AM</div>
              </div>
              <div className="text-xs text-gray-600 line-clamp-2 mb-2">Customer called regarding an issue with their recent subscription renewal and asked for a refund...</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase">Support</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">Negative</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Phone className="h-5 w-5 text-indigo-500"/> +977-9841234561</h2>
            <div className="text-sm text-gray-500 mt-1">Duration: 04:23 • Agent: AI Assistant Beta</div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700">Export PDF</button>
        </div>

        <div className="p-6 bg-gray-900 text-white flex items-center gap-6">
          <button className="h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors shrink-0">
            <Play className="h-5 w-5 ml-1" />
          </button>
          <div className="flex-1 space-y-2">
            <div className="h-12 flex items-center gap-1 opacity-80">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="flex-1 bg-indigo-400 rounded-full" style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span>01:12</span>
              <span>04:23</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><FileText className="h-4 w-4"/> AI Summary</h3>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm leading-relaxed text-gray-700">
              The customer is extremely frustrated because their card was charged twice for the premium plan. They demand an immediate refund of the duplicate charge. The AI assistant successfully validated their identity, paused the recurring subscription, and escalated the refund ticket to the human billing department.
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><CheckCircle className="h-4 w-4"/> Extracted Action Items</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                <span className="text-gray-800">Process refund for transaction ID #TXN-9982</span>
              </li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                <span className="text-gray-800">Send apology email template to customer</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
