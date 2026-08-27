'use client';

import React, { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 100 }, data: { label: 'Source files' } },
  { id: '2', position: { x: 250, y: 250 }, data: { label: 'Find ICP accounts' } },
];
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

export default function PipelinePage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="flex h-full w-full bg-slate-950">
      {/* Left Sidebar placeholder */}
      <div className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-4 hidden lg:block">
        <h2 className="text-white font-semibold mb-4">Workflow Nodes</h2>
        <div className="p-3 bg-slate-800 rounded-lg text-slate-300 text-sm mb-2 cursor-pointer hover:bg-slate-700">Source files</div>
        <div className="p-3 bg-slate-800 rounded-lg text-slate-300 text-sm mb-2 cursor-pointer hover:bg-slate-700">Phone Call</div>
        <div className="p-3 bg-slate-800 rounded-lg text-slate-300 text-sm mb-2 cursor-pointer hover:bg-slate-700">WhatsApp Message</div>
      </div>

      {/* Canvas */}
      <div className="flex-1 h-[calc(100vh-64px)] relative">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          colorMode="dark"
        >
          <Background color="#334155" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
      
      {/* Right Sidebar placeholder */}
      <div className="w-80 bg-slate-900/50 backdrop-blur-xl border-l border-white/10 p-4 hidden xl:block">
        <h2 className="text-white font-semibold mb-4">Properties</h2>
        <p className="text-slate-400 text-sm">Select a node to configure settings.</p>
      </div>
    </div>
  );
}
