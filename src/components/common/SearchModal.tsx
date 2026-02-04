import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TEXT } from '../../config/constants';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
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
