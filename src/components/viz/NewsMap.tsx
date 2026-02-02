import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

export const NewsMap: React.FC = () => {
    const globeEl = useRef<any>(null);
    const [points, setPoints] = useState<any[]>([]);

    useEffect(() => {
        // Mock points data
        const gData = [...Array(20).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: Math.random() / 3,
            color: Math.random() > 0.5 ? '#00f2ff' : '#ff0033'
        }));
        setPoints(gData);
    }, []);

    return (
        <div className="w-full h-full relative bg-bloomberg-bg overflow-hidden glass-panel flex items-center justify-center">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-bloomberg-neon font-bold text-sm">GEOSPATIAL INTEL</h3>
                <p className="text-[10px] text-gray-500">LIVE HEATMAP</p>
            </div>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pointsData={points}
                pointAltitude="size"
                pointColor="color"
                pointRadius={0.5}
                pointsMerge={true}
                animateIn={true}
                backgroundColor="rgba(0,0,0,0)"
                width={400} // Temporary fixed size
                height={400}
            />
        </div>
    );
};
