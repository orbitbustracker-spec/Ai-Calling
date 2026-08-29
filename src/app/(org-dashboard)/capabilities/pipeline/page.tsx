'use client';

import React, { useState, useCallback, useRef } from 'react';
import { X, Bot, Link as LinkIcon, FileText, Users, Plus, UploadCloud } from 'lucide-react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Node, 
  Edge,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomNode } from '@/components/pipeline/CustomNode';
import { SidebarLeft } from '@/components/pipeline/SidebarLeft';
import { SidebarRight } from '@/components/pipeline/SidebarRight';
import { DialerPanel } from '@/components/pipeline/DialerPanel';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  { id: '1', type: 'custom', position: { x: 300, y: 50 }, data: { label: 'Source files', icon: 'source', color: 'blue', type: 'trigger', sublabel: '4', layout: 'vertical' } },
  { id: '2', type: 'custom', position: { x: 300, y: 220 }, data: { label: 'Find ICP accounts', icon: 'search', hasToggle: true, toggleLabel: 'Browse internet', sublabel: '18,423 prospects', layout: 'horizontal' } },
  { id: '3', type: 'custom', position: { x: 100, y: 400 }, data: { label: 'Detect signals', icon: 'action', sublabel: 'Intent + hiring + funding', layout: 'horizontal' } },
  { id: '4', type: 'custom', position: { x: 500, y: 400 }, data: { label: 'Analyze data', icon: 'logic', sublabel: 'Firmographic + context', layout: 'horizontal' } },
  { id: '5', type: 'custom', position: { x: 150, y: 550 }, data: { label: 'Personalize outreach', icon: 'email', sublabel: 'Email + LinkedIn', color: 'blue', layout: 'horizontal' }, selected: true },
  { id: '6', type: 'custom', position: { x: 500, y: 550 }, data: { label: 'Score & qualify', icon: 'ai', sublabel: 'ICP fit >= 84%', layout: 'horizontal' } },
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e4-6', source: '4', target: '6', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
];

let id = 7;
const getId = () => `${id++}`;

function ResourceModals({ activeResource, onClose }: { activeResource: string | null, onClose: () => void }) {
  if (!activeResource) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-8">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            {activeResource === 'prompts' && <Bot className="text-indigo-400 w-6 h-6" />}
            {activeResource === 'integrations' && <LinkIcon className="text-emerald-400 w-6 h-6" />}
            {activeResource === 'knowledge' && <FileText className="text-orange-400 w-6 h-6" />}
            {activeResource === 'contacts' && <Users className="text-sky-400 w-6 h-6" />}
            <h2 className="text-xl font-bold text-white capitalize">
              {activeResource === 'prompts' && 'AI Prompts & Scripts'}
              {activeResource === 'integrations' && 'Integrations & API Connections'}
              {activeResource === 'knowledge' && 'Knowledge Base & Documents'}
              {activeResource === 'contacts' && 'Contact Lists & Segments'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeResource === 'prompts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Script Library</h3>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Script
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="font-bold text-white mb-2">Outbound Sales Greeting {i}</h4>
                      <p className="text-sm text-white/50 line-clamp-2">"Hi, this is Sarah from Voice AI. I noticed you recently downloaded our guide on..."</p>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {activeResource === 'integrations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white">Asterisk v20</h4>
                      <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded uppercase">Connected</div>
                    </div>
                    <p className="text-sm text-white/50">Primary telephony node for AI voice generation and outbound dialing.</p>
                    <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors">Configure Settings</button>
                 </div>

                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white">HubSpot CRM</h4>
                      <div className="px-2 py-1 bg-white/10 text-white/50 text-[10px] font-bold rounded uppercase">Not Connected</div>
                    </div>
                    <p className="text-sm text-white/50">Sync contacts, notes, and call recordings automatically to your CRM.</p>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-colors">Connect with OAuth</button>
                 </div>

              </div>
            </div>
          )}

          {activeResource === 'knowledge' && (
            <div className="space-y-6 h-full flex flex-col">
              <div className="border-2 border-dashed border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-white/50" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upload Documents</h3>
                <p className="text-sm text-white/50 max-w-sm">Drag and drop PDFs, Text files, or URLs to train the AI on your specific business context.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Uploaded Files (2)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-orange-400" /> <span className="text-sm font-medium">Pricing_Sheet_2026.pdf</span></div>
                    <span className="text-xs text-white/40">Processed</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-orange-400" /> <span className="text-sm font-medium">FAQ_Customer_Support.docx</span></div>
                    <span className="text-xs text-white/40">Processed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeResource === 'contacts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Segments & Lists</h3>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Import CSV
                </button>
              </div>
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-white/70">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-bold text-white/50">
                    <tr><th className="p-4">List Name</th><th className="p-4">Records</th><th className="p-4">Last Updated</th><th className="p-4">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="p-4 font-medium text-white">Q3 Outbound Tech Leads</td>
                      <td className="p-4">18,423</td>
                      <td className="p-4">2 hours ago</td>
                      <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded font-bold uppercase">Ready</span></td>
                    </tr>
                    <tr className="hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="p-4 font-medium text-white">Lost Deals 2025 Re-engagement</td>
                      <td className="p-4">1,204</td>
                      <td className="p-4">3 days ago</td>
                      <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded font-bold uppercase">Ready</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function PipelineFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<string | null>(null);
  
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const dataStr = event.dataTransfer.getData('application/reactflow-data');

      if (typeof type === 'undefined' || !type || !dataStr) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const parsedData = JSON.parse(dataStr);
      const newNode = {
        id: getId(),
        type,
        position,
        data: parsedData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition],
  );

  const onNodeClick = useCallback((_: React.MouseEvent | undefined, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-full w-full bg-gradient-to-br from-[#536979] to-[#8C7672] font-sans overflow-hidden text-white relative">
      <SidebarLeft onResourceClick={(id) => setActiveResource(id)} />
      
      <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
        >
          <Background color="#ffffff" gap={24} size={2} style={{ opacity: 0.15 }} />
          <Controls className="bg-white/10 border-white/20 fill-white rounded-xl backdrop-blur-md" />
        </ReactFlow>

        <DialerPanel isOpen={isDialerOpen} onClose={() => setIsDialerOpen(false)} />
        
        <ResourceModals activeResource={activeResource} onClose={() => setActiveResource(null)} />
      </div>
      
      <SidebarRight 
        selectedNode={selectedNode} 
        onCallClick={() => setIsDialerOpen(true)} 
      />
    </div>
  );
}

export default function PipelinePage() {
  return (
    <div className="h-[calc(100vh-64px)] md:h-screen w-full pt-16 md:pt-0">
      <ReactFlowProvider>
        <PipelineFlow />
      </ReactFlowProvider>
    </div>
  );
}
