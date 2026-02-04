import { ArticleCategory } from '../types';

export const CONFIG = {
    currentLang: 'ko' as const,
    theme: {
        fontSerif: 'font-serif',
        fontSans: 'font-sans',
    }
};

export const LABELS = {
    ko: {
        siteTitle: "NEURAL NEWS",
        siteSubtitle: "Veritas Vincit",
        nav: ["정치", "경제", "기술", "세계", "오피니언", "과학", "문화", "환경"],
        biasScore: "미디어 편향 지수",
        trendKeyword: "실시간 트렌드",
        tickerLabel: "속보",
        sourceCheck: "출처 검증됨",
        mapLabel: "관련 지역",
        networkLabel: "엔티티 관계도",
        biasLeft: "진보 성향",
        biasRight: "보수 성향",
        biasCenter: "중립",
        backToList: "목록으로 돌아가기",
        search: "검색",
        searchPlaceholder: "뉴스 검색...",
        close: "닫기",
        bookmark: "북마크",
        share: "공유",
        print: "인쇄",
        subscribe: "구독하기",
        perspectives: "언론사별 시각",
        linkCopied: "링크가 복사되었습니다",
        joinNow: "가입하기",
        filter: "필터",
        sort: "정렬",
        allCategories: "전체",
        sortByImpact: "영향력순",
        sortByDate: "최신순",
        sortByPopularity: "인기순",
        bookmarked: "북마크됨",
    },
    en: {
        siteTitle: "NEURAL NEWS",
        siteSubtitle: "Veritas Vincit",
        nav: ["Politics", "Economy", "Tech", "World", "Opinion", "Science", "Culture", "Environment"],
        biasScore: "Media Bias Index",
        trendKeyword: "Trending Now",
        tickerLabel: "BREAKING",
        sourceCheck: "Verified Sources",
        mapLabel: "Geospatial Context",
        networkLabel: "Entity Network",
        biasLeft: "Left Leaning",
        biasRight: "Right Leaning",
        biasCenter: "Center",
        backToList: "Back to Feed",
        search: "Search",
        searchPlaceholder: "Search news...",
        close: "Close",
        bookmark: "Bookmark",
        share: "Share",
        print: "Print",
        subscribe: "Subscribe",
        perspectives: "Perspectives",
        linkCopied: "Link copied",
        subscribeEmail: "Email address",
        joinNow: "JOIN NOW",
        filter: "Filter",
        sort: "Sort",
        allCategories: "All",
        sortByImpact: "Impact",
        sortByDate: "Latest",
        sortByPopularity: "Popular",
        bookmarked: "Bookmarked",
    }
} as const;

export const TEXT = LABELS[CONFIG.currentLang as keyof typeof LABELS] || LABELS.en;

// Category mapping
export const CATEGORY_MAP: Record<string, ArticleCategory> = {
    "정치": ArticleCategory.POLITICS,
    "경제": ArticleCategory.ECONOMY,
    "기술": ArticleCategory.TECH,
    "세계": ArticleCategory.WORLD,
    "오피니언": ArticleCategory.OPINION,
    "과학": ArticleCategory.SCIENCE,
    "문화": ArticleCategory.CULTURE,
    "환경": ArticleCategory.ENVIRONMENT,
};
export const BREAKING_NEWS_ITEMS = [
    "2026 지방선거: 서울시장 후보 토론회 생중계 중",
    "삼성전자, 3nm 공정 수율 85% 달성 공식 발표",
    "국회, 'AI 기본법' 본회의 통과... 세계 최초 포괄적 규제",
    "한국형 달 탐사선 다누리 2호, 궤도 진입 성공",
    "속보: 수도권 광역급행철도(GTX-B) 전 구간 개통식"
];
