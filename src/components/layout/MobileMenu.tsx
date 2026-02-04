import React from 'react';
import { X } from 'lucide-react';
import { ArticleCategory } from '../../types';
import { TEXT, CATEGORY_MAP } from '../../config/constants';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onCategorySelect: (category: ArticleCategory | null) => void;
    activeCategory: ArticleCategory | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onCategorySelect, activeCategory }) => {
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
