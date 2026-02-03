/**
 * Neural News Tower - Type Definitions
 * 
 * 전체 애플리케이션에서 사용되는 타입 정의
 */

// ============================================================================
// Core Article Types
// ============================================================================

export interface NewsArticle {
    // 기본 정보
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    summary: string;

    // 콘텐츠
    contentMarkdown: string;
    excerpt?: string;

    // 분류
    category: ArticleCategory;
    subcategory?: string;
    tags: string[];
    keywords?: string[];

    // 메타데이터
    source: string; // Source name (simplified for now)
    author?: string;
    timestamp: string; // ISO 8601 format
    publishedAt?: string;
    updatedAt?: string;
    readingTime?: number; // minutes

    // 분석 데이터
    bias: number; // 0-100
    sentiment?: SentimentScore;

    // 미디어
    imageUrl?: string;
    media?: MediaAsset[];

    // 지리 및 엔티티
    relatedCountries: string[]; // ISO 2-letter codes
    relatedRegions?: string[];
    entities: string[]; // Entity names (simplified)

    // 관계
    relatedArticles?: string[]; // Article IDs

    // 상호작용
    stats?: ArticleStats;

    // 시스템
    status?: ArticleStatus;
    featured?: boolean;
    priority?: number; // 0-100
}

export const ArticleCategory = {
    POLITICS: 'POLITICS',
    ECONOMY: 'ECONOMY',
    TECH: 'TECH',
    WORLD: 'WORLD',
    OPINION: 'OPINION',
    SCIENCE: 'SCIENCE',
    CULTURE: 'CULTURE',
    SPORTS: 'SPORTS',
    HEALTH: 'HEALTH',
    ENVIRONMENT: 'ENVIRONMENT',
} as const;
export type ArticleCategory = (typeof ArticleCategory)[keyof typeof ArticleCategory];

export const ArticleStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
    DELETED: 'DELETED',
} as const;
export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

// ============================================================================
// Analysis Types
// ============================================================================

export interface SentimentScore {
    overall: number; // -1 to 1
    positive: number;
    negative: number;
    neutral: number;
    confidence: number;
}

export interface ArticleStats {
    views: number;
    shares: number;
    bookmarks: number;
    engagementRate?: number;
    averageReadTime?: number; // seconds
}

// ============================================================================
// Media Types
// ============================================================================

export interface MediaAsset {
    id: string;
    type: MediaType;
    url: string;
    caption?: string;
    credit?: string;
    alt: string;
    width?: number;
    height?: number;
    thumbnails?: {
        small: string;
        medium: string;
        large: string;
    };
}

export const MediaType = {
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO',
    AUDIO: 'AUDIO',
    DOCUMENT: 'DOCUMENT',
} as const;
export type MediaType = (typeof MediaType)[keyof typeof MediaType];

// ============================================================================
// Search & Filter Types
// ============================================================================

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

// ============================================================================
// User Types
// ============================================================================

export interface User {
    id: string;
    email: string;
    name?: string;
    preferences: UserPreferences;
    bookmarks: string[]; // Article IDs
    readHistory: ReadHistoryItem[];
    createdAt: string;
    lastLoginAt?: string;
}

export interface UserPreferences {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
        email: boolean;
        push: boolean;
        categories: ArticleCategory[];
    };
    interests: string[];
    blockedSources?: string[];
}

export interface ReadHistoryItem {
    articleId: string;
    readAt: string;
    readDuration: number; // seconds
    scrollDepth: number; // 0-1
}

// ============================================================================
// UI State Types
// ============================================================================

export interface AppState {
    // 데이터
    articles: NewsArticle[];
    filteredArticles: NewsArticle[];

    // UI 상태
    ui: {
        selectedArticle: NewsArticle | null;
        searchQuery: string;
        activeCategory: ArticleCategory | null;
        sidebarOpen: boolean;
        searchModalOpen: boolean;
        menuOpen: boolean;
    };

    // 사용자
    user: User | null;
    bookmarks: Set<string>;

    // 필터
    filters: {
        categories: Set<ArticleCategory>;
        sources: Set<string>;
        biasRange: [number, number];
        dateRange: [string, string] | null;
        searchQuery: string;
    };

    // 정렬
    sort: {
        by: SortOption;
        order: 'asc' | 'desc';
    };

    // 로딩 상태
    loading: {
        articles: boolean;
        search: boolean;
    };

    // 에러
    errors: {
        [key: string]: string | null;
    };
}

// ============================================================================
// Trend Types
// ============================================================================

export interface TrendKeyword {
    rank: number;
    text: string;
    change: 'up' | 'down' | 'same';
    count?: number;
    relatedArticles?: string[];
}

// ============================================================================
// Category Metadata
// ============================================================================

export interface CategoryMeta {
    id: ArticleCategory;
    label: Record<string, string>; // Multi-language labels
    description: string;
    color: string;
    icon: string;
}

// ============================================================================
// Localization Types
// ============================================================================

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
