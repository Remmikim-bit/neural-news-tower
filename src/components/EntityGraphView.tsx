import React, { useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { X, Search } from 'lucide-react';
import { mockEntities, mockRelationships } from '../data/mockEntities';
import { transformToGraphData } from '../lib/graphUtils';
import type { GraphNode } from '../types';

interface EntityGraphViewProps {
    onBack: () => void;
    onNodeClick?: (node: any) => void;
}

const EntityGraphView: React.FC<EntityGraphViewProps> = ({ onBack, onNodeClick }) => {
    const data = useMemo(() => transformToGraphData(mockEntities, mockRelationships), []);

    const handleNodeClick = useCallback((node: any) => {
        console.log('Node clicked:', node);
        if (onNodeClick) onNodeClick(node);
    }, [onNodeClick]);

    return (
        <div className="fixed inset-0 bg-[#0f1115] z-[100] flex flex-col animate-in fade-in duration-500">
            {/* Overlay Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none z-10">
                <div className="pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all shadow-xl"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-sm shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-2 font-serif">Entity Relationship Graph</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        뉴스에 등장하는 인물과 조직 간의 관계를 시각화합니다.
                        노드의 크기는 등장 빈도를, 선의 두께는 연관 강도를 의미합니다.
                    </p>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold">인물</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold">조직</span>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="엔티티 검색..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Graph Area */}
            <div className="flex-1 cursor-grab active:cursor-grabbing">
                <ForceGraph2D
                    graphData={data}
                    nodeLabel={(node: any) => node.name}
                    nodeColor={(node: any) => (node as GraphNode).color || '#fff'}
                    nodeRelSize={4}
                    nodeVal={(node: any) => (node as GraphNode).val}
                    linkWidth={(link: any) => link.width || 1}
                    linkColor={() => 'rgba(255, 255, 255, 0.15)'}
                    onNodeClick={handleNodeClick}
                    backgroundColor="#0f1115"
                    nodeCanvasObject={(node: any, ctx, globalScale) => {
                        const label = node.name;
                        const fontSize = 12 / globalScale;
                        ctx.font = `${fontSize}px Inter, sans-serif`;
                        const textWidth = ctx.measureText(label).width;

                        // Draw Node
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, (node as GraphNode).val, 0, 2 * Math.PI, false);
                        ctx.fillStyle = (node as GraphNode).color || '#fff';
                        ctx.fill();

                        // Subtle glow
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = (node as GraphNode).color || '#fff';

                        // Draw Label
                        if (globalScale > 1.5) {
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                            ctx.fillText(label, node.x - textWidth / 2, node.y + (node as GraphNode).val + fontSize + 2);
                        }
                    }}
                />
            </div>

            {/* Legend / Feedback */}
            <div className="absolute bottom-6 left-6 pointer-events-none">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg pointer-events-auto">
                    <p className="text-[10px] text-gray-500 font-mono">
                        {data.nodes.length} Nodes | {data.links.length} Links
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EntityGraphView;
