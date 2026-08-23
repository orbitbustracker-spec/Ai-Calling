import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, Users, Activity, Zap, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

const PRODUCTS = {
  'conversational-ivr': {
    title: 'Conversational IVR',
    subtitle: 'Replace static press-1 menus with dynamic, AI-driven voice receptionists.',
    features: ['Natural Language Understanding', 'Dynamic Routing', 'Multi-lingual Support'],
  },
  'voice-broadcasting': {
    title: 'Mass Voice Broadcasting',
    subtitle: 'Reach thousands of customers instantly with dynamic, personalized TTS audio campaigns.',
    features: ['High-Concurrency Dialing', 'Real-time Analytics', 'Variable TTS Engine'],
  },
  'omnichannel-gateway': {
    title: 'Omnichannel Gateway',
    subtitle: 'Unify Voice, WhatsApp, Messenger, and SMS into a single AI-driven command center.',
    features: ['WhatsApp Integration', 'Unified CRM', 'Automated Handoffs'],
  },
  'smart-dialer': {
    title: 'Smart Predictive Dialer',
    subtitle: 'Maximize agent talk time by filtering out voicemails, busy signals, and disconnected numbers.',
    features: ['Answering Machine Detection', 'Intelligent Pacing', 'Agent WebRTC Dashboard'],
  }
};

export default function ProductLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-indigo-500/30 font-sans">
      
      {/* 1. HERO SECTION (Glassmorphic) */}
      <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Nexus Voice AI SaaS</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
            {product.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {product.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 group">
              Try for Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2">
              <Play className="h-5 w-5" /> Book AI Demo
            </button>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE MOCKUP FRAME */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-32 relative z-20">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl p-2 shadow-2xl shadow-indigo-900/20 ring-1 ring-white/10">
          <div className="rounded-2xl overflow-hidden bg-[#0a0a0b] flex h-[600px] border border-gray-800">
            {/* Fake Sidebar */}
            <div className="w-64 border-r border-gray-800 p-4 hidden md:block">
              <div className="h-8 w-32 bg-gray-800 rounded mb-8"></div>
              <div className="space-y-3">
                <div className="h-10 bg-indigo-600/20 border border-indigo-500/20 rounded-lg"></div>
                <div className="h-10 bg-gray-800/50 rounded-lg"></div>
                <div className="h-10 bg-gray-800/50 rounded-lg"></div>
              </div>
            </div>
            {/* Fake Content */}
            <div className="flex-1 p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-64 bg-gray-800 rounded"></div>
                <div className="h-10 w-32 bg-indigo-600 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="h-32 bg-gray-800/50 rounded-2xl border border-gray-800"></div>
                <div className="h-32 bg-gray-800/50 rounded-2xl border border-gray-800"></div>
                <div className="h-32 bg-gray-800/50 rounded-2xl border border-gray-800"></div>
              </div>
              <div className="h-64 bg-gray-800/50 rounded-2xl border border-gray-800"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HOW IT WORKS (6 STEPS) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How {product.title} Works</h2>
          <p className="text-gray-400">A seamless pipeline powered by real-time AI.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Call Reception', desc: 'Instant pickup with sub-200ms latency via SIP trunking.' },
            { step: '2', title: 'AI Understanding', desc: 'Whisper-level speech-to-text accurately maps the caller intent.' },
            { step: '3', title: 'Dynamic Routing', desc: 'Logic tree evaluates intent and determines the next best action.' },
            { step: '4', title: 'Knowledge Retrieval', desc: 'RAG system queries the vector database for custom business answers.' },
            { step: '5', title: 'Real-time Action', desc: 'Executes API webhooks (booking, payment, CRM update) instantly.' },
            { step: '6', title: 'Sentiment & Log', desc: 'Call is tagged, summarized, and stored in the analytics dashboard.' },
          ].map((s) => (
            <div key={s.step} className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                {s.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CAPABILITIES GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Unmatched Capabilities</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Experience the power of enterprise-grade telephony combined with next-gen generative AI models.
            </p>
            <ul className="space-y-4">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="h-6 w-6 text-indigo-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700">
              <Activity className="h-8 w-8 text-indigo-400 mb-4" />
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime SLA</div>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700 mt-8">
              <Zap className="h-8 w-8 text-yellow-400 mb-4" />
              <div className="text-3xl font-bold text-white mb-1">&lt;200ms</div>
              <div className="text-sm text-gray-400">Voice Latency</div>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700">
              <Users className="h-8 w-8 text-green-400 mb-4" />
              <div className="text-3xl font-bold text-white mb-1">10x</div>
              <div className="text-sm text-gray-400">ROI on Agents</div>
            </div>
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700 mt-8">
              <Phone className="h-8 w-8 text-blue-400 mb-4" />
              <div className="text-3xl font-bold text-white mb-1">Unlimited</div>
              <div className="text-sm text-gray-400">Concurrency</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
