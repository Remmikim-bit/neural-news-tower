import { ArticleCategory } from './article';

export interface User {
    id: string;
    email: string;
    name?: string;
    preferences: UserPreferences;
    bookmarks: string[];
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
    readDuration: number;
    scrollDepth: number;
}
