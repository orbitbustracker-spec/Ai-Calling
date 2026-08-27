'use client';

import React, { useState, useCallback, useRef } from 'react';
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
  { id: '1', type: 'custom', position: { x: 250, y: 100 }, data: { label: 'Source files', icon: 'source', color: 'blue', type: 'trigger', sublabel: 'Upload data' } },
  { id: '2', type: 'custom', position: { x: 250, y: 300 }, data: { label: 'Phone Call', icon: 'phone', color: 'green', hasToggle: true, sublabel: 'AI Voice Agent' } },
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }
];

let id = 3;
const getId = () => `${id++}`;

function PipelineFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDialerOpen, setIsDialerOpen] = useState(false);
  
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

  const onNodeClick = useCallback((_, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-full w-full bg-slate-950 font-sans overflow-hidden text-white relative">
      <SidebarLeft />
      
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
          <Background color="#334155" gap={20} size={1.5} />
          <Controls className="bg-slate-900 border-white/10 fill-white" />
        </ReactFlow>

        <DialerPanel isOpen={isDialerOpen} onClose={() => setIsDialerOpen(false)} />
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
    <div className="h-[calc(100vh-64px)] md:h-screen w-full bg-slate-950 pt-16 md:pt-0">
      <ReactFlowProvider>
        <PipelineFlow />
      </ReactFlowProvider>
    </div>
  );
}
