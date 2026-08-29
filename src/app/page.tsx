import React from 'react';
import Link from 'next/link';
import { Bot, Mic, Phone, ChevronRight, Zap, MessageSquare, Globe, Server, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Nexus</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Platform</Link>
            <Link href="#solutions" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">Dashboard Login</Link>
            <Link href="/signup">
              <Button className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 shadow-sm">
            <Zap className="h-4 w-4" /> V2.0 Enterprise Engine Live
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] break-words px-4 text-gray-900 dark:text-white">
            Next-Gen AI Voice &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 inline-block">
              Omnichannel Communications
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Unify your enterprise telephony with conversational AI. Deploy autonomous AI receptionists, WebRTC softphones, and an omnichannel inbox—powered by open-source LLMs and local SIP trunks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center gap-2 transition-transform hover:scale-105">
                Start Free Trial <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button className="h-14 px-8 border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-lg font-medium shadow-sm dark:shadow-none">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Simulated Demo Widget */}
        <div className="mt-20 max-w-4xl mx-auto px-4 relative" id="demo">
          <div className="bg-white dark:bg-[#111113] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 dark:from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="bg-gray-50 dark:bg-[#1a1a1d] rounded-xl border border-gray-100 dark:border-gray-800/60 p-8 text-center relative z-10 shadow-sm">
              <div className="h-20 w-20 bg-indigo-100 dark:bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border border-indigo-200 dark:border-indigo-500/30 animate-[ping_2s_ease-in-out_infinite]" />
                <Mic className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Try the Live AI Assistant</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">Click below to initiate a WebRTC call directly from your browser to our conversational AI.</p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => alert("Initiating WebRTC Call to Demo Agent...")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-4 font-bold flex items-center gap-2 transition-all shadow-md"
                >
                  <Phone className="h-5 w-5" /> Call AI Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Overview Section */}
      <section className="py-16 bg-indigo-50/50 dark:bg-indigo-950/20 border-y border-indigo-100 dark:border-indigo-900/30" id="capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Voice Engine Hub Ecosystem</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to automate communication workflows efficiently.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Knowledge Base RAG (Train AI on your data)",
              "Smart Dialer & Concurrency Management",
              "Omnichannel Unified Inbox (WhatsApp, IG, SMS)",
              "Visual Voicemail & AI Transcripts",
              "Voice Broadcasting Campaigns",
              "Customer CRM Profiles"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-black relative" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Enterprise-Grade Architecture</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to run a modern, AI-first contact center. Built for scale, low latency, and absolute control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]">
              <div className="h-14 w-14 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Bot className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Receptionist & Voice</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Deploy 24/7 natural-sounding Voice AI. Connects instantly to NTC, Ncell, or any custom IP-PBX via SIP trunking. Handles outbound dialing and inbound answering with sub-second latency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="h-14 w-14 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Omnichannel Messaging</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A unified inbox for your human agents and AI. Manage WhatsApp API, Messenger, Instagram DMs, and SMS seamlessly from one single interface.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] dark:hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <div className="h-14 w-14 bg-green-100 dark:bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">WebRTC Softphone</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                No physical hardware required. Make and receive calls directly from your browser or mobile client using our secure, low-latency WebRTC integration.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] dark:hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              <div className="h-14 w-14 bg-pink-100 dark:bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bring Your Own Infra</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Absolute flexibility. Plug in your own custom open-source LLMs (vLLM, Ollama), specific TTS/STT engines, or connect your local telco SIP trunks via our secure edge orchestrator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">Nexus</span>
          </div>
          <p className="text-gray-500 dark:text-gray-500 text-sm">© 2026 Nexus AI Voice SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
