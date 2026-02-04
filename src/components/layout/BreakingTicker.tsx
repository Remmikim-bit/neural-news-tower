import React from 'react';

export const BreakingTicker: React.FC<{ items: string[] }> = ({ items }) => (
    <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex whitespace-nowrap animate-marquee group">
                {[...items, ...items].map((item, idx) => (
                    <span key={idx} className="text-xs font-medium tracking-tight mx-12 flex items-center">
                        <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded mr-3">
                            BREAKING
                        </span>
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    </div>
);
