import { useState } from 'react';
import { Globe, Activity, ShieldAlert, Network, ArrowRight, Zap, Layers, Lock } from 'lucide-react';
import { BackgroundGrid } from './components/ui/BackgroundGrid';
import { GlassContainer } from './components/ui/GlassContainer';
import { SectionHeader } from './components/ui/SectionHeader';
import { Badge } from './components/ui/Badge';
import { TechBiasGauge } from './components/viz/TechBiasGauge';
import { HexGraph } from './components/viz/HexGraph';
import { DeepDiveReport } from './components/report/DeepDiveReport'; // Reuse existing logic

import { BiasAnalyzer, MOCK_SOURCES } from './lib/BiasAnalyzer';
import { NewsMap } from './components/viz/NewsMap';

// Instantiate Analyzer
const analyzer = new BiasAnalyzer(MOCK_SOURCES);

// --- Mock Data ---
const MOCK_HEADLINES = [
  { id: '1', title: "AI 규제 법안, 국회 본회의 통과... 업계 반응 엇갈려", sourceId: 'FOX', category: "POLITICS", content: "crisis controversial threat" },
  { id: '2', title: "대기업 3분기 실적 발표, '반도체 쇼크' 현실화되나", sourceId: 'REUTERS', category: "ECONOMY", content: "risk failure collapse" },
  { id: '3', title: "기후 변화 협약, 선진국-개발도상국 합의점 도출 난항", sourceId: 'CNN', category: "WORLD", content: "hope breakthrough historic" },
  { id: '4', title: "신형 양자 컴퓨터 프로토타입 공개, 암호 체계 위협?", sourceId: 'FOX', category: "TECH", content: "innovation success growth" },
  { id: '5', title: "연준, 기술주 과열 경고... 'AI 버블' 논란 점화", sourceId: 'CNN', category: "ECONOMY", content: "shocking threat risk" },
].map(item => {
  // Dynamic Analysis
  const result = analyzer.analyzeArticle({
    id: item.id,
    title: item.title,
    content: item.content, // Mock content keywords for scoring
    sourceId: item.sourceId,
    timestamp: new Date(),
    keywords: []
  });
  // Map -1 to 1 range to 0 to 100 for UI
  const biasUI = Math.round((result.biasScore + 1) * 50);

  return {
    ...item,
    bias: biasUI,
    source: MOCK_SOURCES.find(s => s.id === item.sourceId)?.name || item.sourceId
  };
});

const TICKER_ITEMS = [
  { label: "KOSPI", value: "2,540.32", change: "+12.5", up: true },
  { label: "USD/KRW", value: "1,320.50", change: "-2.0", up: false },
  { label: "NASDAQ", value: "14,890.20", change: "+105.3", up: true },
  { label: "BTC/USD", value: "$68,000", change: "+3.5%", up: true },
  { label: "ETH/USD", value: "$3,450", change: "-1.2%", up: false },
];

const KEYWORDS = [
  { rank: "01", term: "반도체 보조금", volume: "2,540K", trend: "up" },
  { rank: "02", term: "금리 동결", volume: "1,820K", trend: "flat" },
  { rank: "03", term: "전기차 관세", volume: "1,200K", trend: "down" },
  { rank: "04", term: "의료 개혁", volume: "950K", trend: "up" },
  { rank: "05", term: "우주 항공청", volume: "800K", trend: "up" },
];

export default function App() {
  const [showReport, setShowReport] = useState(false);
  const [vizView, setVizView] = useState<'network' | 'geo'>('network'); // Toggle State

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <BackgroundGrid />

      {/* --- Top Nav / Ticker --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto h-12 flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative w-6 h-6 bg-cyan-950 border border-cyan-800 rounded flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <Zap size={14} className="text-cyan-400 relative z-10" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white font-sans">NEURAL<span className="text-cyan-500">.TOWER</span></span>
            </div>

            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

            {/* Ticker */}
            <div className="flex items-center gap-6 overflow-hidden mask-linear-fade hidden md:flex">
              {TICKER_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="text-gray-200">{item.value}</span>
                  <span className={`${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>{item.change}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative">
              <input
                type="text"
                placeholder="COMMAND OR SEARCH..."
                className="bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 w-64 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors"
              />
              <div className="absolute right-2 top-1.5 text-[10px] text-gray-600 border border-white/10 px-1 rounded">/</div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Activity size={16} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              <Layers size={16} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
                <span className="text-[10px] font-bold">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Dashboard --- */}
      <main className="pt-20 pb-12 px-4 md:px-6 max-w-[1600px] mx-auto relative z-10">

        {/* Top Hero Grid */}
        <div className="grid grid-cols-12 gap-6 mb-6">

          {/* Left: Bias Analysis */}
          <div className="col-span-12 lg:col-span-3">
            <GlassContainer className="h-full flex flex-col justify-between">
              <SectionHeader title="Polarization Index" subtitle="REAL-TIME SENTIMENT ANALYSIS" icon={ShieldAlert} />
              <TechBiasGauge value={72.4} />
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-500 uppercase">Analysis Depth</span>
                  <span className="text-[10px] text-cyan-400 font-mono">HIGH_RES</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[85%]"></div>
                </div>
              </div>
            </GlassContainer>
          </div>

          {/* Center: Main Focus (News Headline) */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative h-full min-h-[300px] rounded-sm overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent"></div>

              <div className="absolute top-0 left-0 p-6 w-full">
                <div className="flex justify-between items-start">
                  <Badge type="accent">DEEP DIVE REPORT</Badge>
                  <div className="flex gap-2">
                    <Badge>LIVE</Badge>
                    <Badge type="danger">BREAKING</Badge>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight group-hover:text-cyan-50 transition-colors">
                  Global AI Regulation Summit: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">The Friction Point</span>
                </h1>
                <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-6 border-l-2 border-cyan-500/50 pl-4">
                  Comprehensive analysis of the G7 agreement and its immediate impact on the semiconductor supply chain. Neural Tower predicts a 15% volatility in tech stocks.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowReport(true)}
                    className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-6 py-2.5 rounded-sm border border-cyan-500/30 transition-all text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    Read Analysis <ArrowRight size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-white text-xs font-mono underline underline-offset-4 decoration-gray-700 transition-colors">
                    View Source Documents (14)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Market/Keywords */}
          <div className="col-span-12 lg:col-span-3">
            <GlassContainer className="h-full">
              <SectionHeader title="Context Keywords" subtitle="VOLUME & VELOCITY" icon={Globe} />
              <div className="space-y-1">
                {KEYWORDS.map((k, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${i < 3 ? 'text-cyan-400' : 'text-gray-600'}`}>{k.rank}</span>
                      <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{k.term}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 font-mono">{k.volume}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 p-3 rounded-sm relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="text-[9px] text-purple-300 font-mono mb-1">MARKET ALERT</div>
                      <div className="text-xs font-bold text-white">Semi-conductor ETF</div>
                    </div>
                    <div className="text-emerald-400 font-mono text-xs">+2.4%</div>
                  </div>
                  {/* Abstract BG */}
                  <div className="absolute -right-2 -bottom-4 w-16 h-16 bg-purple-500/20 blur-xl rounded-full"></div>
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>

        {/* Second Row: Graph & News Feed */}
        <div className="grid grid-cols-12 gap-6">

          {/* Entity Graph */}
          <div className="col-span-12 lg:col-span-4">
            <GlassContainer>
              <SectionHeader
                title={vizView === 'network' ? "Entity Network" : "Geospatial Intel"}
                subtitle={vizView === 'network' ? "RELATIONSHIP MAPPING" : "GLOBAL EVENT CLUSTER"}
                icon={vizView === 'network' ? Network : Globe}
                rightContent={
                  <div className="flex gap-1 bg-white/5 rounded p-0.5 border border-white/5">
                    <button
                      onClick={() => setVizView('network')}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${vizView === 'network' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      NET
                    </button>
                    <button
                      onClick={() => setVizView('geo')}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${vizView === 'geo' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      GEO
                    </button>
                  </div>
                }
              />
              {vizView === 'network' ? <HexGraph /> : <NewsMap />}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Centrality</div>
                  <div className="text-sm font-mono text-white">0.82</div>
                </div>
                <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Density</div>
                  <div className="text-sm font-mono text-white">High</div>
                </div>
                <div className="bg-white/5 p-2 rounded text-center border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Clusters</div>
                  <div className="text-sm font-mono text-white">4</div>
                </div>
              </div>
            </GlassContainer>
          </div>

          {/* News Feed Table */}
          <div className="col-span-12 lg:col-span-8">
            <GlassContainer noPadding>
              <div className="p-5 border-b border-white/5 flex justify-between items-center">
                <SectionHeader title="Intelligence Feed" subtitle="AGGREGATED & FILTERED" icon={Layers} />
                <div className="flex gap-2">
                  {['ALL', 'POLITICS', 'ECONOMY', 'TECH'].map(filter => (
                    <button key={filter} className="text-[10px] font-bold px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {MOCK_HEADLINES.map((news) => (
                  <div key={news.id} className="p-4 hover:bg-white/[0.03] transition-colors group cursor-pointer flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <Badge>{news.category}</Badge>
                        <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                          <Lock size={10} /> {news.source}
                        </span>
                        <span className="text-[10px] text-gray-600">|</span>
                        <span className="text-[10px] text-gray-500">14:02 PM</span>
                      </div>
                      <h4 className="text-sm text-gray-200 font-medium group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {news.title}
                      </h4>
                    </div>

                    {/* Bias Mini Indicator */}
                    <div className="flex flex-col items-end gap-1 min-w-[80px]">
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${news.bias > 60 ? 'bg-blue-500' : news.bias < 40 ? 'bg-rose-500' : 'bg-gray-500'}`}></div>
                        <span className="text-[10px] font-mono text-gray-400">{news.bias} BS</span>
                      </div>
                      <div className="w-16 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${news.bias > 60 ? 'bg-blue-500' : news.bias < 40 ? 'bg-rose-500' : 'bg-gray-500'}`} style={{ width: `${news.bias}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-white/5">
                <button className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Load More Records</button>
              </div>
            </GlassContainer>
          </div>
        </div>
      </main>

      {/* AI Report Modal */}
      {showReport && <DeepDiveReport topic="Global AI Regulation Summit" onClose={() => setShowReport(false)} />}

    </div>
  );
}
