import Link from 'next/link';
import { Button } from '@/components/Button';
import { BaraldharSVG } from '@/components/BaraldharSVG';
import { PhoneCall, Bot, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <BaraldharSVG />
              <span className="font-bold text-xl text-gray-900">Ai Calling Nepal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-500 hover:text-gray-900 font-medium text-sm">
                Log in
              </Link>
              <Link href="/login">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
          <div className="absolute top-0 w-full h-full bg-indigo-900 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop")' }}>
            <span className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          
          <div className="container relative mx-auto px-4 z-10 text-center pt-24 pb-32">
            <h1 className="text-5xl font-extrabold text-white tracking-tight sm:text-6xl md:text-7xl mb-6">
              Next-Gen Voice AI for Nepal
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Automate customer support, scale outbound campaigns, and build intelligent IVR systems directly with NTC & Ncell SIP networks.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white border-0 text-lg px-8 py-3 h-auto">
                  Go to Dashboard <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Core Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A Complete Telephony Operating System
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <PhoneCall className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Direct NTC/Ncell SIP</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Plug in your IP PBX directly. We handle the heavy lifting, routing, and SIP trunk abstractions without relying on foreign APIs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Bot className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Autonomous Voice Agents</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Configure LLMs to speak fluidly over the phone. Set prompts, knowledge bases, and let AI handle the support queue 24/7.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Prepaid Billing Engine</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Multi-tenant architecture where organizations purchase minute packages. Automated ledger tracking and exact minute deduplication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Super Admin Observability</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Complete 360° visibility. Monitor live calls, active campaigns, webhook failures, and agent performance in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BaraldharSVG />
              <span className="text-white font-semibold">Ai Calling Nepal</span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 Ai Calling. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
