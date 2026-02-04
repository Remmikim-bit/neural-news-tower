import React from 'react';
import { TrendingUp, Clock, ArrowDownNarrowWide as SortDesc, ChevronRight } from 'lucide-react';
import type { NewsArticle, TrendKeyword } from '../../types';
import { SortOption } from '../../types';
import { CONFIG, TEXT } from '../../config/constants';

interface NewsFeedProps {
    articles: NewsArticle[];
    onSelectArticle: (article: NewsArticle) => void;
    onTrendClick: (keyword: string) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    onSelectEvent: (eventId: string) => void;
    trendData: TrendKeyword[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onSelectArticle, onTrendClick, sortBy, onSortChange, onSelectEvent, trendData }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
                {/* Recently Updated Events */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
                        Recently Updated
                    </h3>

                    {/* Mock Event 1 */}
                    <div className="bg-[#1e1e1e] border border-white/5 p-5 rounded-xl shadow-lg cursor-pointer hover:border-blue-500/50 transition-all group" onClick={() => onSelectEvent('ev-sewol-2014')}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30">
                                BREAKING
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock size={10} /> 10m ago
                            </span>
                        </div>
                        <h4 className="text-white font-bold mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                            세월호 참사: 진상규명 보고서 공개 및 새로운 증거 발견
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3">
                            <span>관련 기사 12건</span>
                            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                                View Timeline <ChevronRight size={10} />
                            </span>
                        </div>
                    </div>

                    {/* Mock Event 2 */}
                    <div className="bg-[#1e1e1e] border border-white/5 p-5 rounded-xl shadow-lg cursor-pointer hover:border-blue-500/50 transition-all group">
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                                ONGOING
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock size={10} /> 2h ago
                            </span>
                        </div>
                        <h4 className="text-white font-bold mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                            2026 지방선거: 서울시장 후보 토론회 생중계 요약
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3">
                            <span>관련 기사 8건</span>
                            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                                View Timeline <ChevronRight size={10} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={18} className="text-red-600" />
                        <h3 className="font-bold text-slate-900 dark:text-white">{TEXT.trendKeyword}</h3>
                    </div>
                    <ul className="space-y-3">
                        {trendData.map((item, idx) => (
                            <li
                                key={idx}
                                className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-1 rounded transition-all"
                                onClick={() => onTrendClick(item.text)}
                            >
                                <span className="font-bold text-gray-400 w-6">0{item.rank}</span>
                                <span className="flex-1 font-medium text-gray-700 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">{item.text}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.changeAmount && item.changeAmount > 0 ? 'text-red-600 bg-red-50 dark:bg-red-900/30' : item.changeAmount && item.changeAmount < 0 ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 bg-gray-100 dark:bg-slate-700'}`}>
                                    {item.changeAmount && item.changeAmount > 0 ? `+${item.changeAmount}` : item.changeAmount && item.changeAmount < 0 ? item.changeAmount : '—'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded text-center">
                    <h3 className="font-serif text-xl font-bold mb-2">Subscribe to Neural News</h3>
                    <p className="text-xs text-gray-400 mb-4">Get bias-free analysis delivered to your inbox.</p>
                    <input type="email" placeholder="Email address" className="w-full bg-slate-800 border-none text-sm px-3 py-2 rounded mb-2 text-white" />
                    <button className="w-full bg-white text-slate-900 font-bold text-xs py-2 rounded hover:bg-gray-200 transition">JOIN NOW</button>
                </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-9 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 dark:border-slate-800 pb-2 mb-4">
                    <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white uppercase tracking-tight">Top Stories</h2>
                    <div className="flex items-center gap-2">
                        <SortDesc size={16} className="text-gray-500" />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value as SortOption)}
                            className="text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded px-2 py-1 cursor-pointer hover:border-gray-400 transition-colors"
                        >
                            <option value={SortOption.IMPACT}>{TEXT.sortByImpact}</option>
                            <option value={SortOption.DATE}>{TEXT.sortByDate}</option>
                            <option value={SortOption.POPULARITY}>{TEXT.sortByPopularity}</option>
                        </select>
                    </div>
                </div>

                {/* Hero Card */}
                {articles.length > 0 && (
                    <div
                        onClick={() => onSelectArticle(articles[0])}
                        className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-gray-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="overflow-hidden rounded-lg aspect-video md:aspect-auto border border-gray-100 dark:border-slate-700/50">
                            <img src={articles[0].imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Headline" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-blue-700 dark:text-blue-400 font-black text-[10px] tracking-widest uppercase mb-3 block">{articles[0].category}</span>
                            <h2 className={`text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight ${CONFIG.theme.fontSerif}`}>
                                {articles[0].title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                {articles[0].summary}
                            </p>
                            <div className="mt-auto flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                <span>{articles[0].source}</span>
                                <span className="mx-2 opacity-30">•</span>
                                <span>{articles[0].timestamp}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.slice(1).map((article) => (
                        <div
                            key={article.id}
                            onClick={() => onSelectArticle(article)}
                            className="group cursor-pointer bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-slate-800 p-6 rounded-xl hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-[9px] font-black bg-gray-100 dark:bg-slate-700/50 px-2 py-1 rounded text-blue-700 dark:text-blue-400 uppercase tracking-widest">{article.category}</span>
                            </div>
                            <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors ${CONFIG.theme.fontSerif}`}>
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
                                {article.summary}
                            </p>
                            <div className="pt-5 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{article.source}</span>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
