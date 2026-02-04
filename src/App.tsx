import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, Search, X, ChevronRight, Share2, TrendingUp, Clock,
  ArrowDownNarrowWide as SortDesc, Sun, Moon
} from 'lucide-react';
import type { NewsArticle, TrendKeyword } from './types.ts';
import { ArticleCategory, SortOption } from './types.ts';
import { TREND_KEYWORDS } from './data/mockNews.ts';
import EntityGraphView from './components/EntityGraphView';
import EventDetail from './components/EventDetail';

type ViewType = 'feed' | 'event' | 'graph';

/**
 * ==============================================================================
 * [System Configuration]
 * ==============================================================================
 */

const CONFIG = {
  currentLang: 'ko',
  theme: {
    fontSerif: 'font-serif',
    fontSans: 'font-sans',
  }
};

const LABELS = {
  ko: {
    siteTitle: "NEURAL NEWS",
    siteSubtitle: "Veritas Vincit",
    nav: ["정치", "경제", "기술", "세계", "오피니언", "과학", "문화", "환경"],
    biasScore: "미디어 편향 지수",
    trendKeyword: "실시간 트렌드",
    tickerLabel: "속보",
    sourceCheck: "출처 검증됨",
    mapLabel: "관련 지역",
    networkLabel: "엔티티 관계도",
    biasLeft: "진보 성향",
    biasRight: "보수 성향",
    biasCenter: "중립",
    backToList: "목록으로 돌아가기",
    search: "검색",
    searchPlaceholder: "뉴스 검색...",
    close: "닫기",
    bookmark: "북마크",
    share: "공유",
    print: "인쇄",
    subscribe: "구독하기",
    perspectives: "언론사별 시각",
    linkCopied: "링크가 복사되었습니다",
    joinNow: "가입하기",
    filter: "필터",
    sort: "정렬",
    allCategories: "전체",
    sortByImpact: "영향력순",
    sortByDate: "최신순",
    sortByPopularity: "인기순",
    bookmarked: "북마크됨",
  },
  en: {
    siteTitle: "NEURAL NEWS",
    siteSubtitle: "Veritas Vincit",
    nav: ["Politics", "Economy", "Tech", "World", "Opinion", "Science", "Culture", "Environment"],
    biasScore: "Media Bias Index",
    trendKeyword: "Trending Now",
    tickerLabel: "BREAKING",
    sourceCheck: "Verified Sources",
    mapLabel: "Geospatial Context",
    networkLabel: "Entity Network",
    biasLeft: "Left Leaning",
    biasRight: "Right Leaning",
    biasCenter: "Center",
    backToList: "Back to Feed",
    search: "Search",
    searchPlaceholder: "Search news...",
    close: "Close",
    bookmark: "Bookmark",
    share: "Share",
    print: "Print",
    subscribe: "Subscribe",
    perspectives: "Perspectives",
    linkCopied: "Link copied",
    subscribeEmail: "Email address",
    joinNow: "JOIN NOW",
    filter: "Filter",
    sort: "Sort",
    allCategories: "All",
    sortByImpact: "Impact",
    sortByDate: "Latest",
    sortByPopularity: "Popular",
    bookmarked: "Bookmarked",
  }
};

const TEXT = LABELS[CONFIG.currentLang as keyof typeof LABELS] || LABELS.en;


// Category mapping
const CATEGORY_MAP: Record<string, ArticleCategory> = {
  "정치": ArticleCategory.POLITICS,
  "경제": ArticleCategory.ECONOMY,
  "기술": ArticleCategory.TECH,
  "세계": ArticleCategory.WORLD,
  "오피니언": ArticleCategory.OPINION,
  "과학": ArticleCategory.SCIENCE,
  "문화": ArticleCategory.CULTURE,
  "환경": ArticleCategory.ENVIRONMENT,
};

/**
 * ==============================================================================
 * [Helper Components]
 * ==============================================================================
 */

// Bias Meter (exported for use in EventDetail)
export const BiasMeter = ({ score }: { score: number }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-1 tracking-wider">
        <span>{TEXT.biasLeft}</span>
        <span>{TEXT.biasCenter}</span>
        <span>{TEXT.biasRight}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-gray-100 to-red-200 opacity-50"></div>
        <div
          className={`absolute top - 0 bottom - 0 w - 1 transition - all duration - 500 ease - out ${score < 40 ? 'bg-blue-600' : score > 60 ? 'bg-red-600' : 'bg-gray-600'} `}
          style={{ left: `${score}% ` }}
        ></div>
      </div>
      <div className="text-center mt-1 text-xs font-serif font-bold text-gray-700">
        Score: {score} / 100
      </div>
    </div>
  );
};

// Markdown Viewer (exported for use in EventDetail)
export const MarkdownViewer = ({ content }: { content: string }) => {
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-slate-900 font-serif">{line.replace('### ', '')}</h3>;
    if (line.startsWith('#### ')) return <h4 key={index} className="text-lg font-bold mt-4 mb-2 text-slate-800 font-serif">{line.replace('#### ', '')}</h4>;
    if (line.trim().startsWith('* ')) return <li key={index} className="ml-4 list-disc text-gray-700 my-1">{line.replace('* ', '')}</li>;
    if (line.trim().startsWith('1. ')) return <li key={index} className="ml-4 list-decimal text-gray-700 my-1">{line.replace(/^\d+\. /, '')}</li>;
    if (line.trim() === '') return <br key={index} />;

    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed text-base md:text-lg">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <div className="article-content">
      {content.split('\n').map((line, idx) => renderLine(line, idx))}
    </div>
  );
};

// World Map (exported for use in EventDetail)
export const WorldMap = ({ highlights }: { highlights: string[] }) => {
  const getFill = (code: string) => highlights.includes(code) ? "#3b82f6" : "#e5e7eb";

  return (
    <div className="w-full aspect-[2/1] bg-blue-50/30 rounded border border-gray-100 relative overflow-hidden">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        <rect width="800" height="400" fill="transparent" />
        <path d="M 50 50 L 250 50 L 200 150 L 100 120 Z" fill={getFill('US')} stroke="white" strokeWidth="1" />
        <path d="M 180 160 L 280 160 L 250 350 L 180 250 Z" fill={getFill('BR')} stroke="white" strokeWidth="1" />
        <path d="M 380 60 L 500 60 L 480 120 L 380 120 Z" fill={getFill('EU')} stroke="white" strokeWidth="1" />
        <path d="M 510 60 L 700 60 L 720 150 L 550 180 Z" fill={getFill('KR')} stroke="white" strokeWidth="1" />
        <path d="M 450 130 L 530 130 L 520 180 L 460 170 Z" fill={getFill('IR')} stroke="white" strokeWidth="1" />
        <path d="M 380 140 L 480 140 L 450 300 L 390 250 Z" fill={getFill('ZA')} stroke="white" strokeWidth="1" />
        {highlights.includes('US') && <text x="150" y="100" fontSize="12" fill="black" fontWeight="bold">USA</text>}
        {highlights.includes('KR') && <text x="620" y="110" fontSize="12" fill="black" fontWeight="bold">KOREA</text>}
        {highlights.includes('EU') && <text x="430" y="90" fontSize="12" fill="black" fontWeight="bold">EUROPE</text>}
        {highlights.includes('IR') && <text x="490" y="160" fontSize="12" fill="black" fontWeight="bold">M.EAST</text>}
      </svg>
      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 text-[10px] text-gray-500 border border-gray-200">
        Interactive Vector Map
      </div>
    </div>
  );
};

// Entity Network Placeholder (exported for use in EventDetail)
export const EntityNetworkBlock = () => {
  return (
    <div className="w-full h-64 bg-slate-50 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
        {[...Array(36)].map((_, i) => <div key={i} className="border border-slate-300"></div>)}
      </div>
      <div className="text-center z-10 p-4">
        <div className="inline-block p-3 rounded-full bg-slate-200 mb-3 text-slate-500">
          <Share2 size={24} />
        </div>
        <h4 className="font-bold text-slate-700 mb-1">{TEXT.networkLabel}</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mb-2">
          인물, 조직, 사건 간의 관계도를 시각화하는 모듈입니다.
        </p>
        <div className="text-[10px] font-mono text-left bg-gray-800 text-green-400 p-2 rounded w-full max-w-sm mx-auto mt-2">
          <code>
            // TODO: Implement Force-Directed Graph<br />
            // 1. Fetch D3.js or React-Force-Graph<br />
            // 2. Parse entities from article.entities<br />
            // 3. Render nodes/links with physics engine<br />
            // Note: Keep lightweight for mobile.
          </code>
        </div>
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * [Page Components]
 * ==============================================================================
 */

// Breaking Ticker
const BreakingTicker: React.FC<{ items: string[] }> = ({ items }) => (
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

// Search Modal
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">{TEXT.search}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={TEXT.searchPlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              autoFocus
            />
          </form>
          <div className="mt-4 text-sm text-gray-500">
            <p>팁: 키워드, 카테고리, 출처 등으로 검색할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Menu
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: ArticleCategory | null) => void;
  activeCategory: ArticleCategory | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onCategorySelect, activeCategory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div
        className="bg-white w-80 h-full shadow-2xl animate-in slide-in-from-left duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-serif">{TEXT.siteTitle}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black">
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => { onCategorySelect(null); onClose(); }}
              className={`w - full text - left px - 4 py - 3 rounded font - bold transition - colors ${activeCategory === null ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                } `}
            >
              {TEXT.allCategories}
            </button>
            {TEXT.nav.map((item, idx) => {
              const category = CATEGORY_MAP[item];
              return (
                <button
                  key={idx}
                  onClick={() => { onCategorySelect(category); onClose(); }}
                  className={`w - full text - left px - 4 py - 3 rounded font - bold transition - colors ${activeCategory === category ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                    } `}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Header
interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onCategorySelect: (category: ArticleCategory | null) => void;
  onLogoClick: () => void;
  onThemeToggle: () => void;
  onViewGraph: () => void;
  isDarkMode: boolean;
  activeCategory: ArticleCategory | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearchClick, onCategorySelect, onLogoClick, onThemeToggle, onViewGraph, isDarkMode, activeCategory }) => (
  <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-16 relative">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="p-2 -ml-2 text-gray-400 hover:text-black lg:hidden dark:text-gray-500 dark:hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <button onClick={onSearchClick} className="p-2 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors">
            <Search size={20} />
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer group" onClick={onLogoClick}>
          <h1 className={`text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors ${CONFIG.theme.fontSerif}`}>
            {TEXT.siteTitle}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-gray-400 mt-1">{TEXT.siteSubtitle}</p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={onThemeToggle}
            className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => onViewGraph()}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
            title="Entity Graph"
          >
            <Share2 size={20} />
          </button>
          <div className="hidden md:flex gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
            <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">KR</span>
            <span className="w-[1px] bg-gray-300 dark:bg-gray-600 h-3 self-center"></span>
            <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">EN</span>
          </div>
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide py-3">
        <div className="flex justify-center md:gap-8 gap-4 min-w-max">
          <span
            className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all duration-200 py-1 border-b-2 hover:scale-105 active:scale-95 ${activeCategory === null
              ? 'text-blue-700 dark:text-blue-400 border-blue-700 dark:border-blue-400'
              : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white hover:border-gray-200 dark:hover:border-slate-700'
              }`}
            onClick={() => onCategorySelect(null)}
          >
            {TEXT.allCategories}
          </span>
          {TEXT.nav.map((item, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all duration-200 py-1 border-b-2 hover:scale-105 active:scale-95 ${activeCategory === CATEGORY_MAP[item]
                ? 'text-blue-700 dark:text-blue-400 border-blue-700 dark:border-blue-400'
                : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white hover:border-gray-200 dark:hover:border-slate-700'
                }`}
              onClick={() => onCategorySelect(CATEGORY_MAP[item])}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>
    </div>
  </header>
);


// News Feed
interface NewsFeedProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onTrendClick: (keyword: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectEvent: (eventId: string) => void;
  trendData: TrendKeyword[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onSelectArticle, onTrendClick, sortBy, onSortChange, onSelectEvent, trendData }) => {
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
              <h2 className={`text - 2xl md: text - 4xl font - black text - slate - 900 dark: text - white mb - 4 group - hover: text - blue - 700 dark: group - hover: text - blue - 400 transition - colors leading - tight ${CONFIG.theme.fontSerif} `}>
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
              <h3 className={`text - xl font - bold text - slate - 900 dark: text - white mb - 3 leading - tight group - hover: text - blue - 700 dark: group - hover: text - blue - 400 transition - colors ${CONFIG.theme.fontSerif} `}>
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

/**
 * ==============================================================================
 * [Main Application]
 * ==============================================================================
 */

import { useNews } from './hooks/useNews';

export default function App() {
  const { articles: liveArticles } = useNews();
  const [view, setView] = useState<ViewType>('feed');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.IMPACT);
  const [trendData, setTrendData] = useState(TREND_KEYWORDS);

  // Browser history integration for back button
  useEffect(() => {
    const handlePopState = () => {
      if (view !== 'feed') {
        setView('feed');
        setSelectedEventId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [view]);

  // Trending keywords auto-refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendData(prev => prev.map(item => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return {
          ...item,
          changeAmount: change,
          change: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'same' as const
        };
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = liveArticles;

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        article.source.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case SortOption.DATE:
        sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case SortOption.POPULARITY:
        sorted.sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
        break;
      case SortOption.IMPACT:
      default:
        sorted.sort((a, b) => (b.priority || 0) - (a.priority || 0));
        break;
    }

    return sorted;
  }, [liveArticles, activeCategory, searchQuery, sortBy]);

  const handleTrendClick = (keyword: string) => {
    setSearchQuery(keyword);
    setView('feed');

  };


  return (
    <div className={`min-h-screen bg-white dark:bg-[#09090b] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 overflow-x-hidden transition-colors duration-300 ${CONFIG.theme.fontSans}`}>
      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={(q) => {
          setSearchQuery(q);
          setSearchModalOpen(false);
        }}
      />
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCategorySelect={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Global Ticker */}
      <BreakingTicker items={[
        "2026 지방선거: 서울시장 후보 토론회 생중계 중",
        "삼성전자, 3nm 공정 수율 85% 달성 공식 발표",
        "국회, 'AI 기본법' 본회의 통과... 세계 최초 포괄적 규제",
        "한국형 달 탐사선 다누리 2호, 궤도 진입 성공",
        "속보: 수도권 광역급행철도(GTX-B) 전 구간 개통식"
      ]} />

      {/* Navigation Header */}
      <Header
        onMenuClick={() => setMenuOpen(true)}
        onSearchClick={() => setSearchModalOpen(true)}
        onCategorySelect={setActiveCategory}
        onLogoClick={() => {

          setActiveCategory(null);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onThemeToggle={toggleDarkMode}
        isDarkMode={isDarkMode}
        activeCategory={activeCategory}
        onViewGraph={() => setView('graph')}
      />

      {/* Main Content */}
      <main>
        {view === 'graph' && (
          <EntityGraphView onBack={() => setView('feed')} />
        )}

        {view === 'event' && selectedEventId && (
          <EventDetail
            eventId={selectedEventId}
            onBack={() => setView('feed')}
          />
        )}

        {view === 'feed' && (
          <NewsFeed
            articles={filteredArticles}
            trendData={trendData}
            onSelectArticle={(art) => {
              if (art.eventId) {
                setSelectedEventId(art.eventId);
                setView('event');
                window.history.pushState({ view: 'event', eventId: art.eventId }, '');
                window.scrollTo(0, 0);
              } else {
                console.log("No event linked to article:", art.id);
              }
            }}
            onTrendClick={handleTrendClick}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSelectEvent={(eventId: string) => {
              setSelectedEventId(eventId);
              setView('event');
              window.history.pushState({ view: 'event', eventId }, '');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-serif mb-4 text-slate-900 dark:text-white">{TEXT.siteTitle}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Providing unbiased intelligence for the modern era.<br />
            Neural News uses advanced AI to analyze political bias in real-time.
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Methodology</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
          </div>
          <div className="mt-8 text-xs text-gray-300 dark:text-gray-600 font-mono">
            © 2024 NEURAL NEWS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}