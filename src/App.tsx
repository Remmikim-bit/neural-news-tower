import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, Search, X, ChevronRight, Share2, Printer,
  Bookmark, Globe, BarChart2, TrendingUp, Clock, AlertCircle,
  ArrowDownNarrowWide as SortDesc
} from 'lucide-react';
import type { NewsArticle } from './types.ts';
import { ArticleCategory, SortOption } from './types.ts';
import { MOCK_NEWS, TREND_KEYWORDS } from './data/mockNews.ts';

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
    subscribeEmail: "이메일 주소",
    joinNow: "가입하기",
    filter: "필터",
    sort: "정렬",
    allCategories: "전체",
    sortByImpact: "영향력순",
    sortByDate: "최신순",
    sortByPopularity: "인기순",
    bookmarked: "북마크됨",
    linkCopied: "링크가 복사되었습니다",
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
    subscribeEmail: "Email address",
    joinNow: "JOIN NOW",
    filter: "Filter",
    sort: "Sort",
    allCategories: "All",
    sortByImpact: "Impact",
    sortByDate: "Latest",
    sortByPopularity: "Popular",
    bookmarked: "Bookmarked",
    linkCopied: "Link copied",
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

// Bias Meter
const BiasMeter = ({ score }: { score: number }) => {
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
          className={`absolute top-0 bottom-0 w-1 transition-all duration-500 ease-out ${score < 40 ? 'bg-blue-600' : score > 60 ? 'bg-red-600' : 'bg-gray-600'}`}
          style={{ left: `${score}%` }}
        ></div>
      </div>
      <div className="text-center mt-1 text-xs font-serif font-bold text-gray-700">
        Score: {score} / 100
      </div>
    </div>
  );
};

// Markdown Viewer
const MarkdownViewer = ({ content }: { content: string }) => {
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

// World Map
const WorldMap = ({ highlights }: { highlights: string[] }) => {
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

// Entity Network Placeholder
const EntityNetworkBlock = () => {
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
const BreakingTicker = () => {
  return (
    <div className="bg-slate-900 text-white text-xs font-bold py-2 px-4 flex items-center overflow-hidden">
      <span className="text-red-500 mr-4 animate-pulse flex-shrink-0 uppercase tracking-widest">
        ● {TEXT.tickerLabel}
      </span>
      <div className="flex gap-8 animate-marquee whitespace-nowrap font-mono text-gray-300">
        <span>KOSPI 2,680.50 ▲ 1.2%</span>
        <span>USD/KRW 1,310.00 ▼ 5.50</span>
        <span>BREAKING: AI 안전 정상회의 공동 성명 채택</span>
        <span>WEATHER: 서울 18°C, 맑음</span>
      </div>
    </div>
  );
};

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
              className={`w-full text-left px-4 py-3 rounded font-bold transition-colors ${activeCategory === null ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {TEXT.allCategories}
            </button>
            {TEXT.nav.map((item, idx) => {
              const category = CATEGORY_MAP[item];
              return (
                <button
                  key={idx}
                  onClick={() => { onCategorySelect(category); onClose(); }}
                  className={`w-full text-left px-4 py-3 rounded font-bold transition-colors ${activeCategory === category ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
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
  activeCategory: ArticleCategory | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearchClick, onCategorySelect, onLogoClick, activeCategory }) => (
  <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="text-gray-500 hover:text-black lg:hidden">
            <Menu size={20} />
          </button>
          <button onClick={onSearchClick} className="text-gray-500 hover:text-black">
            <Search size={20} />
          </button>
        </div>

        <div className="text-center cursor-pointer group" onClick={onLogoClick}>
          <h1 className={`text-2xl md:text-3xl font-black tracking-tight text-slate-900 group-hover:text-blue-800 transition-colors ${CONFIG.theme.fontSerif}`}>
            {TEXT.siteTitle}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-1">{TEXT.siteSubtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 text-xs font-bold text-gray-500">
            <span className="cursor-pointer hover:text-black">KR</span>
            <span className="w-[1px] bg-gray-300 h-3 self-center"></span>
            <span className="cursor-pointer hover:text-black">EN</span>
          </div>
          <button className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-800 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <nav className="hidden lg:flex justify-center py-3 space-x-8 text-sm font-bold text-gray-600 border-t border-gray-100 mt-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`hover:text-blue-700 transition-colors border-b-2 pb-1 ${activeCategory === null ? 'border-blue-700 text-blue-700' : 'border-transparent'
            }`}
        >
          {TEXT.allCategories}
        </button>
        {TEXT.nav.map((item, idx) => {
          const category = CATEGORY_MAP[item];
          return (
            <button
              key={idx}
              onClick={() => onCategorySelect(category)}
              className={`hover:text-blue-700 transition-colors border-b-2 pb-1 ${activeCategory === category ? 'border-blue-700 text-blue-700' : 'border-transparent'
                }`}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </div>
  </header>
);

// Article Reader
interface ArticleReaderProps {
  article: NewsArticle;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onBack, isBookmarked, onToggleBookmark }) => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 bg-white min-h-screen pb-20">
      {/* Copy notification */}
      {showCopyNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          {TEXT.linkCopied}
        </div>
      )}

      {/* Sticky Top Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700">
          <X size={16} /> {TEXT.backToList}
        </button>
        <div className="flex gap-3 text-gray-400">
          <button
            onClick={onToggleBookmark}
            className={`cursor-pointer transition-colors ${isBookmarked ? 'text-blue-600' : 'hover:text-black'}`}
            title={TEXT.bookmark}
          >
            <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
          </button>
          <button onClick={handleShare} className="cursor-pointer hover:text-black" title={TEXT.share}>
            <Share2 size={18} />
          </button>
          <button onClick={handlePrint} className="cursor-pointer hover:text-black" title={TEXT.print}>
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <article className="lg:col-span-8">
          <div className="mb-6">
            <span className="text-blue-700 font-bold text-xs tracking-wider uppercase mb-2 block">{article.category}</span>
            <h1 className={`text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4 ${CONFIG.theme.fontSerif}`}>
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <span className="font-bold text-gray-900">{article.source}</span>
              <span>•</span>
              <Clock size={14} />
              <span>{article.timestamp}</span>
              <span className="ml-auto flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold">
                <AlertCircle size={12} /> {TEXT.sourceCheck}
              </span>
            </div>

            {article.imageUrl && (
              <figure className="mb-8">
                <img src={article.imageUrl} alt="News Thumbnail" className="w-full h-64 object-cover rounded shadow-sm" />
                <figcaption className="text-xs text-gray-400 mt-2 text-right">Image Source: Unsplash / Editorial</figcaption>
              </figure>
            )}

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-slate-900 mb-8">
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">AI Summary</h3>
              <p className={`text-gray-700 leading-relaxed ${CONFIG.theme.fontSerif}`}>{article.summary}</p>
            </div>

            <MarkdownViewer content={article.contentMarkdown} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Bias Analysis */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <BarChart2 size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 uppercase">{TEXT.biasScore}</h3>
            </div>
            <BiasMeter score={article.bias} />
            <p className="text-xs text-gray-500 mt-3 leading-snug">
              이 기사는 {article.bias > 60 ? TEXT.biasRight : article.bias < 40 ? TEXT.biasLeft : TEXT.biasCenter} 성향의 어휘를 주로 사용하고 있습니다.
            </p>
          </div>

          {/* Geo Map */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <Globe size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 uppercase">{TEXT.mapLabel}</h3>
            </div>
            <WorldMap highlights={article.relatedCountries} />
          </div>

          {/* Entity Network */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <Share2 size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 uppercase">{TEXT.networkLabel}</h3>
            </div>
            <EntityNetworkBlock />
          </div>
        </aside>
      </div>
    </div>
  );
};

// News Feed
interface NewsFeedProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onTrendClick: (keyword: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onSelectArticle, onTrendClick, sortBy, onSortChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-red-600" />
            <h3 className="font-bold text-slate-900">{TEXT.trendKeyword}</h3>
          </div>
          <ul className="space-y-3">
            {TREND_KEYWORDS.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => onTrendClick(item.text)}
              >
                <span className="font-bold text-gray-400 w-6">0{item.rank}</span>
                <span className="flex-1 font-medium text-gray-700 group-hover:text-black">{item.text}</span>
                <span className={`text-[10px] px-1.5 rounded ${item.change === 'up' ? 'text-red-600 bg-red-50' : item.change === 'down' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 bg-gray-100'}`}>
                  {item.change === 'up' ? '▲' : item.change === 'down' ? '▼' : '-'}
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
        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-4">
          <h2 className="text-xl font-bold font-serif text-slate-900">Top Stories</h2>
          <div className="flex items-center gap-2">
            <SortDesc size={16} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs font-bold text-gray-700 border border-gray-300 rounded px-2 py-1 cursor-pointer hover:border-gray-400"
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
            className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white"
          >
            <div className="overflow-hidden rounded border border-gray-200 aspect-video md:aspect-auto">
              <img src={articles[0].imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Headline" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-blue-600 font-bold text-xs mb-2 tracking-wide">{articles[0].category}</span>
              <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors ${CONFIG.theme.fontSerif}`}>
                {articles[0].title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {articles[0].summary}
              </p>
              <div className="mt-auto flex items-center text-xs text-gray-400 font-bold">
                <span>{articles[0].source}</span>
                <span className="mx-2">•</span>
                <span>{articles[0].timestamp}</span>
              </div>
            </div>
          </div>
        )}

        {/* Standard List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white border border-gray-200 p-5 rounded hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{article.category}</span>
              </div>
              <h3 className={`text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 ${CONFIG.theme.fontSerif}`}>
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                {article.summary}
              </p>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{article.source}</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
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

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.IMPACT);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neural-news-bookmarks');
    if (saved) {
      setBookmarks(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('neural-news-bookmarks', JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = MOCK_NEWS;

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
  }, [activeCategory, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedArticle(null);
  };

  const handleTrendClick = (keyword: string) => {
    setSearchQuery(keyword);
    setSelectedArticle(null);
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId);
      } else {
        newBookmarks.add(articleId);
      }
      return newBookmarks;
    });
  };

  return (
    <div className={`min-h-screen bg-[#f8f9fa] text-slate-900 selection:bg-blue-100 overflow-x-hidden ${CONFIG.theme.fontSans}`}>
      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={handleSearch}
      />
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCategorySelect={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Global Ticker */}
      <BreakingTicker />

      {/* Navigation Header */}
      <Header
        onMenuClick={() => setMenuOpen(true)}
        onSearchClick={() => setSearchModalOpen(true)}
        onCategorySelect={setActiveCategory}
        onLogoClick={() => {
          setSelectedArticle(null);
          setActiveCategory(null);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCategory={activeCategory}
      />

      {/* Main Content */}
      <main>
        {selectedArticle ? (
          <ArticleReader
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            isBookmarked={bookmarks.has(selectedArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(selectedArticle.id)}
          />
        ) : (
          <NewsFeed
            articles={filteredArticles}
            onSelectArticle={setSelectedArticle}
            onTrendClick={handleTrendClick}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className={`text-2xl font-bold font-serif mb-4`}>{TEXT.siteTitle}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Providing unbiased intelligence for the modern era.<br />
            Neural News uses advanced AI to analyze political bias in real-time.
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-black">About Us</a>
            <a href="#" className="hover:text-black">Methodology</a>
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Contact</a>
          </div>
          <div className="mt-8 text-xs text-gray-300 font-mono">
            © 2024 NEURAL NEWS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}