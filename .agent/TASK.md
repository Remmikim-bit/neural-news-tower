# 🎯 Neural News Tower - 엔지니어링 고도화 및 기능 완성

> **시니어 프로그래머의 피드백을 반영한 리팩토링 및 기능 완성 로드맵**

## 📌 핵심 목표
1. **아키텍처 개선**: 'God Component'(`App.tsx`) 분리 및 관심사 분리(SoC) 실현
2. **상태 관리 현대화**: 중앙 집중식 상태 관리 및 라우팅 도입
3. **기능 완성**: 미구현된 시각화 모듈 및 인터랙티브 요소 실제 동작 구현
4. **유지보수성 향상**: 설정 데이터 분리 및 타입 시스템 고도화

---

## 🏗️ Phase 0: 아키텍처 및 인프라 (Refactoring) - **우선 순위: 최고**

### 0.1 God Component (`App.tsx`) 분해
- [ ] UI 컴포넌트 추출 및 파일 분리
  - `Header`, `Footer`, `MobileMenu`, `SearchModal`, `BreakingTicker`
  - `NewsFeed`, `ArticleCard`, `HeroCard`
- [ ] 유틸리티 컴포넌트 추출
  - `BiasMeter`, `MarkdownViewer`, `WorldMap`, `EntityNetworkBlock`

### 0.2 설정 및 상수 데이터 분리 (`src/config/`)
- [ ] 다국어 레이블(`LABELS`) 및 카테고리 맵(`CATEGORY_MAP`) 추출
- [ ] 시스템 설정값(`CONFIG`) 및 정적 상수 데이터 이동

### 0.3 상태 관리 및 라우팅 시스템 도입
- [ ] **중앙 상태 관리**: Zustand 또는 Context API를 활용한 전역 UI/데이터 상태 관리
- [ ] **라우팅**: `react-router-dom` 도입 (게시글 상세, 그래프View 등 URL 연동)

### 0.4 타입 시스템 및 에러 핸들링
- [ ] `types.ts` 파일을 도메인별로 분리 (`article.ts`, `ui.ts` 등)
- [ ] `ErrorBoundary` 도입 및 전역 에러 UI/로깅 시스템 구축

---

## 🔍 Phase 1: 데이터 구조 및 모델링 (Data Architecture)

### 1.1 뉴스 데이터 모델 확장
- [ ] `NewsArticle` 인터페이스 확장 (태그/키워드, 관련 기사 링크, 멀티미디어 지원)
- [ ] 작성자/편집자 및 출처 신뢰도 데이터 추가

### 1.2 사용자 및 반응 데이터
- [ ] 북마크 및 읽기 기록 데이터 모델 설계
- [ ] 개인화 설정 (테마, 관심 카테고리) 모델링

---

## 🛠️ Phase 2: 미구현 기능 완성 (Functional Completion)

### 2.1 인터랙티브 요소 구현
- [ ] **Bookmark**: LocalStorage/Firebase 기반 북마크 시스템 완성
- [ ] **Share**: Web Share API 연동
- [ ] **Search**: 실제 검색 알고리즘 또는 Algolia/Firebase 검색 연동

### 2.2 시각화 모듈 구현
- [ ] **Entity Network**: D3.js 또는 React-Force-Graph 실제 데이터 매핑 및 인터랙션 구현
- [ ] **Bias Analyzer**: 실제 감성 분석 알고리즘 고도화 및 시각화 반영

---

## 🧪 Phase 3: 테스트 및 안정화

### 3.1 성능 및 접근성
- [ ] 번들 최적화 (Code Splitting)
- [ ] 이미지 Lazy Loading 및 웹 최적화
- [ ] 접근성(A11y) 레이블 및 키보드 네비게이션 검증

### 3.2 배포 안정성
- [ ] Firebase Security Rules 설정
- [ ] Vercel 빌드 최적화 및 에러 트래킹 적용

---

## 🚀 실행 우선순위 (Updated)

### 🔥 High (Phase 0 - 즉시 실행)
1. `App.tsx` 컴포넌트 파일 단위 분리
2. `src/config` 설정 데이터 추출
3. `react-router-dom` 라우팅 기본 구조 잡기

### ⚡ Medium (Phase 1 & 2)
1. Zustand를 활용한 전역 상태 관리 전환
2. Entity Network 실제 데이터 연동
3. 북마크 및 공유 기능 완성

### 🧊 Low
1. 애니메이션 디테일 조정
2. 추가 다국어 지원 (예: JP, CN)
3. 관리자 전용 데이터 업로드 도구

---

## 📦 최종 성과물 (Deliverables)

1. **클린 아키텍처**: 컴포넌트 중심의 모듈화된 폴더 구조
2. **확장된 데이터 모델**: 실제 서비스 운영 가능한 수준의 스키마
3. **완성된 서비스**: 모든 버튼과 시각화 요소가 실제 데이터와 연동됨
4. **구조화된 문서**: `DATA_STRUCTURE.md` 및 `ARCHITECTURE.md`
