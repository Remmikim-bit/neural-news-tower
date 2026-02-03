import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, Search, X, ChevronRight, Share2, Printer,
  Bookmark, Globe, BarChart2, TrendingUp, Clock, AlertCircle,
  ArrowDownNarrowWide as SortDesc, Sun, Moon, ExternalLink
} from 'lucide-react';
import type { NewsArticle, ArticlePerspective } from './types.ts';
import { ArticleCategory, SortOption } from './types.ts';
import { MOCK_NEWS, TREND_KEYWORDS } from './data/mockNews.ts';
import EntityGraphView from './components/EntityGraphView';
import EventDetail from './components/EventDetail';

type ViewType = 'feed' | 'reader' | 'event' | 'graph';

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
const BreakingTicker: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="bg-slate-900 text-white py-2 overflow-hidden border-b border-slate-800 relative">
    <div className="max-w-7xl mx-auto px-4 flex items-center">
      <div className="flex-shrink-0 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded mr-4 z-10">
        BREAKING
      </div>
      <div className="flex whitespace-nowrap animate-marquee group">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="text-xs font-medium tracking-tight mx-8 flex items-center">
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
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="p-2 -ml-2 text-gray-400 hover:text-black lg:hidden dark:text-gray-500 dark:hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <button onClick={onSearchClick} className="p-2 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors">
            <Search size={20} />
          </button>
        </div>

        <div className="text-center cursor-pointer group" onClick={onLogoClick}>
          <h1 className={`text - 2xl md: text - 3xl font - black tracking - tight text - slate - 900 dark: text - white group - hover: text - blue - 800 dark: group - hover: text - blue - 400 transition - colors ${CONFIG.theme.fontSerif} `}>
            {TEXT.siteTitle}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-gray-400 mt-1">{TEXT.siteSubtitle}</p>
        </div>

        <div className="flex items-center gap-4">
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

      <nav className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide py-3">
        <div className="flex justify-center md:gap-8 gap-4 min-w-max">
          <span
            className={`text - [11px] font - black uppercase tracking - widest cursor - pointer transition - all duration - 200 py - 1 border - b - 2 ${activeCategory === null
              ? 'text-blue-700 border-blue-700'
              : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white hover:border-gray-200 dark:hover:border-slate-700'
              } `}
            onClick={() => onCategorySelect(null)}
          >
            {TEXT.allCategories}
          </span>
          {TEXT.nav.map((item, idx) => (
            <span
              key={idx}
              className={`text - [11px] font - black uppercase tracking - widest cursor - pointer transition - all duration - 200 py - 1 border - b - 2 ${activeCategory === CATEGORY_MAP[item]
                ? 'text-blue-700 border-blue-700'
                : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white hover:border-gray-200 dark:hover:border-slate-700'
                } `}
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

// Article Reader
interface ArticleReaderProps {
  article: NewsArticle;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onBack, isBookmarked, onToggleBookmark }) => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 bg-white dark:bg-slate-900 min-h-screen pb-20">
      {/* Copy notification */}
      {showCopyNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          {TEXT.linkCopied}
        </div>
      )}

      {/* Sticky Top Bar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500">
          <X size={16} /> {TEXT.backToList}
        </button>
        <div className="flex gap-3 text-gray-400">
          <button
            onClick={onToggleBookmark}
            className={`cursor - pointer transition - colors ${isBookmarked ? 'text-blue-600' : 'hover:text-black dark:hover:text-white'} `}
            title={TEXT.bookmark}
          >
            <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
          </button>
          <button onClick={handleShare} className="cursor-pointer hover:text-black dark:hover:text-white" title={TEXT.share}>
            <Share2 size={18} />
          </button>
          <button onClick={handlePrint} className="cursor-pointer hover:text-black dark:hover:text-white" title={TEXT.print}>
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <article className="lg:col-span-8">
          <div className="mb-6">
            <span className="text-blue-700 font-bold text-xs tracking-wider uppercase mb-2 block">{article.category}</span>
            <h1 className={`text - 3xl md: text - 4xl font - bold text - slate - 900 dark: text - white leading - tight mb - 4 ${CONFIG.theme.fontSerif} `}>
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">{article.source}</span>
              <span>•</span>
              <Clock size={14} />
              <span>{article.timestamp}</span>
              <span className="ml-auto flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs font-bold">
                <AlertCircle size={12} /> {TEXT.sourceCheck}
              </span>
            </div>

            {article.imageUrl && (
              <figure className="mb-8">
                <img src={article.imageUrl} alt="News Thumbnail" className="w-full h-64 object-cover rounded shadow-sm" />
                <figcaption className="text-xs text-gray-400 mt-2 text-right">Image Source: Unsplash / Editorial</figcaption>
              </figure>
            )}

            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-slate-900 dark:border-blue-700 mb-8">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-wide">AI Summary</h3>
              <p className={`text - gray - 700 dark: text - gray - 300 leading - relaxed ${CONFIG.theme.fontSerif} `}>{article.summary}</p>
            </div>

            <MarkdownViewer content={article.contentMarkdown} />

            {article.perspectives && article.perspectives.length > 0 && (
              <PerspectiveView perspectives={article.perspectives} />
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Bias Analysis */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
              <BarChart2 size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase">{TEXT.biasScore}</h3>
            </div>
            <BiasMeter score={article.bias} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-snug">
              이 기사는 {article.bias > 60 ? TEXT.biasRight : article.bias < 40 ? TEXT.biasLeft : TEXT.biasCenter} 성향의 어휘를 주로 사용하고 있습니다.
            </p>
          </div>

          {/* Geo Map */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
              <Globe size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase">{TEXT.mapLabel}</h3>
            </div>
            <WorldMap highlights={article.relatedCountries} />
          </div>

          {/* Entity Network */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
              <Share2 size={16} className="text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase">{TEXT.networkLabel}</h3>
            </div>
            <EntityNetworkBlock />
          </div>
        </aside>
      </div>
    </div>
  );
};

// Perspective View
interface PerspectiveViewProps {
  perspectives: ArticlePerspective[];
}

const PerspectiveView: React.FC<PerspectiveViewProps> = ({ perspectives }) => {
  const [activePerspective, setActivePerspective] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm mt-12 transition-all">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
        <Globe size={16} className="text-blue-700" />
        <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase">{TEXT.perspectives}</h3>
      </div>

      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {perspectives.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActivePerspective(idx)}
            className={`flex - shrink - 0 px - 4 py - 2 rounded - full text - sm font - semibold transition - all ${activePerspective === idx
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600'
              } `}
          >
            {p.source}
          </button>
        ))}
      </div>

      {perspectives.length > 0 && (
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-1 block">
                {perspectives[activePerspective].opinion}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-xl">{perspectives[activePerspective].source}</h4>
            </div>
            <a
              href={perspectives[activePerspective].link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
              title="원문 보기"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
            {perspectives[activePerspective].summary}
          </p>
          <div className="flex items-center gap-4 py-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-2">
                <span>Objectivity</span>
                <span>{100 - perspectives[activePerspective].bias}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h - full rounded - full transition - all duration - 1000 ${perspectives[activePerspective].bias > 60 ? 'bg-red-500' : perspectives[activePerspective].bias < 40 ? 'bg-blue-500' : 'bg-gray-400'} `}
                  style={{ width: `${perspectives[activePerspective].bias}% ` }}
                ></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded border border-gray-100 dark:border-gray-600 shadow-sm">
              <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase">Bias: {perspectives[activePerspective].bias}%</span>
            </div>
          </div>
        </div>
      )}
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
  onSelectEvent: (eventId: string) => void;
  onViewGraph: () => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onSelectArticle, onTrendClick, sortBy, onSortChange, onSelectEvent, onViewGraph }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <div className="bg-blue-700 text-white p-6 rounded-xl shadow-lg mb-6 group cursor-pointer hover:bg-blue-800 transition-all" onClick={() => onSelectEvent('ev-sewol-2014')}>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest">
            <Clock size={12} /> Featured Event
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 group-hover:translate-x-1 transition-transform">세월호 참사 타임라인</h3>
          <p className="text-xs text-blue-100 mb-4 line-clamp-2">AI가 재구성한 참사의 전 과정과 리비전 형식의 타임라인을 확인하세요.</p>
          <div className="flex items-center text-[10px] font-bold uppercase">
            View Timeline <ChevronRight size={10} className="ml-1" />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg mb-6 group cursor-pointer hover:bg-black transition-all" onClick={onViewGraph}>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
            <Share2 size={12} /> Interactive Graph
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 group-hover:translate-x-1 transition-transform">인물 관계 네트워크</h3>
          <p className="text-xs text-slate-400 mb-4">뉴스 속 인물들과 조직들의 연결 고리를 그래프 뷰로 탐색하세요.</p>
          <div className="flex items-center text-[10px] font-bold uppercase text-blue-400">
            Open Graph View <ChevronRight size={10} className="ml-1" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-red-600" />
            <h3 className="font-bold text-slate-900 dark:text-white">{TEXT.trendKeyword}</h3>
          </div>
          <ul className="space-y-3">
            {TREND_KEYWORDS.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-1 rounded"
                onClick={() => onTrendClick(item.text)}
              >
                <span className="font-bold text-gray-400 w-6">0{item.rank}</span>
                <span className="flex-1 font-medium text-gray-700 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">{item.text}</span>
                <span className={`text - [10px] px - 1.5 rounded ${item.change === 'up' ? 'text-red-600 bg-red-50 dark:bg-red-900/30' : item.change === 'down' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 bg-gray-100 dark:bg-slate-700'} `}>
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

export default function App() {
  const [view, setView] = useState<ViewType>('feed');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
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

  const handleTrendClick = (keyword: string) => {
    setSearchQuery(keyword);
    setView('feed');
    setSelectedArticle(null);
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarks((prev: Set<string>) => {
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
    <div className={`min-h-screen bg-[#f8f9fa] dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 overflow-x-hidden transition-colors duration-300 ${CONFIG.theme.fontSans}`}>
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
        "KOSPI 2,680.50 ▲ 1.2%",
        "USD/KRW 1,310.00 ▼ 5.50",
        "BREAKING: AI 안전 정상회의 공동 성명 채택",
        "WEATHER: 서울 18°C, 맑음",
        "TOP STORY: 저출산 대책 예산 40조원 투입 확정"
      ]} />

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

        {view === 'reader' && selectedArticle && (
          <ArticleReader
            article={selectedArticle}
            onBack={() => setView('feed')}
            isBookmarked={bookmarks.has(selectedArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(selectedArticle.id)}
          />
        )}

        {view === 'feed' && (
          <NewsFeed
            articles={filteredArticles}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              setView('reader');
            }}
            onTrendClick={handleTrendClick}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSelectEvent={(eventId: string) => {
              setSelectedEventId(eventId);
              setView('event');
            }}
            onViewGraph={() => setView('graph')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className={`text - 2xl font - bold font - serif mb - 4`}>{TEXT.siteTitle}</h2>
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