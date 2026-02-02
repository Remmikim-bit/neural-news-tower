import React from 'react';

const BREAKING_NEWS = [
    "BREAKING: AI Regulation Bill Passes Senate Committee with 85% Approval",
    "MARKET ALERT: Tech Stocks Rally as Semiconductor Shortage Eases",
    "GLOBAL: Energy Summit Ends with Historic Carbon Neutrality Agreement",
    "TECH: Neural News Platform Launches Beta for Political Bias Analysis",
    "ELECTION: Latest Polls Show Tight Race in Swing States"
];

export const Ticker: React.FC = () => {
    return (
        <div className="w-full bg-black/80 border-b border-bloomberg-border overflow-hidden py-2 flex items-center h-10">
            <div className="bg-bloomberg-neon/20 px-4 py-1 text-xs font-bold text-bloomberg-neon uppercase tracking-wider h-full flex items-center z-10 shrink-0">
                Live Wire
            </div>
            <div className="relative flex overflow-x-hidden w-full group">
                <div className="animate-marquee whitespace-nowrap flex space-x-12 px-4 hover:[animation-play-state:paused]">
                    {[...BREAKING_NEWS, ...BREAKING_NEWS].map((news, i) => (
                        <span key={i} className="text-sm font-medium text-gray-300 flex items-center">
                            <span className="w-1.5 h-1.5 bg-bloomberg-neon rounded-full mr-3 animate-pulse"></span>
                            {news}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
