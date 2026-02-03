import React, { useState } from 'react';
import { ChevronLeft, Clock, Share2, Bookmark, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import type { EventPhase } from '../types';
import { mockEvents } from '../data/mockEvents';

interface EventDetailProps {
    eventId: string;
    onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ eventId, onBack }) => {
    const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];
    const [selectedPhase, setSelectedPhase] = useState<string>(event.phases[0]?.id || '');

    const activePhase = event.phases.find((p: EventPhase) => p.id === selectedPhase) || event.phases[0];

    return (
        <div className="min-h-screen bg-[#0f1115] pb-20">
            {/* Hero Header */}
            <div className="relative h-[40vh] overflow-hidden">
                <img
                    src={event.imageUrl}
                    className="w-full h-full object-cover"
                    alt={event.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest"
                    >
                        <ChevronLeft size={18} /> 사건 목록으로
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                            {event.status}
                        </span>
                        <span className="text-white/60 text-xs font-mono">
                            시작일: {event.startDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-serif leading-tight">
                        {event.title}
                    </h1>
                    <p className="text-white/80 text-lg max-w-3xl font-serif italic">
                        {event.summary}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Sidebar: Timeline */}
                <div className="lg:col-span-3">
                    <div className="sticky top-24">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                            Timeline Updates
                        </h3>
                        <div className="space-y-0 relative">
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

                            {event.phases.map((phase: EventPhase) => (
                                <div
                                    key={phase.id}
                                    onClick={() => setSelectedPhase(phase.id)}
                                    className={`relative pl-8 pb-8 cursor-pointer group`}
                                >
                                    <div className={`absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-4 bg-white dark:bg-slate-900 z-10 transition-all ${selectedPhase === phase.id
                                        ? 'border-blue-600 scale-110 shadow-lg shadow-blue-500/20'
                                        : 'border-slate-200 dark:border-slate-800 group-hover:border-slate-400'
                                        }`}></div>

                                    <div className={`transition-all ${selectedPhase === phase.id ? 'translate-x-1' : ''}`}>
                                        <span className="text-[10px] font-mono text-slate-500 mb-1 block">
                                            {phase.date}
                                        </span>
                                        <h4 className={`text-sm font-bold leading-tight ${selectedPhase === phase.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-gray-400'
                                            }`}>
                                            {phase.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area: Detailed View */}
                <div className="lg:col-span-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/5 animate-in slide-in-from-right-4 duration-500">
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-serif">
                                        {activePhase.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5 font-bold">
                                            <Clock size={16} /> {activePhase.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <CheckCircle2 size={16} className="text-green-500" /> AI Verified
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-blue-600 transition-colors">
                                        <Share2 size={18} />
                                    </button>
                                    <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-blue-600 transition-colors">
                                        <Bookmark size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {activePhase.contentMarkdown.split('\n').map((line: string, idx: number) => {
                                    if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold mt-8 mb-4">{line.replace('### ', '')}</h3>;
                                    if (line.startsWith('**')) return <p key={idx} className="font-bold my-4">{line.replace(/\*\*/g, '')}</p>;
                                    if (line.trim().startsWith('- ')) return <li key={idx} className="ml-4 list-disc my-1 text-slate-600 dark:text-gray-400">{line.replace('- ', '')}</li>;
                                    return <p key={idx} className="text-slate-700 dark:text-gray-300 leading-relaxed text-lg mb-6">{line}</p>;
                                })}
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                    관련 증빙 기사 ({activePhase.relatedArticles.length})
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activePhase.relatedArticles.map((artId: string) => (
                                        <div
                                            key={artId}
                                            className="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                                        >
                                            <span className="text-[9px] text-blue-600 font-bold uppercase mb-1 block">Article ID: {artId}</span>
                                            <h5 className="font-bold text-slate-800 dark:text-gray-200 text-sm group-hover:text-blue-600 leading-snug">
                                                해당 단계의 근거자료로 활용된 기사입니다.
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Entities & Metadata */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase mb-4 tracking-wider">
                            관련 인물 및 조직
                        </h3>
                        <div className="space-y-3">
                            {event.relatedEntities.map((ent: string) => (
                                <div
                                    key={ent}
                                    className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {ent[0]}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 dark:text-gray-300 group-hover:text-blue-600">
                                            {ent}
                                        </span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare size={20} />
                            <h3 className="font-bold">사건 분석 노트</h3>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                            AI가 분석한 이 사건의 핵심 쟁점은 "초기 대응의 투명성"입니다. 관련 인물들의 교차 검증을 통해 더 많은 정보를 확인하세요.
                        </p>
                        <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                            리포트 다운로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
