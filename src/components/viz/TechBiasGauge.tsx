import React from 'react';

interface Props {
    value: number;
}

export const TechBiasGauge: React.FC<Props> = ({ value }) => {
    // Precision Arc Gauge
    return (
        <div className="relative flex flex-col items-center justify-center py-6">
            <div className="relative w-56 h-28 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 220 110">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f43f5e" /> {/* Left - Red */}
                            <stop offset="50%" stopColor="#64748b" /> {/* Center - Gray */}
                            <stop offset="100%" stopColor="#06b6d4" /> {/* Right - Cyan */}
                        </linearGradient>
                    </defs>

                    {/* Ticks */}
                    {Array.from({ length: 41 }).map((_, i) => {
                        const deg = 180 + (i * 4.5);
                        const isMajor = i % 10 === 0;
                        return (
                            <line
                                key={i}
                                x1={110 + 90 * Math.cos(deg * Math.PI / 180)}
                                y1={100 + 90 * Math.sin(deg * Math.PI / 180)}
                                x2={110 + (isMajor ? 80 : 85) * Math.cos(deg * Math.PI / 180)}
                                y2={100 + (isMajor ? 80 : 85) * Math.sin(deg * Math.PI / 180)}
                                stroke={isMajor ? "#555" : "#333"}
                                strokeWidth={isMajor ? 2 : 1}
                            />
                        );
                    })}

                    {/* Main Arc */}
                    <path d="M 20 100 A 90 90 0 0 1 200 100" fill="none" stroke="#222" strokeWidth="2" />

                    {/* Active Arc (Dynamic) */}
                    <path
                        d={`M 20 100 A 90 90 0 0 1 ${110 - 90 * Math.cos(value / 100 * Math.PI)} ${100 - 90 * Math.sin(value / 100 * Math.PI)}`}
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />

                    {/* Needle */}
                    <g className="transition-all duration-1000 ease-out" style={{ transform: `rotate(${(value / 100 * 180) - 90}deg)`, transformOrigin: '110px 100px' }}>
                        <polygon points="110,20 106,100 114,100" fill="white" />
                        <circle cx="110" cy="100" r="4" fill="white" />
                    </g>
                </svg>

                {/* Decorative Grid behind gauge */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_at_bottom,black_40%,transparent_70%)] pointer-events-none"></div>
            </div>

            <div className="flex items-center gap-6 mt-2">
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-mono tracking-widest">BIAS SCORE</div>
                    <div className="text-3xl font-bold text-white font-mono tracking-tighter">{value.toFixed(1)}</div>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <div className="text-left">
                    <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Right Leaning</div>
                    <div className="text-[10px] text-gray-500">Confidence: 94%</div>
                </div>
            </div>
        </div>
    );
};
