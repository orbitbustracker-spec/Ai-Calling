import React from 'react';
import { MessageCircle, Globe, Settings, Lock } from 'lucide-react';
import { Button } from '@/components/Button';

export default function SocialIntegrationsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Social Media & WhatsApp</h1>
        <p className="text-gray-500 mt-1">Request Meta API integrations to read and reply to WhatsApp and Messenger directly from Nexus.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3">
        <Lock className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-yellow-800">Super Admin Approval Required</h4>
          <p className="text-sm text-yellow-700 mt-1">
            API Keys for social integrations must be configured by the Super Admin. A monthly subscription fee applies (Platform base cost + approx. 70% markup). Please request integration to proceed.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">WhatsApp Business API</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">Connect your WhatsApp Business Account to enable AI bots to reply to customers and forward complex chats to human agents.</p>
          </div>
          <Button onClick={() => alert('Integration request sent to Super Admin.')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium border border-transparent">
            Request WhatsApp Integration
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Meta Messenger</h3>
            <p className="text-sm text-gray-500 mt-2 mb-6">Link your Facebook Page and Instagram Professional Account to unify all direct messages into your omnichannel inbox.</p>
          </div>
          <Button onClick={() => alert('Integration request sent to Super Admin.')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium border border-transparent">
            Request Meta Integration
          </Button>
        </div>
      </div>
    </div>
  );
}
