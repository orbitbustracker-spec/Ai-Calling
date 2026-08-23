import Link from 'next/link';
import { Button } from '@/components/Button';
import { Bot, PhoneCall, MessageSquare, Server, Globe, ChevronRight, Phone, Mic, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Nexus
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Platform</Link>
              <Link href="#solutions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Dashboard (Login)
              </Link>
              <Link href="/free-trial">
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
            <Zap className="h-4 w-4" /> V2.0 Enterprise Engine Live
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] break-words px-4">
            Next-Gen AI Voice &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block">
              Omnichannel Communications
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Unify your enterprise telephony with conversational AI. Deploy autonomous AI receptionists, WebRTC softphones, and an omnichannel inbox—powered by open-source LLMs and local SIP trunks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/free-trial">
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold shadow-xl shadow-indigo-900/20 flex items-center gap-2 transition-transform hover:scale-105">
                Start Free Trial <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button className="h-14 px-8 border border-gray-700 bg-transparent text-white hover:bg-gray-800 rounded-full text-lg font-medium">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Simulated Demo Widget */}
        <div className="mt-20 max-w-4xl mx-auto px-4 relative" id="demo">
          <div className="bg-[#111113] rounded-2xl border border-gray-800 shadow-2xl p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="bg-[#1a1a1d] rounded-xl border border-gray-800/60 p-8 text-center relative z-10">
              <div className="h-20 w-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[ping_2s_ease-in-out_infinite]" />
                <Mic className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Try the Live AI Assistant</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Click below to initiate a WebRTC call directly from your browser to our conversational AI.</p>
              
              <div className="flex justify-center gap-4">
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-4 font-bold flex items-center gap-2 transition-all">
                  <Phone className="h-5 w-5" /> Call AI Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black relative border-t border-white/5" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Architecture</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to run a modern, AI-first contact center. Built for scale, low latency, and absolute control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-[#0f0f11] border border-gray-800 hover:border-indigo-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <Bot className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Receptionist & Voice</h3>
              <p className="text-gray-400 leading-relaxed">
                Deploy 24/7 natural-sounding Voice AI. Connects instantly to NTC, Ncell, or any custom IP-PBX via SIP trunking. Handles outbound dialing and inbound answering with sub-second latency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-[#0f0f11] border border-gray-800 hover:border-purple-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="h-14 w-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Omnichannel Messaging</h3>
              <p className="text-gray-400 leading-relaxed">
                A unified inbox for your human agents and AI. Manage WhatsApp API, Messenger, Instagram DMs, and SMS seamlessly from one single interface.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-[#0f0f11] border border-gray-800 hover:border-green-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <div className="h-14 w-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">WebRTC Softphone</h3>
              <p className="text-gray-400 leading-relaxed">
                No physical hardware required. Make and receive calls directly from your browser or mobile client using our secure, low-latency WebRTC integration.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-[#0f0f11] border border-gray-800 hover:border-pink-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              <div className="h-14 w-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Bring Your Own Infra</h3>
              <p className="text-gray-400 leading-relaxed">
                Absolute flexibility. Plug in your own custom open-source LLMs (vLLM, Ollama), specific TTS/STT engines, or connect your local telco SIP trunks via our secure edge orchestrator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Bot className="h-5 w-5 text-indigo-500" />
            <span className="font-bold text-lg text-white">Nexus</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Nexus AI Voice SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
