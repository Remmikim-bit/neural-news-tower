import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, Search, User, ChevronRight, Share2, Printer,
  Bookmark, X, Globe, BarChart2, TrendingUp, Clock, AlertCircle
} from 'lucide-react';

/**
 * ==============================================================================
 * [System Configuration] 
 * 확장성을 위한 언어 설정 및 상수 정의 (Legacy Style Config)
 * ==============================================================================
 */

const CONFIG = {
  currentLang: 'ko', // 'ko' | 'en' | 'es'
  theme: {
    fontSerif: 'font-serif', // 명조 계열 (Times 느낌)
    fontSans: 'font-sans',   // 고딕 계열 (UI 요소)
  }
};

// 다국어 지원을 위한 라벨 딕셔너리
const LABELS = {
  ko: {
    siteTitle: "NEURAL NEWS",
    siteSubtitle: "Veritas Vincit",
    nav: ["정치", "경제", "기술", "세계", "오피니언"],
    biasScore: "미디어 편향 지수",
    trendKeyword: "실시간 트렌드",
    tickerLabel: "속보",
    readMore: "분석 리포트 읽기",
    sourceCheck: "출처 검증됨",
    mapLabel: "관련 지역 (Geospatial Context)",
    networkLabel: "엔티티 관계도 (Entity Network)",
    biasLeft: "진보 성향",
    biasRight: "보수 성향",
    biasCenter: "중립",
    backToList: "목록으로 돌아가기",
  },
  en: {
    siteTitle: "NEURAL NEWS",
    siteSubtitle: "Veritas Vincit",
    nav: ["Politics", "Economy", "Tech", "World", "Opinion"],
    biasScore: "Media Bias Index",
    trendKeyword: "Trending Now",
    tickerLabel: "BREAKING",
    readMore: "Read Analysis",
    sourceCheck: "Verified Sources",
    mapLabel: "Geospatial Context",
    networkLabel: "Entity Network",
    biasLeft: "Left Leaning",
    biasRight: "Right Leaning",
    biasCenter: "Center",
    backToList: "Back to Feed",
  }
};

const TEXT = LABELS[CONFIG.currentLang as keyof typeof LABELS];

/**
 * ==============================================================================
 * [Mock Data] 
 * 실제 DB 연동 전 사용할 더미 데이터 (Markdown 포함)
 * ==============================================================================
 */

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  contentMarkdown: string; // 마크다운 형식의 본문
  category: string;
  source: string;
  bias: number; // 0(Left) ~ 100(Right)
  timestamp: string;
  relatedCountries: string[]; // 국가 코드 (ISO 2자리)
  entities: string[]; // 네트워크 그래프용 엔티티
  imageUrl?: string;
}

const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: "글로벌 AI 규제 합의안 도출, 한국 기업에 미칠 영향은?",
    summary: "G7 정상회의에서 AI 안전 협약이 만장일치로 통과되었다. 국내 반도체 및 플랫폼 기업들의 규제 대응 비용 증가가 예상된다.",
    category: "TECH",
    source: "The Daily Insight",
    bias: 45, // 약간 진보/중립
    timestamp: "2024-03-15 14:30",
    relatedCountries: ['KR', 'US', 'EU'],
    entities: ['Sam Altman', 'Ministry of Science', 'Samsung'],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    contentMarkdown: `
### 역사적인 합의, 그러나 과제는 남았다
G7 정상들은 어제 파리에서 열린 회의에서 **'AI 서울-파리 선언'**을 채택했다. 이 선언은 고성능 AI 모델의 개발을 투명하게 공개하고, 위험성 평가를 의무화하는 것을 골자로 한다.

#### 주요 쟁점
1. **투명성 의무화**: 학습 데이터의 출처를 명기해야 함.
2. **워터마킹**: AI 생성 콘텐츠에 식별 표지 의무화.
3. **벌금 부과**: 위반 시 매출의 최대 7% 벌금.

전문가들은 이번 규제가 한국의 **네이버(Naver)**나 **삼성전자** 같은 기업들에게 단기적인 비용 부담으로 작용할 수 있다고 경고했다. "혁신을 저해할 수 있다"는 우려와 "안전장치가 필수적이다"라는 의견이 팽팽히 맞서고 있다.
    `
  },
  {
    id: '2',
    title: "미 연준, 금리 인하 시기 '신중론' 재확인... 시장 실망감",
    summary: "파월 의장의 발언 이후 나스닥은 1.2% 하락 마감했다. 물가 상승 압력이 여전히 존재한다는 판단이다.",
    category: "ECONOMY",
    source: "Market Watcher",
    bias: 75, // 보수 성향
    timestamp: "2024-03-15 11:00",
    relatedCountries: ['US'],
    entities: ['Jerome Powell', 'Federal Reserve', 'Wall Street'],
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
    contentMarkdown: `
### 시장의 기대는 시기상조였나
연방준비제도(Fed) 의장은 오늘 기자회견에서 "인플레이션이 2% 목표치로 수렴한다는 확신이 들 때까지 금리 인하를 서두르지 않겠다"고 밝혔다.

* **나스닥**: -1.2%
* **S&P 500**: -0.8%
* **국채 금리**: 상승세 전환

경제 전문가들은 "고용 지표가 여전히 강력하기 때문에 연준이 굳이 부양책을 쓸 이유가 없다"고 분석했다. 이는 보수적인 통화 정책을 지지하는 진영의 논리와 일치한다.
    `
  },
  {
    id: '3',
    title: "중동 정세 불안정 심화, 유가 90달러 돌파 위기",
    summary: "호르무즈 해협의 긴장감이 고조되면서 국제 유가가 급등하고 있다. 에너지 수급 대책이 시급하다.",
    category: "WORLD",
    source: "Global Times",
    bias: 20, // 진보 성향 (혹은 반전/평화 강조)
    timestamp: "2024-03-15 09:15",
    relatedCountries: ['IR', 'SA', 'US'],
    entities: ['OPEC', 'UN Security Council'],
    contentMarkdown: `
### 에너지 안보 비상
중동 지역의 지정학적 리스크가 해소될 기미를 보이지 않고 있다. 어제 발생한 유조선 나포 시도 사건은 해당 해역의 안전에 심각한 우려를 제기했다.

국제 에너지 기구(IEA)는 "공급망 충격이 현실화될 경우, 전 세계적인 인플레이션 재발이 불가피하다"고 경고했다. 각국 정부는 비상 비축유 방출을 검토 중이다.
    `
  }
];

const TREND_KEYWORDS = [
  { rank: 1, text: "AI 법안 통과", change: "up" },
  { rank: 2, text: "엔비디아 실적", change: "same" },
  { rank: 3, text: "총선 여론조사", change: "up" },
  { rank: 4, text: "비트코인 반감기", change: "down" },
  { rank: 5, text: "의대 증원", change: "up" },
];

/**
 * ==============================================================================
 * [Helper Components] 
 * 시각화 및 유틸리티 컴포넌트
 * ==============================================================================
 */

// 1. Bias Indicator (Bar Type - More standard journalism style)
const BiasMeter = ({ score }: { score: number }) => {
  // 0(Left) ~ 50(Center) ~ 100(Right)
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-1 tracking-wider">
        <span>{TEXT.biasLeft}</span>
        <span>{TEXT.biasCenter}</span>
        <span>{TEXT.biasRight}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-gray-100 to-red-200 opacity-50"></div>
        {/* Indicator */}
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

// 2. Simple Markdown Renderer (Safe, no external lib)
const MarkdownViewer = ({ content }: { content: string }) => {
  // 매우 간단한 파서: ### -> h3, #### -> h4, ** -> bold, * list -> li
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-slate-900 font-serif">{line.replace('### ', '')}</h3>;
    if (line.startsWith('#### ')) return <h4 key={index} className="text-lg font-bold mt-4 mb-2 text-slate-800 font-serif">{line.replace('#### ', '')}</h4>;
    if (line.trim().startsWith('* ')) return <li key={index} className="ml-4 list-disc text-gray-700 my-1">{line.replace('* ', '')}</li>;
    if (line.trim().startsWith('1. ')) return <li key={index} className="ml-4 list-decimal text-gray-700 my-1">{line.replace(/^\d+\. /, '')}</li>;
    if (line.trim() === '') return <br key={index} />;

    // Bold 처리
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

// 3. Vector World Map (Simple SVG)
const WorldMap = ({ highlights }: { highlights: string[] }) => {
  // 간단한 대륙/국가 패스 데이터 (매우 단순화됨)
  // 실제 프로덕션에서는 topojson 등을 사용해야 하지만, 단일 파일 제약상 SVG Path로 대체
  const getFill = (code: string) => highlights.includes(code) ? "#3b82f6" : "#e5e7eb"; // Highlight: Blue, Default: Gray

  return (
    <div className="w-full aspect-[2/1] bg-blue-50/30 rounded border border-gray-100 relative overflow-hidden">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Ocean */}
        <rect width="800" height="400" fill="transparent" />

        {/* North America (US/CA) - Simplified */}
        <path d="M 50 50 L 250 50 L 200 150 L 100 120 Z" fill={getFill('US')} stroke="white" strokeWidth="1" />

        {/* South America */}
        <path d="M 180 160 L 280 160 L 250 350 L 180 250 Z" fill={getFill('BR')} stroke="white" strokeWidth="1" />

        {/* Europe */}
        <path d="M 380 60 L 500 60 L 480 120 L 380 120 Z" fill={getFill('EU')} stroke="white" strokeWidth="1" />

        {/* Asia (CN/KR/JP) */}
        <path d="M 510 60 L 700 60 L 720 150 L 550 180 Z" fill={getFill('KR')} stroke="white" strokeWidth="1" />

        {/* Middle East (IR/SA) */}
        <path d="M 450 130 L 530 130 L 520 180 L 460 170 Z" fill={getFill('IR')} stroke="white" strokeWidth="1" />

        {/* Africa */}
        <path d="M 380 140 L 480 140 L 450 300 L 390 250 Z" fill={getFill('ZA')} stroke="white" strokeWidth="1" />

        {/* Labels (If highlighted) */}
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

// 4. Entity Network Placeholder (Legacy Block)
const EntityNetworkBlock = () => {
  return (
    <div className="w-full h-64 bg-slate-50 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
        {/* Grid pattern background */}
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

        {/* Developer Comment Block */}
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
 * 주요 화면 구성 요소
 * ==============================================================================
 */

// Top Ticker
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

// Main Header
const Header = () => (
  <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-black"><Menu size={20} /></button>
          <button className="text-gray-500 hover:text-black"><Search size={20} /></button>
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <h1 className={`text-2xl md:text-3xl font-black tracking-tight text-slate-900 ${CONFIG.theme.fontSerif}`}>
            {TEXT.siteTitle}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-1">{TEXT.siteSubtitle}</p>
        </div>

        {/* Right: User & Utils */}
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

      {/* Navigation (Desktop) */}
      <nav className="hidden md:flex justify-center py-3 space-x-8 text-sm font-bold text-gray-600 border-t border-gray-100 mt-2">
        {TEXT.nav.map((item) => (
          <a key={item} href="#" className="hover:text-blue-700 transition-colors border-b-2 border-transparent hover:border-blue-700 pb-1">
            {item}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

// Article Detail View
const ArticleReader = ({ article, onBack }: { article: NewsArticle, onBack: () => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 bg-white min-h-screen pb-20">
      {/* Sticky Top Bar for Reader */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-700">
          <X size={16} /> {TEXT.backToList}
        </button>
        <div className="flex gap-3 text-gray-400">
          <Bookmark size={18} className="cursor-pointer hover:text-black" />
          <Share2 size={18} className="cursor-pointer hover:text-black" />
          <Printer size={18} className="cursor-pointer hover:text-black" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Main Content (Left/Center) */}
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

        {/* Sidebar (Visualizations) */}
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

// Main Feed View
const NewsFeed = ({ onSelectArticle }: { onSelectArticle: (article: NewsArticle) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Left Sidebar: Trends & Stats */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-red-600" />
            <h3 className="font-bold text-slate-900">{TEXT.trendKeyword}</h3>
          </div>
          <ul className="space-y-3">
            {TREND_KEYWORDS.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-gray-50 p-1 rounded">
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
          <div className="text-xs font-bold text-gray-500">Sorted by: Impact</div>
        </div>

        {/* Hero Card (First Item) */}
        {MOCK_NEWS.length > 0 && (
          <div
            onClick={() => onSelectArticle(MOCK_NEWS[0])}
            className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white"
          >
            <div className="overflow-hidden rounded border border-gray-200 aspect-video md:aspect-auto">
              <img src={MOCK_NEWS[0].imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Headline" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-blue-600 font-bold text-xs mb-2 tracking-wide">{MOCK_NEWS[0].category}</span>
              <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors ${CONFIG.theme.fontSerif}`}>
                {MOCK_NEWS[0].title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {MOCK_NEWS[0].summary}
              </p>
              <div className="mt-auto flex items-center text-xs text-gray-400 font-bold">
                <span>{MOCK_NEWS[0].source}</span>
                <span className="mx-2">•</span>
                <span>{MOCK_NEWS[0].timestamp}</span>
              </div>
            </div>
          </div>
        )}

        {/* Standard List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_NEWS.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white border border-gray-200 p-5 rounded hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{article.category}</span>
                <BiasMeter score={article.bias} />
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
 * [Main Application Entry]
 * ==============================================================================
 */

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle]);

  return (
    <div className={`min-h-screen bg-[#f8f9fa] text-slate-900 ${CONFIG.theme.fontSans}`}>

      {/* 1. Global Ticker */}
      <BreakingTicker />

      {/* 2. Navigation Header */}
      <Header />

      {/* 3. Main Content Router */}
      <main>
        {selectedArticle ? (
          <ArticleReader
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <NewsFeed
            onSelectArticle={setSelectedArticle}
          />
        )}
      </main>

      {/* 4. Footer */}
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