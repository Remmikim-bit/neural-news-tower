export type SentimentScore = number; // -1.0 (Negative) to 1.0 (Positive)
export type PoliticalBias = 'CONSERVATIVE' | 'PROGRESSIVE' | 'NEUTRAL';

export interface NewsSource {
    id: string;
    name: string;
    baseBias: PoliticalBias; // Underlying stance
    biasWeight: number; // 0.0 to 1.0 (How strong is their bias?)
}

export interface Article {
    id: string;
    title: string;
    content: string;
    sourceId: string;
    timestamp: Date;
    keywords: string[];
}

export interface AnalysisResult {
    articleId: string;
    sentimentScore: number;
    biasScore: number; // Adjusted by media bias
    detectedKeywords: { word: string; score: number }[];
}

// Simple sentiment dictionary for prototype (In real app, use NLP model)
const SENTIMENT_DICTIONARY: Record<string, number> = {
    'crisis': -0.8, 'collapse': -0.9, 'failure': -0.7, 'threat': -0.6, 'risk': -0.5,
    'growth': 0.6, 'success': 0.8, 'breakthrough': 0.9, 'recovery': 0.7, 'innovation': 0.8,
    'controversial': -0.4, 'historic': 0.3, 'shocking': -0.5, 'hope': 0.6
};

export class BiasAnalyzer {
    private sources: Map<string, NewsSource>;

    constructor(sources: NewsSource[]) {
        this.sources = new Map(sources.map(s => [s.id, s]));
    }

    /**
     * Analyze a single article to determine its sentiment and bias projection.
     */
    public analyzeArticle(article: Article): AnalysisResult {
        const source = this.sources.get(article.sourceId);
        if (!source) throw new Error(`Source ${article.sourceId} not found`);

        const words = article.content.toLowerCase().split(/\s+/);
        let totalScore = 0;
        const detectedKeywords: { word: string; score: number }[] = [];

        // 1. Keyword Extraction & Sentiment Scoring
        words.forEach(word => {
            // Basic cleaning
            const cleanWord = word.replace(/[^a-z]/g, '');
            if (SENTIMENT_DICTIONARY[cleanWord]) {
                const score = SENTIMENT_DICTIONARY[cleanWord];
                totalScore += score;
                detectedKeywords.push({ word: cleanWord, score });
            }
        });

        // Normalize sentiment (-1 to 1)
        const normalizedSentiment = Math.max(-1, Math.min(1, totalScore / (detectedKeywords.length || 1)));

        // 2. Calculate "Perceived Bias" based on Source Stance
        // If a Conservative source speaks Negatively about a Progressive topic, that's High Bias.
        // For this prototype, we treat the 'sentiment' itself as the vector.
        // Real logic would need "Target Entity" detection (e.g. Sentiment towards 'Tax Cut').

        // For visual mapping, we interpret the result as:
        // Conservative Source + Positive Sentiment = Shift Right
        // Progressive Source + Positive Sentiment = Shift Left
        // (This is a simplification for the UI)

        let biasDirection = 0;
        if (source.baseBias === 'CONSERVATIVE') biasDirection = 1;
        if (source.baseBias === 'PROGRESSIVE') biasDirection = -1;

        // The Bias Score here represents "How far from center/neutral" the article pushes
        const biasScore = normalizedSentiment * biasDirection * source.biasWeight;

        return {
            articleId: article.id,
            sentimentScore: normalizedSentiment,
            biasScore,
            detectedKeywords
        };
    }

    /**
     * Calculate the "Information Unbalance" (Gap) between opposing viewpoints on a topic.
     */
    public calculateBiasIndex(results: AnalysisResult[]): number {
        if (results.length === 0) return 0;

        // Calculate variance or standard deviation of the bias scores
        const scores = results.map(r => r.biasScore);
        const max = Math.max(...scores);
        const min = Math.min(...scores);

        // Gap = Distance between the most right-leaning and most left-leaning coverage
        // If everyone agrees (all near 0 or all on one side), gap is small? 
        // Actually, "Polarization" is the distance between extremes.
        const gap = max - min;

        // Convert gap (0 to ~2) to Index (0 to 100)
        return Math.min(100, Math.round((gap / 2) * 100));
    }
}

// Mock Data for Initial State
export const MOCK_SOURCES: NewsSource[] = [
    { id: 'FOX', name: 'Eagle News', baseBias: 'CONSERVATIVE', biasWeight: 0.8 },
    { id: 'CNN', name: 'Global Daily', baseBias: 'PROGRESSIVE', biasWeight: 0.7 },
    { id: 'REUTERS', name: 'Wire Service', baseBias: 'NEUTRAL', biasWeight: 0.1 },
];
