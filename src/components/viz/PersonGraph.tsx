import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Mock Data for the Graph
const genRandomTree = (N = 30) => {
    return {
        nodes: [...Array(N).keys()].map(i => ({
            id: i,
            val: Math.random() * 20, // Size
            group: Math.floor(Math.random() * 3) // Color group
        })),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                source: id,
                target: Math.round(Math.random() * (id - 1))
            }))
    };
};

export const PersonGraph: React.FC = () => {
    const fgRef = useRef<any>(null);
    const [data, setData] = useState({ nodes: [], links: [] });

    useEffect(() => {
        // @ts-ignore
        setData(genRandomTree(40));
    }, []);

    return (
        <div className="w-full h-full relative bg-bloomberg-bg overflow-hidden glass-panel">
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-bloomberg-neon font-bold text-sm">RELATIONSHIP GRAPH</h3>
                <p className="text-[10px] text-gray-500">PEOPLE OF INTEREST NETWORK</p>
            </div>
            <ForceGraph2D
                ref={fgRef}
                graphData={data}
                backgroundColor="#0a0a0a"
                nodeRelSize={6}
                nodeVal={(node: any) => node.val}
                nodeLabel="id"
                nodeColor={(node: any) => {
                    const colors = ['#00f2ff', '#ff0033', '#ffffff'];
                    // @ts-ignore
                    return colors[node.group % colors.length];
                }}
                linkColor={() => 'rgba(255, 255, 255, 0.2)'}
                linkWidth={1}
                cooldownTicks={100}
                onEngineStop={() => fgRef.current?.zoomToFit(400)}
            />
        </div>
    );
};
