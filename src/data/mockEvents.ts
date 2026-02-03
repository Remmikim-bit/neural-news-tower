import { ArticleCategory } from '../types';
import type { NewsEvent } from '../types';

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
                importance: 5,
                perspectives: [
                    { source: "KBS", sourceId: "kbs", opinion: "사실 전달", summary: "정부 공식 브리핑 위주의 속보 전달", link: "#", bias: 50 },
                    { source: "뉴스타파", sourceId: "newstapa", opinion: "현장 밀착", summary: "현장의 혼란과 구조 지연 상황 생중계", link: "#", bias: 20 }
                ],
                biasStatistics: {
                    averageScore: 35,
                    label: "현장 중심"
                }
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
                importance: 4,
                perspectives: [
                    { source: "조선일보", sourceId: "chosun", opinion: "신중론", summary: "다이빙벨 투입의 실효성에 의문 제기", link: "#", bias: 70 },
                    { source: "한겨레", sourceId: "hani", opinion: "비판적", summary: "정부의 통제와 구조 실패에 대한 강력한 비판", link: "#", bias: 30 }
                ],
                biasStatistics: {
                    averageScore: 50,
                    label: "의견 양분"
                }
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
                importance: 4,
                perspectives: [
                    { source: "JTBC", sourceId: "jtbc", opinion: "적극적", summary: "진상규명의 필요성 및 새로운 증거 보도에 집중", link: "#", bias: 35 },
                    { source: "동아일보", sourceId: "donga", opinion: "비판적", summary: "조사위 활동의 정치적 편향성 문제 제기", link: "#", bias: 75 }
                ],
                biasStatistics: {
                    averageScore: 55,
                    label: "논쟁적"
                }
            }
        ]
    },
    {
        id: 'ev-ai-regulation-2024',
        title: '글로벌 AI 규제 협약',
        description: '2024년 G7 정상회의를 기점으로 시작된 전 세계적인 AI 규제 흐름',
        summary: '유럽연합의 AI 법안 통과부터 G7 서울-파리 선언까지, AI의 안전한 개발을 위한 국제 사회의 노력과 갈등.',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
        category: ArticleCategory.TECH,
        status: 'ONGOING',
        startDate: '2024-03-15',
        relatedEntities: ['OpenAI', 'Google', 'EU', 'UN'],
        tags: ['AI', '규제', '국제협약'],
        phases: [
            {
                id: 'phase-1-agreement',
                eventId: 'ev-ai-regulation-2024',
                date: '2024-03-15',
                title: 'G7 서울-파리 선언 채택',
                description: 'G7 정상들의 만장일치로 AI 안전 협약 통과',
                contentMarkdown: `### 만장일치 합의\n전 세계 주요국 정상들이 AI 안전을 위한 첫 걸음을 내딛었습니다.\n\n**핵심 내용:**\n- 투명성 확보\n- 워터마크 의무화`,
                relatedArticles: ['1'],
                importance: 5,
                perspectives: [
                    { source: "TechCrunch", sourceId: "tc", opinion: "환영", summary: "필요한 안전장치 마련", link: "#", bias: 40 },
                    { source: "VentureBeat", sourceId: "vb", opinion: "우려", summary: "혁신 저해 가능성", link: "#", bias: 60 }
                ],
                biasStatistics: { averageScore: 50, label: "중립적" }
            }
        ]
    }
];
