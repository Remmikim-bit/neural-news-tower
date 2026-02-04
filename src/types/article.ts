export interface NewsArticle {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    summary: string;
    contentMarkdown: string;
    excerpt?: string;
    category: ArticleCategory;
    subcategory?: string;
    tags: string[];
    keywords?: string[];
    source: string;
    author?: string;
    timestamp: string;
    publishedAt?: string;
    updatedAt?: string;
    readingTime?: number;
    bias: number;
    sentiment?: SentimentScore;
    imageUrl?: string;
    media?: MediaAsset[];
    relatedCountries: string[];
    relatedRegions?: string[];
    entities: string[];
    relatedArticles?: string[];
    stats?: ArticleStats;
    perspectives?: ArticlePerspective[];
    status?: ArticleStatus;
    featured?: boolean;
    priority?: number;
    eventId?: string;
    phaseId?: string;
    hotness?: number;
    sourceUrl?: string;
    aiSummary?: string;
}

export interface ArticlePerspective {
    source: string;
    sourceId: string;
    opinion: string;
    summary: string;
    link: string;
    bias: number;
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
    SOCIETY: 'SOCIETY',
} as const;
export type ArticleCategory = (typeof ArticleCategory)[keyof typeof ArticleCategory];

export const ArticleStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
    DELETED: 'DELETED',
} as const;
export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

export interface SentimentScore {
    overall: number;
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
    averageReadTime?: number;
}

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
