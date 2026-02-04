import React from 'react';
import { Menu, Search, Share2, Sun, Moon } from 'lucide-react';
import { ArticleCategory } from '../../types';
import { CONFIG, TEXT, CATEGORY_MAP } from '../../config/constants';

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

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearchClick, onCategorySelect, onLogoClick, onThemeToggle, onViewGraph, isDarkMode, activeCategory }) => (
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
