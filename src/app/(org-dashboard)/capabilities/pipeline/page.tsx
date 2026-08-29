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

import { ResourceModals } from '@/components/pipeline/ResourceModals';

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
    <div className="flex h-full w-full bg-transparent font-sans overflow-hidden text-slate-900 dark:text-white relative rounded-2xl shadow-sm dark:shadow-none">
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
        activeResource={activeResource}
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
