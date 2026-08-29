import { getCurrentUser } from '@/lib/authorization';
import FeatureGatekeeper from '@/components/FeatureGatekeeper';
import { notFound } from 'next/navigation';

// Component Imports (Placeholders for deep integrations)
import ExtensionsConfig from './components/ExtensionsConfig';
import VoicemailConfig from './components/VoicemailConfig';
import ThreeWayCallingConfig from './components/ThreeWayCallingConfig';
import TransfersConfig from './components/TransfersConfig';
import CampaignsConfig from './components/CampaignsConfig';
import SmartDialerConfig from './components/SmartDialerConfig';
import VoiceBroadcastingConfig from './components/VoiceBroadcastingConfig';
import ClickToCallConfig from './components/ClickToCallConfig';
import CustomerCRM from './components/CustomerCRM';
import CallNotes from './components/CallNotes';
import CallTagging from './components/CallTagging';
import PersonalizedMessages from './components/PersonalizedMessages';
import CallManagement from './components/CallManagement';
import WhatsAppAI from './components/WhatsAppAI';
import AnalyticsInsights from './components/AnalyticsInsights';
import WorkspaceDashboard from './components/WorkspaceDashboard';

const CAPABILITIES = {
  'dashboard': { title: 'Workspace Dashboard', component: WorkspaceDashboard },
  'extensions': { title: 'SIP Extensions', component: ExtensionsConfig },
  'voicemail': { title: 'Visual Voicemail & AI Transcripts', component: VoicemailConfig },
  'three-way-calling': { title: '3-Way Calling & Supervisor Intercept', component: ThreeWayCallingConfig },
  'transfers': { title: 'Call Transfers & Routing', component: TransfersConfig },
  'campaigns': { title: 'Outbound Campaigns Manager', component: CampaignsConfig },
  'smart-dialer': { title: 'Smart Dialer Concurrency', component: SmartDialerConfig },
  'voice-broadcasting': { title: 'Voice Broadcasting Tasks', component: VoiceBroadcastingConfig },
  'click-to-call': { title: 'Click-to-Call Web Embed', component: ClickToCallConfig },
  'customer-crm': { title: 'Customer CRM Profiles', component: CustomerCRM },
  'call-notes': { title: 'AI Call Notes & Summaries', component: CallNotes },
  'call-tagging': { title: 'Sentiment Tagging', component: CallTagging },
  'personalized-messages': { title: 'Dynamic Personalized Messages', component: PersonalizedMessages },
  'call-management': { title: 'Inbound/Outbound Call Management', component: CallManagement },
  'whatsapp-ai': { title: 'WhatsApp AI Agent', component: WhatsAppAI },
  'analytics': { title: 'Analytics & Insights', component: AnalyticsInsights },
};

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await getCurrentUser();
  if (!user?.organizationId) return <div>Unauthorized</div>;

  const { slug } = await params;
  const config = CAPABILITIES[slug as keyof typeof CAPABILITIES];

  if (!config) {
    notFound();
  }

  const Component = config.component;

  return (
    <FeatureGatekeeper organizationId={user.organizationId}>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{config.title}</h1>
          <p className="text-gray-500 mt-1">Manage settings and integrations for this capability.</p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8">
          <Component />
        </div>
      </div>
    </FeatureGatekeeper>
  );
}
