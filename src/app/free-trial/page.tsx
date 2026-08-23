'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Bot, CheckCircle2, LayoutDashboard, MessageSquare, PhoneCall, Globe, CheckCircle } from 'lucide-react';

const TABS_DATA = [
  {
    id: 'uc-clients',
    title: 'Unified UC Clients',
    icon: LayoutDashboard,
    heading: 'Anywhere-Anytime Connectivity',
    desc: 'To unleash your agile workforce, you just need Nexus UC Clients in place, which are easily accessible through web browsers, mobile phones, and desktop clients.',
    bullets: [
      'Bring your extension with you and connect anywhere, anytime.',
      'Integrated voice, video, messaging, and conferencing.',
      'Auto-failover and robust disaster recovery.'
    ],
    image: '/images/trial-hero.jpg'
  },
  {
    id: 'call-center',
    title: 'Call Center Solution',
    icon: PhoneCall,
    heading: 'AI-Powered Call Center',
    desc: 'Maximize agent productivity and customer satisfaction with intelligent routing, real-time analytics, and AI voice agents.',
    bullets: [
      'Skill-based routing and intelligent queue management.',
      'Real-time call monitoring, whisper, and barge-in.',
      'Automated post-call transcription and sentiment analysis.'
    ],
    image: '/images/call-center.jpg'
  },
  {
    id: 'omnichannel',
    title: 'Omnichannel Messaging',
    icon: MessageSquare,
    heading: 'Unified Inbox for Every Channel',
    desc: 'Interact with your customers exactly where they are. Manage SMS, WhatsApp, Messenger, and live chat natively without switching tabs.',
    bullets: [
      'Single pane of glass for all text-based interactions.',
      'Bot-to-human handoff seamlessly integrated.',
      'Rich messaging support including attachments and locations.'
    ],
    image: '/images/omnichannel.jpg'
  },
  {
    id: 'interoperability',
    title: 'High Interoperability',
    icon: Globe,
    heading: 'Seamless API Integration',
    desc: 'Connect your business tools directly to your communication layer. Integrates flawlessly with CRMs, Helpdesks, and custom internal systems.',
    bullets: [
      'Native integrations with Salesforce, HubSpot, and Zendesk.',
      'Extensive RESTful API and Webhooks for custom workflows.',
      'Bring your own SIP Trunks and large language models.'
    ],
    image: '/images/interoperability.jpg'
  }
];

export default function FreeTrialPage() {
  const [activeTab, setActiveTab] = useState(TABS_DATA[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert form to JSON payload
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="w-full z-50 top-0 border-b border-white/10 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Nexus
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Copy & Image */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] mb-6">
              Nexus Unified Platform <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                14-Day Free Trial
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8">
              Why choose the Nexus Communication System? Everything you need to unify your AI agents, human workforce, and SIP telephony into one enterprise dashboard.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                <span className="text-gray-300"><strong>Advanced Voice AI:</strong> Deploy autonomous agents that handle inbound and outbound calling securely.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                <span className="text-gray-300"><strong>Omnichannel Inbox:</strong> Manage WhatsApp, SMS, Messenger, and Voice all from a single pane of glass.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                <span className="text-gray-300"><strong>WebRTC Softphone:</strong> Call from anywhere using your browser, integrated directly into your workflow.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                <span className="text-gray-300"><strong>Bring Your Own Infra:</strong> Attach NTC/Ncell SIP Trunks, Custom LLMs, and local STT/TTS models effortlessly.</span>
              </li>
            </ul>

            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-indigo-900/20 hidden lg:block">
              <img 
                src="/images/trial-hero.jpg" 
                alt="Nexus Enterprise AI Voice Platform" 
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <p className="text-sm font-medium text-white tracking-wide">Next-Generation AI Telephony System</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#111113] rounded-3xl border border-gray-800 p-8 shadow-2xl relative flex flex-col justify-center min-h-[600px]">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
            
            {isSubmitted ? (
              <div className="relative z-10 text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank you!</h3>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  Your form has been successfully submitted. We've sent a confirmation email to you with the next steps to access your free trial.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="text-white border border-gray-700 bg-transparent hover:bg-gray-800 rounded-full">
                  Submit Another
                </Button>
              </div>
            ) : (
              <div className="relative z-10 animate-in fade-in duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">Create your trial account</h3>
                <p className="text-gray-500 mb-8 text-sm">No credit card required. Setup takes less than 2 minutes.</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">First Name *</label>
                      <input name="firstName" type="text" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Last Name *</label>
                      <input name="lastName" type="text" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Business Email *</label>
                      <input name="email" type="email" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Phone Number *</label>
                      <input name="phone" type="tel" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Company Name *</label>
                      <input name="company" type="text" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Job Title *</label>
                      <input name="jobTitle" type="text" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Country/Region *</label>
                    <select name="country" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required>
                      <option value="">Select your country...</option>
                      <option value="NP">Nepal</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Define the profile of your PBX/UC? *</label>
                    <select name="profile" className="w-full bg-[#1a1a1d] border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" required>
                      <option value="">Select an option...</option>
                      <option value="1-10">1-10 Extensions</option>
                      <option value="11-50">11-50 Extensions</option>
                      <option value="51-200">51-200 Extensions</option>
                      <option value="200+">200+ Extensions</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    By submitting this form, you agree to Nexus Voice's <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a> and <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>. We will never share your personal information.
                  </p>

                  <Button disabled={isSubmitting} type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-900/30 transition-transform active:scale-95 mt-4 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Start Free Trial Now'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Embrace Boundless Communication section with Interactive Tabs */}
      <section className="bg-black py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Embrace Boundless Enterprise Communication</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            The perfect balance between maximizing business efficiency and routing management.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {TABS_DATA.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab.id === tab.id;
              
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 border ${
                    isActive 
                      ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.2)]' 
                      : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" /> {tab.title}
                </button>
              );
            })}
          </div>

          <div className="bg-[#111113] rounded-3xl border border-gray-800 p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left min-h-[400px]">
            <div className="flex-1 animate-in fade-in slide-in-from-left-4 duration-500 key={activeTab.id}">
              <h3 className="text-2xl font-bold text-white mb-4">{activeTab.heading}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {activeTab.desc}
              </p>
              <ul className="space-y-3">
                {activeTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" /> {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative animate-in fade-in slide-in-from-right-4 duration-500 key={activeTab.id}">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-full" />
              <img 
                key={activeTab.image}
                src={activeTab.image} 
                alt={activeTab.title} 
                className="relative rounded-xl border border-gray-800 shadow-2xl object-cover aspect-video" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-900 bg-[#050505] py-8 text-center text-gray-500 text-sm">
        © 2026 Nexus Voice SaaS. All rights reserved.
      </footer>
    </div>
  );
}
