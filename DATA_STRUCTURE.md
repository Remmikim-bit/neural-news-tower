# 📊 Neural News Tower - Data Structure Documentation

## 🎯 Overview

이 문서는 Neural News Tower의 전체 데이터 구조를 정의합니다. 확장 가능하고 유지보수가 용이한 뉴스 플랫폼을 위한 타입 시스템과 데이터 모델을 제공합니다.

---

## 📰 Core Data Models

### 1. NewsArticle (기사)

```typescript
interface NewsArticle {
  // 기본 정보
  id: string;                    // 고유 식별자 (UUID)
  slug: string;                  // URL-friendly 식별자
  title: string;                 // 기사 제목
  subtitle?: string;             // 부제목 (선택사항)
  summary: string;               // AI 생성 요약
  
  // 콘텐츠
  contentMarkdown: string;       // 마크다운 형식 본문
  contentHtml?: string;          // HTML 변환 캐시 (선택사항)
  excerpt: string;               // 짧은 발췌문 (리스트 표시용)
  
  // 분류
  category: ArticleCategory;     // 주 카테고리
  subcategory?: string;          // 하위 카테고리
  tags: string[];                // 태그 배열
  keywords: string[];            // 검색 키워드
  
  // 메타데이터
  source: NewsSource;            // 출처 정보
  author?: Author;               // 작성자 정보
  publishedAt: string;           // 발행 시간 (ISO 8601)
  updatedAt?: string;            // 수정 시간
  readingTime: number;           // 예상 읽기 시간 (분)
  
  // 분석 데이터
  bias: BiasScore;               // 편향 분석 결과
  sentiment: SentimentScore;     // 감정 분석 결과
  factCheck: FactCheckResult;    // 팩트체크 결과
  
  // 미디어
  media: MediaAsset[];           // 이미지, 비디오 등
  thumbnail?: MediaAsset;        // 대표 이미지
  
  // 지리 및 엔티티
  relatedCountries: string[];    // ISO 2자리 국가 코드
  relatedRegions?: string[];     // 지역 코드
  entities: Entity[];            // 인물, 조직, 장소 등
  
  // 관계
  relatedArticles?: string[];    // 관련 기사 ID
  previousVersions?: string[];   // 이전 버전 ID (업데이트 추적)
  
  // 상호작용
  stats: ArticleStats;           // 조회수, 공유 등
  
  // 시스템
  status: ArticleStatus;         // 발행 상태
  featured: boolean;             // 메인 노출 여부
  priority: number;              // 우선순위 (0-100)
}
```

### 2. ArticleCategory (카테고리)

```typescript
enum ArticleCategory {
  POLITICS = 'POLITICS',       // 정치
  ECONOMY = 'ECONOMY',         // 경제
  TECH = 'TECH',               // 기술
  WORLD = 'WORLD',             // 세계
  OPINION = 'OPINION',         // 오피니언
  SCIENCE = 'SCIENCE',         // 과학
  CULTURE = 'CULTURE',         // 문화
  SPORTS = 'SPORTS',           // 스포츠
  HEALTH = 'HEALTH',           // 건강
  ENVIRONMENT = 'ENVIRONMENT', // 환경
}

// 카테고리 메타데이터
interface CategoryMeta {
  id: ArticleCategory;
  label: Record<string, string>;  // 다국어 라벨
  description: string;
  color: string;                  // 테마 컬러
  icon: string;                   // 아이콘 이름
}
```

### 3. BiasScore (편향 점수)

```typescript
interface BiasScore {
  overall: number;              // 전체 점수 (0-100)
  political: number;            // 정치적 편향
  economic: number;             // 경제적 편향
  social: number;               // 사회적 편향
  
  // 상세 분석
  analysis: {
    leftIndicators: string[];   // 진보 성향 지표
    rightIndicators: string[];  // 보수 성향 지표
    neutralIndicators: string[]; // 중립 지표
  };
  
  // 신뢰도
  confidence: number;           // 분석 신뢰도 (0-1)
  methodology: string;          // 분석 방법론
  
  // 비교
  sourceAverage?: number;       // 해당 출처 평균
  categoryAverage?: number;     // 카테고리 평균
}
```

### 4. NewsSource (출처)

```typescript
interface NewsSource {
  id: string;
  name: string;
  nameKo?: string;              // 한글 이름
  type: SourceType;             // 출처 유형
  
  // 신뢰도
  credibility: number;          // 신뢰도 점수 (0-100)
  verificationStatus: VerificationStatus;
  
  // 메타데이터
  url: string;
  logo?: string;
  country: string;              // ISO 2자리 코드
  language: string;             // ISO 639-1 코드
  
  // 분석
  averageBias: number;          // 평균 편향 점수
  politicalLeaning: PoliticalLeaning;
  
  // 통계
  articleCount: number;
  lastUpdated: string;
}

enum SourceType {
  NEWSPAPER = 'NEWSPAPER',
  MAGAZINE = 'MAGAZINE',
  BROADCAST = 'BROADCAST',
  ONLINE = 'ONLINE',
  WIRE = 'WIRE',              // 통신사
  BLOG = 'BLOG',
  SOCIAL = 'SOCIAL',
}

enum VerificationStatus {
  VERIFIED = 'VERIFIED',
  PENDING = 'PENDING',
  UNVERIFIED = 'UNVERIFIED',
  FLAGGED = 'FLAGGED',
}

enum PoliticalLeaning {
  FAR_LEFT = 'FAR_LEFT',
  LEFT = 'LEFT',
  CENTER_LEFT = 'CENTER_LEFT',
  CENTER = 'CENTER',
  CENTER_RIGHT = 'CENTER_RIGHT',
  RIGHT = 'RIGHT',
  FAR_RIGHT = 'FAR_RIGHT',
}
```

### 5. Entity (엔티티)

```typescript
interface Entity {
  id: string;
  name: string;
  type: EntityType;
  
  // 메타데이터
  description?: string;
  aliases?: string[];           // 별칭
  
  // 관계
  relatedEntities?: string[];   // 관련 엔티티 ID
  
  // 시각화
  importance: number;           // 중요도 (0-1)
  sentiment?: number;           // 감정 점수 (-1 ~ 1)
  
  // 추가 정보
  metadata?: Record<string, any>;
}

enum EntityType {
  PERSON = 'PERSON',
  ORGANIZATION = 'ORGANIZATION',
  LOCATION = 'LOCATION',
  EVENT = 'EVENT',
  PRODUCT = 'PRODUCT',
  CONCEPT = 'CONCEPT',
}
```

### 6. MediaAsset (미디어 자산)

```typescript
interface MediaAsset {
  id: string;
  type: MediaType;
  url: string;
  
  // 메타데이터
  caption?: string;
  credit?: string;              // 저작권 정보
  alt: string;                  // 접근성 텍스트
  
  // 이미지 전용
  width?: number;
  height?: number;
  thumbnails?: {
    small: string;
    medium: string;
    large: string;
  };
  
  // 비디오 전용
  duration?: number;            // 초 단위
  thumbnail?: string;
  
  // 시스템
  uploadedAt: string;
  size: number;                 // 바이트
}

enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
}
```

### 7. ArticleStats (통계)

```typescript
interface ArticleStats {
  views: number;                // 조회수
  shares: number;               // 공유 횟수
  bookmarks: number;            // 북마크 횟수
  
  // 상세 통계
  sharesByPlatform?: {
    twitter: number;
    facebook: number;
    linkedin: number;
    email: number;
    other: number;
  };
  
  // 시간대별
  viewsByHour?: number[];       // 24시간 배열
  
  // 참여도
  engagementRate: number;       // 참여율 (0-1)
  averageReadTime: number;      // 평균 읽기 시간 (초)
}
```

### 8. User (사용자)

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  
  // 설정
  preferences: UserPreferences;
  
  // 활동
  bookmarks: string[];          // 북마크한 기사 ID
  readHistory: ReadHistoryItem[];
  
  // 메타데이터
  createdAt: string;
  lastLoginAt: string;
}

interface UserPreferences {
  language: string;             // 선호 언어
  theme: 'light' | 'dark' | 'auto';
  
  // 알림
  notifications: {
    email: boolean;
    push: boolean;
    categories: ArticleCategory[];
  };
  
  // 개인화
  interests: string[];          // 관심 태그
  blockedSources?: string[];    // 차단한 출처
}

interface ReadHistoryItem {
  articleId: string;
  readAt: string;
  readDuration: number;         // 초 단위
  scrollDepth: number;          // 0-1
}
```

---

## 🔍 Search & Filter Models

### SearchQuery

```typescript
interface SearchQuery {
  q: string;                    // 검색어
  
  // 필터
  categories?: ArticleCategory[];
  tags?: string[];
  sources?: string[];
  dateFrom?: string;
  dateTo?: string;
  
  // 편향 필터
  biasMin?: number;
  biasMax?: number;
  
  // 정렬
  sortBy: SortOption;
  sortOrder: 'asc' | 'desc';
  
  // 페이지네이션
  page: number;
  pageSize: number;
}

enum SortOption {
  RELEVANCE = 'RELEVANCE',
  DATE = 'DATE',
  POPULARITY = 'POPULARITY',
  IMPACT = 'IMPACT',
  BIAS = 'BIAS',
}

interface SearchResult {
  articles: NewsArticle[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacets;
}

interface SearchFacets {
  categories: { [key: string]: number };
  sources: { [key: string]: number };
  tags: { [key: string]: number };
  dateRange: {
    min: string;
    max: string;
  };
}
```

---

## 📡 API Response Models

### API Response Wrapper

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}

interface ApiError {
  code: string;
  message: string;
  details?: any;
}
```

### Pagination

```typescript
interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

---

## 🗄️ Database Schema (참고용)

### Collections/Tables

```
articles/
  - id (PK)
  - slug (unique)
  - title
  - content
  - category
  - source_id (FK)
  - author_id (FK)
  - published_at
  - ...

sources/
  - id (PK)
  - name
  - credibility
  - ...

entities/
  - id (PK)
  - name
  - type
  - ...

article_entities/
  - article_id (FK)
  - entity_id (FK)
  - importance

users/
  - id (PK)
  - email (unique)
  - ...

bookmarks/
  - user_id (FK)
  - article_id (FK)
  - created_at

read_history/
  - user_id (FK)
  - article_id (FK)
  - read_at
  - duration
```

---

## 🎨 Frontend State Models

### App State

```typescript
interface AppState {
  // 데이터
  articles: NewsArticle[];
  sources: NewsSource[];
  categories: CategoryMeta[];
  
  // UI 상태
  ui: {
    selectedArticle: string | null;
    searchQuery: string;
    activeCategory: ArticleCategory | null;
    sidebarOpen: boolean;
    searchModalOpen: boolean;
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
```

---

## 📝 Usage Examples

### 기사 생성 예시

```typescript
const article: NewsArticle = {
  id: 'uuid-1234',
  slug: 'global-ai-regulation-agreement',
  title: '글로벌 AI 규제 합의안 도출',
  summary: 'G7 정상회의에서 AI 안전 협약이 통과되었습니다.',
  contentMarkdown: '### 주요 내용\n...',
  excerpt: 'G7 정상회의에서...',
  
  category: ArticleCategory.TECH,
  tags: ['AI', '규제', 'G7'],
  keywords: ['인공지능', '규제', '국제협약'],
  
  source: {
    id: 'source-1',
    name: 'The Daily Insight',
    type: SourceType.ONLINE,
    credibility: 85,
    verificationStatus: VerificationStatus.VERIFIED,
    // ...
  },
  
  publishedAt: '2024-03-15T14:30:00Z',
  readingTime: 5,
  
  bias: {
    overall: 45,
    political: 40,
    economic: 50,
    social: 45,
    confidence: 0.85,
    methodology: 'NLP-based sentiment analysis',
    analysis: {
      leftIndicators: ['규제 필요성 강조'],
      rightIndicators: ['기업 부담 우려'],
      neutralIndicators: ['객관적 사실 전달'],
    },
  },
  
  media: [
    {
      id: 'media-1',
      type: MediaType.IMAGE,
      url: 'https://example.com/image.jpg',
      alt: 'G7 정상회의 현장',
      caption: 'G7 정상들이 AI 안전 협약에 서명하고 있다',
    },
  ],
  
  relatedCountries: ['KR', 'US', 'EU'],
  entities: [
    {
      id: 'entity-1',
      name: 'Sam Altman',
      type: EntityType.PERSON,
      importance: 0.9,
    },
  ],
  
  stats: {
    views: 1250,
    shares: 45,
    bookmarks: 23,
    engagementRate: 0.15,
    averageReadTime: 180,
  },
  
  status: ArticleStatus.PUBLISHED,
  featured: true,
  priority: 90,
};
```

---

## 🚀 Next Steps

1. **타입 정의 파일 생성**: `src/types/index.ts`
2. **Mock Data 확장**: 최소 20개 기사 생성
3. **API 클라이언트 구현**: 데이터 fetching 로직
4. **State Management**: Context API 또는 Zustand
5. **검색 엔진**: Fuse.js 또는 MiniSearch 통합

---

## 📚 References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JSON Schema](https://json-schema.org/)
- [REST API Best Practices](https://restfulapi.net/)
