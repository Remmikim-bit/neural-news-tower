import { ArticleCategory } from '../types';
import type { NewsEvent, EventPhase } from '../types';

export const mockEvents: NewsEvent[] = [
    {
        id: 'ev-sewol-2014',
        title: '세월호 참사',
        description: '2014년 4월 16일 진도 인근 해상에서 발생한 여객선 침몰 사고 이후의 전 과정',
        summary: '세월호 침몰 사고부터 정부의 대응, 진상 규명 위원회 활동, 정무적 파장까지를 포함한 타임라인입니다.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sewol_Sinking.jpg/1200px-Sewol_Sinking.jpg', // Placeholder
        category: ArticleCategory.SOCIETY, // Note: SOCIETY category might need to be added to ArticleCategory enum if missing
        status: 'HISTORICAL',
        startDate: '2014-04-16',
        relatedEntities: ['정부', '해경', '단원고', '유가족'],
        tags: ['참사', '안전', '진상규명'],
        phases: [
            {
                id: 'phase-1-sinking',
                eventId: 'ev-sewol-2014',
                date: '2014-04-16',
                title: '세월호 침몰 및 초기 현장 상황',
                description: '사고 발생 직후의 긴박한 현장 상황과 초기 구조 활동 정보',
                contentMarkdown: `
### 사고 발생 및 구조 지연
2014년 4월 16일 오전 8시 50분경, 전라남도 진도군 조도면 부근 해상에서 청해진해운 소속의 여객선 세월호가 침몰했습니다.

**주요 상황:**
- 배의 모습: 좌현으로 급격히 기울어짐
- 실종자 수: 초기 300여 명으로 집계
- 정부 브리핑: "전원 구조" 오보 소동 발생

현장은 조류가 강해 수중 수색이 지연되었으며, 해경의 초기 대응 미숙이 도마 위에 올랐습니다.
        `,
                relatedArticles: ['art-001', 'art-002'],
                importance: 5
            },
            {
                id: 'phase-2-response',
                eventId: 'ev-sewol-2014',
                date: '2014-04-20',
                title: '대책본부 대응 및 구조 방식 논란',
                description: '정부의 구조 방식, 범대본 브리핑, 구조 내역 업데이트',
                contentMarkdown: `
### 범정부 사고대책본부 가동
정부는 목포에 대책본부를 구성하고 해경과 해군을 투입했습니다.

**구조 방식:**
- 다이빙벨 투입 논란
- 잠수부 교대 수색 진행
- 유가족들의 강력한 항의 및 오열

정부의 실종자 명단 관리 부실과 늑장 대응에 대한 비판이 고조되었습니다.
        `,
                relatedArticles: ['art-003', 'art-004'],
                importance: 4
            },
            {
                id: 'phase-3-investigation',
                eventId: 'ev-sewol-2014',
                date: '2015-01-01',
                title: '진상규명 및 조사위 활동',
                description: '조사위 내용, 여야 충돌, 세월호 특별법 제정 과정',
                contentMarkdown: `
### 세월호 참사 특별조사위원회 발족
참사의 원인과 구조 과정의 문제점을 밝히기 위한 특조위가 발족되었습니다.

**핵심 쟁점:**
- 참사 당시 대통령의 행적 7시간
- 여야 간의 조사 권한 합의 난항
- 선체 인양 계획 수립

정치권의 충돌 속에서도 유가족들은 거리에서 진실 규명을 외쳤습니다.
        `,
                relatedArticles: ['art-005'],
                importance: 4
            }
        ]
    }
];
