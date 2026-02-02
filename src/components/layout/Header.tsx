import React from 'react';
import { Search, Globe, Activity, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-bloomberg-border">
            <div className="flex items-center space-x-3">
                <Globe className="w-8 h-8 text-bloomberg-neon animate-pulse" />
                <h1 className="text-2xl font-bold tracking-tighter">
                    <span className="text-white">NEURAL</span>
                    <span className="text-bloomberg-neon">NEWS</span>
                </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-12">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search Intelligence Database..."
                        className="w-full bg-black/40 border border-bloomberg-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-bloomberg-neon focus:ring-1 focus:ring-bloomberg-neon transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-bloomberg-neon" />
                </div>
            </div>

            <div className="flex items-center space-x-6 text-xs font-mono">
                <div className="flex items-center space-x-2 text-bloomberg-success">
                    <TrendingUp className="w-4 h-4" />
                    <span>USD/KRW 1,324.50 ▲ 0.2%</span>
                </div>
                <div className="flex items-center space-x-2 text-bloomberg-danger">
                    <Activity className="w-4 h-4" />
                    <span>NASDAQ 14,890.30 ▼ 1.1%</span>
                </div>
                <div className="text-gray-400">
                    {new Date().toISOString().split('T')[0]} <span className="text-bloomberg-neon">{new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </header>
    );
};
