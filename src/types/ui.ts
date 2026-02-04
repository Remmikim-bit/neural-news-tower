import { ArticleCategory, NewsArticle } from './article';
import { User } from './user';

export interface SearchQuery {
    q: string;
    categories?: ArticleCategory[];
    tags?: string[];
    sources?: string[];
    dateFrom?: string;
    dateTo?: string;
    biasMin?: number;
    biasMax?: number;
    sortBy: SortOption;
    sortOrder: 'asc' | 'desc';
    page: number;
    pageSize: number;
}

export const SortOption = {
    RELEVANCE: 'RELEVANCE',
    DATE: 'DATE',
    POPULARITY: 'POPULARITY',
    IMPACT: 'IMPACT',
    BIAS: 'BIAS',
} as const;
export type SortOption = (typeof SortOption)[keyof typeof SortOption];

export interface SearchResult {
    articles: NewsArticle[];
    total: number;
    page: number;
    pageSize: number;
}

export interface AppState {
    articles: NewsArticle[];
    filteredArticles: NewsArticle[];
    ui: {
        selectedArticle: NewsArticle | null;
        searchQuery: string;
        activeCategory: ArticleCategory | null;
        sidebarOpen: boolean;
        searchModalOpen: boolean;
        menuOpen: boolean;
    };
    user: User | null;
    bookmarks: Set<string>;
    filters: {
        categories: Set<ArticleCategory>;
        sources: Set<string>;
        biasRange: [number, number];
        dateRange: [string, string] | null;
        searchQuery: string;
    };
    sort: {
        by: SortOption;
        order: 'asc' | 'desc';
    };
    loading: {
        articles: boolean;
        search: boolean;
    };
    errors: {
        [key: string]: string | null;
    };
}

export interface TrendKeyword {
    rank: number;
    text: string;
    change: 'up' | 'down' | 'same';
    changeAmount?: number;
    count?: number;
    relatedArticles?: string[];
}

export interface CategoryMeta {
    id: ArticleCategory;
    label: Record<string, string>;
    description: string;
    color: string;
    icon: string;
}

export interface LocaleLabels {
    siteTitle: string;
    siteSubtitle: string;
    nav: string[];
    biasScore: string;
    trendKeyword: string;
    tickerLabel: string;
    readMore: string;
    sourceCheck: string;
    mapLabel: string;
    networkLabel: string;
    biasLeft: string;
    biasRight: string;
    biasCenter: string;
    backToList: string;
    search: string;
    searchPlaceholder: string;
    filter: string;
    sort: string;
    bookmark: string;
    share: string;
    print: string;
    subscribe: string;
    subscribeEmail: string;
    joinNow: string;
    close: string;
    menu: string;
    [key: string]: string | string[];
}
