import React, { useState, useEffect } from 'react';
import { X, Share2, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { mockGenerateReport } from '../../lib/ai-workflow';
import type { GeneratedReport } from '../../lib/ai-workflow';

interface Props {
    topic: string;
    onClose: () => void;
}

export const DeepDiveReport: React.FC<Props> = ({ topic, onClose }) => {
    const [report, setReport] = useState<GeneratedReport | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        mockGenerateReport({ topic, sources: [] }).then(data => {
            setReport(data);
            setLoading(false);
        });
    }, [topic]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl h-[85vh] glass-panel flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-bloomberg-neon/20 text-bloomberg-neon px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded">
                                AI NEUTRALIZED
                            </span>
                            <span className="text-gray-500 text-xs flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> VERIFIED SOURCES
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">{loading ? 'Analyzing Intelligence...' : report?.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Share2 className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Download className="w-4 h-4" /></button>
                        <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 font-serif leading-relaxed text-gray-200">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="w-16 h-16 border-4 border-bloomberg-neon border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-bloomberg-neon animate-pulse font-mono text-sm">SYNTHESIZING MULTI-PERSPECTIVE DATA...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert max-w-none">
                            <div className="whitespace-pre-wrap font-sans text-sm">
                                {report?.neutralAnalysis}
                            </div>

                            <div className="mt-12 pt-6 border-t border-white/10">
                                <h3 className="text-sm font-bold text-gray-400 mb-4">REFERENCED INTELLIGENCE</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {report?.sources.map((source, i) => (
                                        <a key={i} href={source.url} className="block p-3 border border-white/10 rounded hover:border-bloomberg-neon hover:bg-white/5 transition-all group">
                                            <div className="text-xs text-gray-500 mb-1">SOURCE {i + 1}</div>
                                            <div className="text-sm font-medium text-bloomberg-neon flex items-center gap-2">
                                                {source.title} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
