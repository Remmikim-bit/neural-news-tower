import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsFeed } from '../components/feed/NewsFeed';
import { useNews } from '../hooks/useNews';
import { useUIStore } from '../store/useUIStore';
import { SortOption } from '../types';
import { TREND_KEYWORDS } from '../data/mockNews';

export const FeedPage = () => {
    const navigate = useNavigate();
    const { articles: liveArticles } = useNews();
    const {
        activeCategory,
        searchQuery,
        sortBy,
        setSortBy,
        setSearchQuery
    } = useUIStore();

    const [trendData, setTrendData] = useState(TREND_KEYWORDS);

    // Trending keywords auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setTrendData(prev => prev.map(item => {
                const change = Math.floor(Math.random() * 7) - 3;
                return {
                    ...item,
                    changeAmount: change,
                    change: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'same' as const
                };
            }));
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const filteredArticles = useMemo(() => {
        let filtered = liveArticles;

        if (activeCategory) {
            filtered = filtered.filter(article => article.category === activeCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.summary.toLowerCase().includes(query) ||
                article.tags?.some(tag => tag.toLowerCase().includes(query)) ||
                article.source.toLowerCase().includes(query)
            );
        }

        const sorted = [...filtered];
        switch (sortBy) {
            case SortOption.DATE:
                sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                break;
            case SortOption.POPULARITY:
                sorted.sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
                break;
            case SortOption.IMPACT:
            default:
                sorted.sort((a, b) => (b.priority || 0) - (a.priority || 0));
                break;
        }

        return sorted;
    }, [liveArticles, activeCategory, searchQuery, sortBy]);

    const handleTrendClick = (keyword: string) => {
        setSearchQuery(keyword);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectArticle = (article: any) => {
        if (article.eventId) {
            navigate(`/event/${article.eventId}`);
        } else {
            console.log("No event linked to article:", article.id);
        }
    };

    const handleSelectEvent = (eventId: string) => {
        navigate(`/event/${eventId}`);
    };

    return (
        <NewsFeed
            articles={filteredArticles}
            trendData={trendData}
            onSelectArticle={handleSelectArticle}
            onTrendClick={handleTrendClick}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSelectEvent={handleSelectEvent}
        />
    );
};
