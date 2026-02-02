import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Generate more complex graph data for the "Entity Network"
const genGraphData = (N = 25) => {
    const nodes = [...Array(N).keys()].map(i => ({
        id: i,
        label: i === 0 ? 'TARGET' : `NODE_${i}`,
        val: Math.random() * 5 + 2, // Size
        group: i === 0 ? 0 : Math.floor(Math.random() * 3) + 1 // Color group
    }));

    const links = [];
    for (let i = 0; i < N; i++) {
        // Connect to center or random
        if (i > 0) {
            links.push({
                source: i,
                target: Math.random() > 0.7 ? 0 : Math.floor(Math.random() * i)
            });
            // Random extra links for density
            if (Math.random() > 0.8) {
                links.push({
                    source: i,
                    target: Math.floor(Math.random() * N)
                });
            }
        }
    }

    return { nodes, links };
};

export const HexGraph: React.FC = () => {
    const fgRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState({ nodes: [], links: [] });
    const [dimensions, setDimensions] = useState({ width: 400, height: 256 });

    useEffect(() => {
        // @ts-ignore
        setData(genGraphData(35));

        // Measure container size once on mount
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        }

        // Resize handler
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-64 overflow-hidden rounded bg-black/20 border border-white/5 flex items-center justify-center group"
        >
            {/* Background Hex Pattern (Static) */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <svg className="w-full h-full">
                    <pattern id="hex-bg" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                        <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hex-bg)" />
                </svg>
            </div>

            {/* Interactive Graph */}
            <div className="absolute inset-0 z-10">
                <ForceGraph2D
                    ref={fgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={data}
                    backgroundColor="rgba(0,0,0,0)"
                    nodeRelSize={4}
                    // @ts-ignore
                    nodeVal={node => node.val}

                    // Custom Canvas Rendering for "Cyber" look
                    nodeCanvasObject={(node: any, ctx) => {
                        // const label = node.label;
                        // const fontSize = 12 / globalScale;
                        const color = node.group === 0 ? '#ffffff' : (node.group === 1 ? '#22d3ee' : '#06b6d4');

                        // Outer Glow
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 10;
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
                        ctx.fillStyle = color;
                        ctx.fill();

                        // Reset shadow
                        ctx.shadowBlur = 0;

                        // Core
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, 1.5, 0, 2 * Math.PI, false);
                        ctx.fillStyle = '#000';
                        ctx.fill();
                    }}
                    linkColor={() => '#22d3ee'}
                    linkWidth={0.5}
                    linkDirectionalParticles={1}
                    linkDirectionalParticleWidth={1.5}
                    linkDirectionalParticleSpeed={0.005}
                    cooldownTicks={100}
                    onEngineStop={() => fgRef.current?.zoomToFit(50, 20)}
                />
            </div>

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 pointer-events-none z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-mono text-emerald-400">LIVE TRACKING</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded text-[10px] text-gray-400 font-mono pointer-events-none z-20">
                NODES: {data.nodes.length} | LINKS: {data.links.length}
            </div>
        </div>
    );
};
