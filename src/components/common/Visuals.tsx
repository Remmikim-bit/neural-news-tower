import { Share2 } from 'lucide-react';
import { TEXT } from '../../config/constants';

// Bias Meter
export const BiasMeter = ({ score, label }: { score: number, label?: string }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1 tracking-wider">
                <span>{TEXT.biasLeft}</span>
                <span>{TEXT.biasCenter}</span>
                <span>{TEXT.biasRight}</span>
            </div>
            <div className="relative h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-gray-100 to-red-200 opacity-50 dark:opacity-20"></div>
                <div
                    className={`absolute top-0 bottom-0 w-1 transition-all duration-500 ease-out ${score < 40 ? 'bg-blue-600' : score > 60 ? 'bg-red-600' : 'bg-gray-600'}`}
                    style={{ left: `${score}%` }}
                ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-serif font-bold text-gray-700 dark:text-gray-300">
                    Score: {score} / 100
                </span>
                {label && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-bold">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};

// Markdown Viewer
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

// World Map
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

// Entity Network Placeholder
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
