import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voice AI SaaS',
  description: 'AI-powered voice conversation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          {children}
        </main>
        
        {/* ElevenLabs Conversational AI Widget Script */}
        <Script src="https://elevenlabs.io/convai-widget/index.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
