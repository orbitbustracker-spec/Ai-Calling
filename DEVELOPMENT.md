# Voice AI SaaS - Development Guide

## Project Structure

```
voice-ai-saas/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── dashboard/                # Customer dashboard pages
│   │   │   └── page.tsx              # Minutes tracking, packages
│   │   ├── agents/                   # AI Agent management
│   │   │   └── page.tsx              # Agent creator/configuration
│   │   ├── analytics/                # Call records & transcripts
│   │   │   └── page.tsx              # Analytics and insights
│   │   ├── api/                      # API Routes
│   │   │   ├── stt/route.ts          # Speech-to-Text API
│   │   │   ├── llm/route.ts          # Language Model API
│   │   │   └── tts/route.ts          # Text-to-Speech API
│   │   ├── layout.tsx                # Root layout with sidebar
│   │   └── globals.css               # Global styles
│   ├── components/                   # Reusable React components
│   │   ├── Button.tsx                # Button component
│   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   ├── README.md                 # Components documentation
│   │   └── [other components]
│   ├── lib/                          # Utility functions & services
│   │   ├── utils.ts                  # Class name utilities
│   │   ├── db.ts                     # Database configuration (Prisma)
│   │   └── connectors/               # External API integrations
│   │       ├── sttConnector.ts       # Speech-to-Text providers
│   │       ├── llmConnector.ts       # LLM providers
│   │       └── ttsConnector.ts       # Text-to-Speech providers
│   └── [other files]
├── .env.example                      # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your API keys and configuration
```

### 3. Set Up Database (Optional - Prisma)
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

## Feature Implementation Order

### Phase 1: Core Structure ✓
- [x] Project structure
- [x] UI components (Button, Sidebar)
- [x] API route scaffolding
- [x] Database configuration template

### Phase 2: Authentication
- [ ] User authentication (NextAuth.js or Clerk)
- [ ] User dashboard
- [ ] API key management

### Phase 3: STT Integration
- [ ] Choose STT provider (AssemblyAI, Deepgram, Google Cloud, etc.)
- [ ] Implement STT connector
- [ ] Audio recording component
- [ ] Transcription display

### Phase 4: LLM Integration
- [ ] Choose LLM provider (OpenAI, Anthropic, Groq, etc.)
- [ ] Implement LLM connector
- [ ] Context/system prompt management
- [ ] Response handling

### Phase 5: TTS Integration
- [ ] Choose TTS provider (ElevenLabs, Google, Polly, etc.)
- [ ] Implement TTS connector
- [ ] Voice selection UI
- [ ] Audio playback component

### Phase 6: Voice Conversation Flow
- [ ] Orchestrate STT → LLM → TTS pipeline
- [ ] Call recording and storage
- [ ] Transcript saving
- [ ] Agent configuration and settings

### Phase 7: Analytics & Monitoring
- [ ] Call history display
- [ ] Transcript viewer
- [ ] Usage analytics (minutes, calls, etc.)
- [ ] Performance metrics

### Phase 8: Payments & Billing
- [ ] Package management
- [ ] Stripe integration
- [ ] Usage tracking
- [ ] Billing dashboard

## Technology Stack

- **Frontend**: Next.js 15+ with React
- **Styling**: Tailwind CSS + Shadcn UI components
- **Language**: TypeScript
- **Icons**: Lucide React
- **Database**: Prisma ORM (PostgreSQL recommended)
- **Authentication**: NextAuth.js (planned)
- **External APIs**:
  - STT: AssemblyAI / Deepgram / Google Cloud
  - LLM: OpenAI / Anthropic / Groq
  - TTS: ElevenLabs / Google Cloud / Amazon Polly

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## API Endpoints

### STT (Speech-to-Text)
- **Endpoint**: `POST /api/stt`
- **Body**: FormData with audio file
- **Response**: `{ text: string, duration: number }`

### LLM (Language Model)
- **Endpoint**: `POST /api/llm`
- **Body**: `{ text: string, agentId: string }`
- **Response**: `{ response: string, tokens: { prompt, completion } }`

### TTS (Text-to-Speech)
- **Endpoint**: `POST /api/tts`
- **Body**: `{ text: string, voice?: string }`
- **Response**: `{ audioUrl: string, duration: number }`

## Environment Variables Reference

See `.env.example` for all available configuration options.

## Troubleshooting

### Issue: Cannot find module '@/...'
**Solution**: Check that `jsconfig.json` or `tsconfig.json` has the path alias configured:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Tailwind styles not applying
**Solution**: Ensure `tailwind.config.js` includes the correct content paths:
```js
content: [
  './src/**/*.{js,ts,jsx,tsx}',
]
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide React Icons](https://lucide.dev)

## Contributing

1. Create feature branches from `main`
2. Follow TypeScript strict mode
3. Add JSDoc comments for public functions
4. Test components before pushing
5. Keep components focused and reusable

## License

TODO: Add license information

---

**Last Updated**: 2026-08-17
