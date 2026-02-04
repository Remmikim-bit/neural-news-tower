import { create } from 'zustand';
import { ArticleCategory, SortOption } from '../types';

interface UIState {
    isDarkMode: boolean;
    searchModalOpen: boolean;
    menuOpen: boolean;
    activeCategory: ArticleCategory | null;
    searchQuery: string;
    sortBy: SortOption;

    toggleDarkMode: () => void;
    setSearchModalOpen: (open: boolean) => void;
    setMenuOpen: (open: boolean) => void;
    setActiveCategory: (category: ArticleCategory | null) => void;
    setSearchQuery: (query: string) => void;
    setSortBy: (sort: SortOption) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isDarkMode: typeof window !== 'undefined' ? (
        document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark'
    ) : false,
    searchModalOpen: false,
    menuOpen: false,
    activeCategory: null,
    searchQuery: '',
    sortBy: SortOption.IMPACT,

    toggleDarkMode: () => set((state) => {
        const nextMode = !state.isDarkMode;
        if (nextMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        return { isDarkMode: nextMode };
    }),
    setSearchModalOpen: (open) => set({ searchModalOpen: open }),
    setMenuOpen: (open) => set({ menuOpen: open }),
    setActiveCategory: (category) => set({ activeCategory: category }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortBy: (sort) => set({ sortBy: sort }),
}));
