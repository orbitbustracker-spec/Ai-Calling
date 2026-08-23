import React from 'react';
import { PhoneForwarded, Settings, Save, Smartphone, Users } from 'lucide-react';
import { Button } from '@/components/Button';

export default function CallForwardingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Call Forwarding & Routing</h1>
        <p className="text-gray-500 mt-1">Set up rules to forward calls from AI to human agents or mobile devices.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Smartphone className="h-5 w-5 text-indigo-500" /> Mobile Fallback
        </h3>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Mobile Number</label>
            <input type="tel" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="+977 98XXXXXXX" />
            <p className="text-xs text-gray-500 mt-1">If the WebRTC Softphone is offline or the AI fails, calls route here.</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 pt-6 border-t border-gray-100">
          <Users className="h-5 w-5 text-indigo-500" /> Ring Groups
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Routing Strategy</label>
            <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
              <option>Simultaneous Ring (Ring All)</option>
              <option>Sequential Ring (Round Robin)</option>
              <option>Skills-Based Routing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (Seconds)</label>
            <input type="number" defaultValue={30} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Rules
          </Button>
        </div>
      </div>
    </div>
  );
}
