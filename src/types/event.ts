import { ArticleCategory, ArticlePerspective } from './article';

export interface NewsEvent {
    id: string;
    title: string;
    description: string;
    summary: string;
    imageUrl?: string;
    category: ArticleCategory;
    status: 'ONGOING' | 'RESOLVED' | 'HISTORICAL';
    startDate: string;
    endDate?: string;
    phases: EventPhase[];
    relatedEntities: string[];
    tags: string[];
    hotnessScore?: number;
    isNewEvent?: boolean;
}

export interface EventPhase {
    id: string;
    eventId: string;
    date: string;
    title: string;
    description: string;
    contentMarkdown: string;
    relatedArticles: string[];
    importance: number;
    perspectives?: ArticlePerspective[];
    biasStatistics?: {
        averageScore: number;
        label: string;
    };
}
