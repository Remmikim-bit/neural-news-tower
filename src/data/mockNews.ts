/**
 * Mock Data for Neural News Tower
 * 
 * 개발 및 테스트용 샘플 뉴스 데이터
 */

import type { NewsArticle, TrendKeyword } from '../types.ts';
import { ArticleCategory } from '../types.ts';

export const MOCK_NEWS: NewsArticle[] = [
    {
        id: '1',
        slug: 'global-ai-regulation-agreement',
        title: "글로벌 AI 규제 합의안 도출, 한국 기업에 미칠 영향은?",
        summary: "G7 정상회의에서 AI 안전 협약이 만장일치로 통과되었다. 국내 반도체 및 플랫폼 기업들의 규제 대응 비용 증가가 예상된다.",
        category: ArticleCategory.TECH,
        source: "The Daily Insight",
        eventId: "ev-ai-regulation-2024",
        bias: 45,
        timestamp: "2024-03-15T14:30:00Z",
        readingTime: 5,
        perspectives: [
            {
                source: '조선일보',
                sourceId: 'chosun',
                opinion: '보수적 실용주의',
                summary: '정부의 정책 실패와 예산 낭비를 지적하며, 보다 근본적인 규제 완화와 경제적 유인책의 필요성을 강조함.',
                link: 'https://www.chosun.com/national/2026/02/02/example1',
                bias: 85
            },
            {
                source: '중앙일보',
                sourceId: 'joongang',
                opinion: '중도 보수',
                summary: '현상 유지의 위험성을 경고하며 사회 구조적 개편과 교육 시스템의 혁신적인 변화가 병행되어야 함을 역설.',
                link: 'https://www.joongang.co.kr/article/2026/02/02/example2',
                bias: 65
            },
            {
                source: '한겨레',
                sourceId: 'hankyoreh',
                opinion: '진보적 평등주의',
                summary: '불평등 해소와 주거권 보장이 핵심임을 주장하며, 보편적 복지 확대와 근로 환경의 발본적 개선을 촉구.',
                link: 'https://www.hani.co.kr/arti/society/example3',
                bias: 15
            },
            {
                source: '경향신문',
                sourceId: 'kyunghyang',
                opinion: '비판적 진보',
                summary: '자본 중심의 논리를 비판하며 여성의 독자적인 삶의 질 향상과 성평등한 가사 분담 문화 정착이 우선순위임을 강조.',
                link: 'https://www.khan.co.kr/national/example4',
                bias: 20
            }
        ],
        relatedCountries: ['KR', 'US', 'EU'],
        entities: ['Sam Altman', 'Ministry of Science', 'Samsung'],
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
        tags: ['AI', '규제', 'G7', '국제협약'],
        featured: true,
        priority: 90,
        contentMarkdown: `
### 역사적인 합의, 그러나 과제는 남았다
G7 정상들은 어제 파리에서 열린 회의에서 **'AI 서울-파리 선언'**을 채택했다. 이 선언은 고성능 AI 모델의 개발을 투명하게 공개하고, 위험성 평가를 의무화하는 것을 골자로 한다.

#### 주요 쟁점
1. **투명성 의무화**: 학습 데이터의 출처를 명기해야 함.
2. **워터마킹**: AI 생성 콘텐츠에 식별 표지 의무화.
3. **벌금 부과**: 위반 시 매출의 최대 7% 벌금.

전문가들은 이번 규제가 한국의 **네이버(Naver)**나 **삼성전자** 같은 기업들에게 단기적인 비용 부담으로 작용할 수 있다고 경고했다. "혁신을 저해할 수 있다"는 우려와 "안전장치가 필수적이다"라는 의견이 팽팽히 맞서고 있다.
    `
    },
    {
        id: '2',
        slug: 'fed-rate-cut-delay',
        title: "미 연준, 금리 인하 시기 '신중론' 재확인... 시장 실망감",
        summary: "파월 의장의 발언 이후 나스닥은 1.2% 하락 마감했다. 물가 상승 압력이 여전히 존재한다는 판단이다.",
        category: ArticleCategory.ECONOMY,
        source: "Market Watcher",
        bias: 75,
        timestamp: "2024-03-15T11:00:00Z",
        readingTime: 4,
        relatedCountries: ['US'],
        entities: ['Jerome Powell', 'Federal Reserve', 'Wall Street'],
        imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
        tags: ['연준', '금리', '경제', '주식시장'],
        priority: 85,
        contentMarkdown: `
### 시장의 기대는 시기상조였나
연방준비제도(Fed) 의장은 오늘 기자회견에서 "인플레이션이 2% 목표치로 수렴한다는 확신이 들 때까지 금리 인하를 서두르지 않겠다"고 밝혔다.

* **나스닥**: -1.2%
* **S&P 500**: -0.8%
* **국채 금리**: 상승세 전환

경제 전문가들은 "고용 지표가 여전히 강력하기 때문에 연준이 굳이 부양책을 쓸 이유가 없다"고 분석했다. 이는 보수적인 통화 정책을 지지하는 진영의 논리와 일치한다.
    `
    },
    {
        id: '3',
        slug: 'middle-east-oil-crisis',
        title: "중동 정세 불안정 심화, 유가 90달러 돌파 위기",
        summary: "호르무즈 해협의 긴장감이 고조되면서 국제 유가가 급등하고 있다. 에너지 수급 대책이 시급하다.",
        category: ArticleCategory.WORLD,
        source: "Global Times",
        bias: 20,
        timestamp: "2024-03-15T09:15:00Z",
        readingTime: 6,
        relatedCountries: ['IR', 'SA', 'US'],
        entities: ['OPEC', 'UN Security Council'],
        imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1000&auto=format&fit=crop",
        tags: ['중동', '유가', '에너지', '국제정세'],
        priority: 80,
        contentMarkdown: `
### 에너지 안보 비상
중동 지역의 지정학적 리스크가 해소될 기미를 보이지 않고 있다. 어제 발생한 유조선 나포 시도 사건은 해당 해역의 안전에 심각한 우려를 제기했다.

국제 에너지 기구(IEA)는 "공급망 충격이 현실화될 경우, 전 세계적인 인플레이션 재발이 불가피하다"고 경고했다. 각국 정부는 비상 비축유 방출을 검토 중이다.
    `
    },
    {
        id: '4',
        slug: 'quantum-computing-breakthrough',
        title: "양자컴퓨터, 암호화 해독 가능성 입증... 보안 대책 시급",
        summary: "IBM 연구팀이 기존 암호화 알고리즘을 양자컴퓨터로 해독하는 데 성공했다. 금융권과 정부 기관의 보안 체계 전면 재검토가 필요하다.",
        category: ArticleCategory.TECH,
        source: "Tech Review",
        bias: 50,
        timestamp: "2024-03-14T16:45:00Z",
        readingTime: 7,
        relatedCountries: ['US', 'KR', 'CN'],
        entities: ['IBM', 'NSA', 'NIST'],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
        tags: ['양자컴퓨터', '암호화', '보안', '기술'],
        priority: 75,
        contentMarkdown: `
### 암호화의 종말인가, 새로운 시작인가
IBM의 양자컴퓨팅 연구소는 1024큐비트 프로세서를 사용해 RSA-2048 암호화를 이론적으로 해독할 수 있음을 증명했다.

#### 영향받는 분야
* 금융 거래 시스템
* 정부 기밀 통신
* 블록체인 및 암호화폐
* 개인정보 보호

전문가들은 "양자 내성 암호화(Post-Quantum Cryptography)"로의 전환이 시급하다고 강조한다.
    `
    },
    {
        id: '5',
        slug: 'climate-summit-paris-2024',
        title: "파리 기후정상회의, 2030 탄소중립 로드맵 합의",
        summary: "120개국 정상들이 참석한 가운데, 구속력 있는 탄소 감축 목표가 채택되었다. 개도국 지원 기금도 대폭 확대된다.",
        category: ArticleCategory.ENVIRONMENT,
        source: "Green Planet",
        bias: 30,
        timestamp: "2024-03-14T14:20:00Z",
        readingTime: 8,
        relatedCountries: ['FR', 'US', 'CN', 'IN', 'BR'],
        entities: ['UN Climate', 'Greta Thunberg', 'European Commission'],
        imageUrl: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=1000&auto=format&fit=crop",
        tags: ['기후변화', '환경', '탄소중립', '국제협약'],
        priority: 70,
        contentMarkdown: `
### 역사적 합의, 실행이 관건
파리에서 열린 제29차 기후정상회의(COP29)에서 각국 정상들은 2030년까지 탄소 배출량을 2020년 대비 50% 감축하기로 합의했다.

주요 내용:
* 선진국의 개도국 기후 기금 지원 연 5000억 달러로 확대
* 화석연료 보조금 단계적 폐지
* 재생에너지 투자 의무화

환경단체들은 환영하면서도 "구체적인 이행 계획이 부족하다"고 지적했다.
    `
    },
    {
        id: '6',
        slug: 'korea-election-polls-2024',
        title: "총선 D-30, 여야 지지율 오차범위 내 접전",
        summary: "최신 여론조사 결과, 여당 38%, 야당 36%로 박빙의 승부가 예상된다. 부동층이 20%에 달해 변수로 작용할 전망이다.",
        category: ArticleCategory.POLITICS,
        source: "Political Insight",
        bias: 55,
        timestamp: "2024-03-14T10:00:00Z",
        readingTime: 5,
        relatedCountries: ['KR'],
        entities: ['National Assembly', 'Election Commission'],
        imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1000&auto=format&fit=crop",
        tags: ['총선', '정치', '여론조사', '선거'],
        priority: 85,
        contentMarkdown: `
### 부동층이 결정할 선거
한국갤럽이 실시한 여론조사(신뢰수준 95%, 표본오차 ±3.1%p)에 따르면, 여야 지지율이 오차범위 내에서 팽팽한 것으로 나타났다.

지역별 분석:
* 수도권: 여당 40%, 야당 38%
* 영남권: 여당 52%, 야당 28%
* 호남권: 여당 15%, 야당 65%

정치 전문가들은 "부동층의 선택이 승패를 가를 것"이라고 전망했다.
    `
    },
    {
        id: '7',
        slug: 'tesla-model-y-recall',
        title: "테슬라, 모델Y 200만대 리콜... 자율주행 소프트웨어 결함",
        summary: "미국 도로교통안전국(NHTSA)의 조사 결과, 자율주행 모드에서 급제동 오작동이 발견되었다. 테슬라는 무선 업데이트로 대응할 예정이다.",
        category: ArticleCategory.TECH,
        source: "Auto News",
        bias: 60,
        timestamp: "2024-03-13T18:30:00Z",
        readingTime: 4,
        relatedCountries: ['US', 'KR', 'CN'],
        entities: ['Tesla', 'Elon Musk', 'NHTSA'],
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
        tags: ['테슬라', '리콜', '자율주행', '자동차'],
        priority: 65,
        contentMarkdown: `
### 자율주행의 안전성 논란 재점화
테슬라는 모델Y 차량 약 200만 대에 대해 자발적 리콜을 실시한다고 발표했다. 문제는 Full Self-Driving(FSD) 베타 소프트웨어의 급제동 알고리즘에서 발견되었다.

테슬라 측은 "Over-The-Air(OTA) 업데이트로 신속히 해결할 것"이라고 밝혔지만, 소비자 단체들은 "하드웨어 점검도 필요하다"고 주장하고 있다.
    `
    },
    {
        id: '8',
        slug: 'bitcoin-halving-2024',
        title: "비트코인 반감기 임박, 가격 10만 달러 돌파 전망",
        summary: "4월 예정된 비트코인 반감기를 앞두고 투자자들의 관심이 집중되고 있다. 과거 반감기 이후 평균 300% 상승했다는 분석이 나온다.",
        category: ArticleCategory.ECONOMY,
        source: "Crypto Daily",
        bias: 65,
        timestamp: "2024-03-13T15:00:00Z",
        readingTime: 6,
        relatedCountries: ['US', 'KR', 'JP'],
        entities: ['Bitcoin', 'SEC', 'Coinbase'],
        imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop",
        tags: ['비트코인', '암호화폐', '반감기', '투자'],
        priority: 70,
        contentMarkdown: `
### 반감기 효과, 이번에도 통할까
비트코인 네트워크는 약 4년마다 채굴 보상이 절반으로 줄어드는 '반감기'를 맞이한다. 이번 반감기는 4월 중순으로 예상된다.

과거 반감기 후 가격 변동:
* 2012년: +8,000%
* 2016년: +2,800%
* 2020년: +700%

전문가들은 "이번에는 기관 투자자들의 참여가 크게 늘어 변동성이 줄어들 수 있다"고 분석한다.
    `
    },
    {
        id: '9',
        slug: 'medical-school-quota-increase',
        title: "의대 증원 2000명 확정... 의료계 반발 지속",
        summary: "정부가 의대 정원을 현행 3058명에서 5058명으로 늘리기로 최종 결정했다. 의사협회는 총파업을 예고했다.",
        category: ArticleCategory.POLITICS,
        source: "Health Policy",
        bias: 40,
        timestamp: "2024-03-13T12:00:00Z",
        readingTime: 7,
        relatedCountries: ['KR'],
        entities: ['Ministry of Health', 'Korean Medical Association'],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        tags: ['의대증원', '의료정책', '정치', '사회'],
        priority: 90,
        contentMarkdown: `
### 의료 공백 우려 vs 필수의료 강화
정부는 지역 의료 붕괴와 필수의료 인력 부족 문제를 해결하기 위해 의대 정원을 대폭 늘리기로 했다.

증원 계획:
* 2025학년도부터 단계적 시행
* 지역 의대 우선 배정
* 필수의료 전공 장려금 지급

의료계는 "의료 질 저하"를 우려하며 강력 반발하고 있으나, 정부는 "국민 건강권이 우선"이라는 입장이다.
    `
    },
    {
        id: '10',
        slug: 'nvidia-earnings-q4-2024',
        title: "엔비디아 실적 발표, AI 붐에 매출 265% 급증",
        summary: "4분기 매출이 221억 달러를 기록하며 시장 예상을 크게 상회했다. 데이터센터 부문이 전체 매출의 83%를 차지했다.",
        category: ArticleCategory.TECH,
        source: "Silicon Valley Report",
        bias: 70,
        timestamp: "2024-03-12T20:00:00Z",
        readingTime: 5,
        relatedCountries: ['US', 'KR', 'TW'],
        entities: ['NVIDIA', 'Jensen Huang', 'Microsoft'],
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop",
        tags: ['엔비디아', '실적', 'AI', '반도체'],
        priority: 80,
        contentMarkdown: `
### AI 골드러시의 최대 수혜자
엔비디아는 4분기 실적 발표에서 매출 221억 달러, 순이익 122억 달러를 기록했다고 밝혔다. 이는 전년 동기 대비 각각 265%, 486% 증가한 수치다.

주요 성장 동력:
* H100/H200 GPU 공급 부족
* ChatGPT 등 생성형 AI 수요 폭발
* 클라우드 기업들의 대규모 주문

젠슨 황 CEO는 "AI 혁명은 이제 시작 단계"라며 낙관적 전망을 제시했다.
    `
    },
    {
        id: '11',
        slug: 'korea-japan-summit-2024',
        title: "한일 정상회담, 경제안보 협력 강화 합의",
        summary: "양국 정상은 반도체 공급망 협력과 북한 위협 대응을 위한 안보 공조를 강화하기로 했다. 역사 문제는 여전히 평행선을 달렸다.",
        category: ArticleCategory.WORLD,
        source: "Diplomatic Times",
        bias: 48,
        timestamp: "2024-03-12T17:30:00Z",
        readingTime: 6,
        relatedCountries: ['KR', 'JP', 'US'],
        entities: ['Prime Minister', 'President'],
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
        tags: ['한일관계', '정상회담', '외교', '국제'],
        priority: 75,
        contentMarkdown: `
### 실리 외교의 성과, 역사 인식은 과제
서울에서 열린 한일 정상회담에서 양국은 경제와 안보 분야의 협력을 대폭 강화하기로 합의했다.

주요 합의 사항:
* 반도체 소재·부품·장비 공급망 협력
* 북한 미사일 정보 실시간 공유
* 청년 교류 프로그램 확대

그러나 역사 문제에 대해서는 "각자의 입장을 존중한다"는 원론적 합의에 그쳤다.
    `
    },
    {
        id: '12',
        slug: 'chatgpt-5-release-rumors',
        title: "ChatGPT-5 출시 임박? OpenAI, '획기적 성능 향상' 예고",
        summary: "샘 알트만 CEO가 트위터에서 '곧 놀라운 발표가 있을 것'이라고 암시했다. 업계에서는 GPT-5 출시로 해석하고 있다.",
        category: ArticleCategory.TECH,
        source: "AI Weekly",
        bias: 52,
        timestamp: "2024-03-12T14:00:00Z",
        readingTime: 4,
        relatedCountries: ['US'],
        entities: ['OpenAI', 'Sam Altman', 'Microsoft'],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        tags: ['ChatGPT', 'OpenAI', 'AI', '기술'],
        priority: 85,
        contentMarkdown: `
### GPT-5, 인간 수준의 추론 능력 갖출까
OpenAI 내부 소식통에 따르면, GPT-5는 현재 베타 테스트 단계에 있으며, 수학적 추론과 장기 기억 능력이 대폭 향상되었다고 한다.

예상되는 개선점:
* 멀티모달 통합 (텍스트, 이미지, 음성, 비디오)
* 128K 토큰 컨텍스트 윈도우
* 환각(Hallucination) 현상 90% 감소

전문가들은 "AGI(인공일반지능)에 한 걸음 더 다가선 모델"이라고 평가한다.
    `
    },
    {
        id: '13',
        slug: 'apple-vision-pro-korea-launch',
        title: "애플 비전 프로, 한국 출시 확정... 가격은 500만원대",
        summary: "애플이 공간 컴퓨팅 디바이스 '비전 프로'를 5월 한국에 출시한다. 미국보다 20% 비싼 가격에 논란이 예상된다.",
        category: ArticleCategory.TECH,
        source: "Tech Korea",
        bias: 58,
        timestamp: "2024-03-11T16:00:00Z",
        readingTime: 5,
        relatedCountries: ['KR', 'US'],
        entities: ['Apple', 'Tim Cook'],
        imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1000&auto=format&fit=crop",
        tags: ['애플', '비전프로', 'VR', '기술'],
        priority: 70,
        contentMarkdown: `
### 공간 컴퓨팅 시대의 서막
애플은 비전 프로의 한국 출시 가격을 512GB 모델 기준 549만원으로 책정했다. 미국 가격(3,499달러)보다 환율을 고려해도 높은 수준이다.

주요 특징:
* M2 + R1 듀얼 칩
* 4K 마이크로 OLED 디스플레이
* 아이 트래킹 및 핸드 제스처
* 공간 비디오 촬영 및 재생

업계에서는 "초기 얼리어답터 시장을 겨냥한 가격"이라고 분석한다.
    `
    },
    {
        id: '14',
        slug: 'korea-birth-rate-crisis-2024',
        title: "출산율 0.65 충격... '인구 소멸' 경고등",
        summary: "2023년 합계출산율이 0.65명으로 집계되며 역대 최저치를 경신했다. OECD 국가 중 유일하게 1명 미만이다.",
        category: ArticleCategory.POLITICS,
        source: "Social Policy",
        bias: 35,
        timestamp: "2024-03-11T13:00:00Z",
        readingTime: 8,
        relatedCountries: ['KR'],
        entities: ['Statistics Korea', 'Ministry of Health'],
        imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop",
        tags: ['출산율', '인구', '사회', '정책'],
        priority: 95,
        contentMarkdown: `
### 대한민국의 미래, 위기의 갈림길
통계청이 발표한 '2023년 인구동향'에 따르면, 합계출산율이 0.65명으로 전년(0.78명) 대비 16.7% 급감했다.

지역별 출산율:
* 서울: 0.52명
* 세종: 0.91명
* 전국 평균: 0.65명

전문가들은 "현재 추세라면 2100년 인구가 2400만 명으로 감소할 것"이라고 경고한다. 정부는 출산 장려금 확대와 육아휴직 제도 개선을 추진 중이다.
    `
    },
    {
        id: '15',
        slug: 'spacex-starship-mars-mission',
        title: "스페이스X, 2026년 화성 유인 탐사 계획 발표",
        summary: "일론 머스크가 스타십을 이용한 화성 유인 탐사 일정을 공개했다. NASA와 공동으로 진행하며, 총 비용은 100억 달러로 추산된다.",
        category: ArticleCategory.SCIENCE,
        source: "Space News",
        bias: 62,
        timestamp: "2024-03-11T10:00:00Z",
        readingTime: 7,
        relatedCountries: ['US'],
        entities: ['SpaceX', 'Elon Musk', 'NASA'],
        imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1000&auto=format&fit=crop",
        tags: ['스페이스X', '화성', '우주', '과학'],
        priority: 75,
        contentMarkdown: `
### 인류의 다행성 종족 꿈, 현실로
스페이스X는 2026년 10월 화성 접근 시기에 맞춰 스타십 유인 탐사선을 발사할 계획이다.

미션 개요:
* 승무원: 6명
* 비행 기간: 왕복 약 3년
* 주요 목표: 화성 거주지 건설 및 자원 탐사

일론 머스크는 "2050년까지 화성에 100만 명의 도시를 건설하는 것이 목표"라고 밝혔다. 전문가들은 기술적 가능성에는 동의하지만, 비용과 안전성 문제를 지적한다.
    `
    },
    {
        id: '16',
        slug: 'korea-minimum-wage-2025',
        title: "2025년 최저임금 1만2000원 확정... 12.3% 인상",
        summary: "최저임금위원회가 내년 최저임금을 시간당 1만2000원으로 의결했다. 월급으로 환산하면 250만원 수준이다.",
        category: ArticleCategory.ECONOMY,
        source: "Labor News",
        bias: 38,
        timestamp: "2024-03-10T18:00:00Z",
        readingTime: 5,
        relatedCountries: ['KR'],
        entities: ['Minimum Wage Commission', 'Labor Union'],
        imageUrl: "https://images.unsplash.com/photo-1554224311-beee2f770c4f?q=80&w=1000&auto=format&fit=crop",
        tags: ['최저임금', '경제', '노동', '정책'],
        priority: 80,
        contentMarkdown: `
### 노동계 "여전히 부족", 경영계 "부담 가중"
최저임금위원회는 2025년 최저임금을 시간당 1만2000원(월 환산 약 250만원)으로 결정했다. 이는 올해(1만680원) 대비 12.3% 인상된 금액이다.

주요 쟁점:
* 노동계: "생활임금 수준에 미달"
* 경영계: "영세 자영업자 폐업 우려"
* 정부: "물가 상승률 고려한 적정 수준"

전문가들은 "최저임금 인상이 고용에 미치는 영향에 대한 면밀한 모니터링이 필요하다"고 조언한다.
    `
    },
    {
        id: '17',
        slug: 'netflix-password-sharing-crackdown',
        title: "넷플릭스, 한국서도 계정 공유 단속 본격화",
        summary: "4월부터 가구 외 계정 공유 시 월 5000원 추가 요금을 부과한다. 구독자 이탈 우려에도 수익성 개선에 집중한다.",
        category: ArticleCategory.TECH,
        source: "Media Watch",
        bias: 55,
        timestamp: "2024-03-10T15:00:00Z",
        readingTime: 4,
        relatedCountries: ['KR', 'US'],
        entities: ['Netflix', 'Reed Hastings'],
        imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop",
        tags: ['넷플릭스', 'OTT', '스트리밍', '미디어'],
        priority: 65,
        contentMarkdown: `
### 무임승차 종말, 구독자 반발 예상
넷플릭스는 한국에서도 계정 공유 단속을 시작한다고 공식 발표했다. 동일 가구가 아닌 사용자가 계정을 공유할 경우 월 5000원의 추가 요금을 내야 한다.

정책 세부사항:
* 동일 Wi-Fi 네트워크 기준으로 가구 판별
* 여행 시 임시 코드 발급 가능
* 추가 멤버는 최대 2명까지

넷플릭스는 "미국과 유럽에서 이미 성공적으로 시행 중"이라며 한국에서도 장기적으로 구독자 증가를 기대한다고 밝혔다.
    `
    },
    {
        id: '18',
        slug: 'korea-pension-reform-2024',
        title: "국민연금 개혁안 발표... 보험료율 13%로 인상",
        summary: "정부가 국민연금 재정 안정화를 위해 보험료율을 현행 9%에서 13%로 올리는 방안을 제시했다. 수급 개시 연령은 65세로 유지한다.",
        category: ArticleCategory.POLITICS,
        source: "Pension Policy",
        bias: 42,
        timestamp: "2024-03-10T12:00:00Z",
        readingTime: 6,
        relatedCountries: ['KR'],
        entities: ['National Pension Service', 'Ministry of Health'],
        imageUrl: "https://images.unsplash.com/photo-1554224311-beee2f770c4f?q=80&w=1000&auto=format&fit=crop",
        tags: ['국민연금', '개혁', '정책', '경제'],
        priority: 90,
        contentMarkdown: `
### 세대 간 형평성 vs 현세대 부담
정부는 국민연금 고갈 시점을 2055년에서 2070년으로 늦추기 위해 보험료율 인상을 추진한다.

개혁안 주요 내용:
* 보험료율: 9% → 13% (단계적 인상)
* 소득대체율: 40% 유지
* 수급 개시 연령: 65세 유지

청년층은 "미래 세대에 부담 전가"라며 반발하고, 장년층은 "보험료 인상 부담"을 호소하고 있다. 전문가들은 "정치권의 초당적 합의가 필수적"이라고 강조한다.
    `
    },
    {
        id: '19',
        slug: 'samsung-galaxy-s25-leak',
        title: "삼성 갤럭시 S25, AI 기능 대폭 강화... 2월 공개 예정",
        summary: "차세대 플래그십 스마트폰에 온디바이스 AI가 탑재된다. 스냅드래곤 8 Gen 4와 엑시노스 2500 듀얼 전략을 유지한다.",
        category: ArticleCategory.TECH,
        source: "Mobile Insider",
        bias: 68,
        timestamp: "2024-03-09T19:00:00Z",
        readingTime: 5,
        perspectives: [
            {
                source: '조선일보',
                sourceId: 'chosun',
                opinion: '보수적 실용주의',
                summary: '정부의 정책 실패와 예산 낭비를 지적하며, 보다 근본적인 규제 완화와 경제적 유인책의 필요성을 강조함.',
                link: 'https://www.chosun.com/national/2026/02/02/example1',
                bias: 85
            },
            {
                source: '중앙일보',
                sourceId: 'joongang',
                opinion: '중도 보수',
                summary: '현상 유지의 위험성을 경고하며 사회 구조적 개편과 교육 시스템의 혁신적인 변화가 병행되어야 함을 역설.',
                link: 'https://www.joongang.co.kr/article/2026/02/02/example2',
                bias: 65
            },
            {
                source: '한겨레',
                sourceId: 'hankyoreh',
                opinion: '진보적 평등주의',
                summary: '불평등 해소와 주거권 보장이 핵심임을 주장하며, 보편적 복지 확대와 근로 환경의 발본적 개선을 촉구.',
                link: 'https://www.hani.co.kr/arti/society/example3',
                bias: 15
            },
            {
                source: '경향신문',
                sourceId: 'kyunghyang',
                opinion: '비판적 진보',
                summary: '자본 중심의 논리를 비판하며 여성의 독자적인 삶의 질 향상과 성평등한 가사 분담 문화 정착이 우선순위임을 강조.',
                link: 'https://www.khan.co.kr/national/example4',
                bias: 20
            }
        ],
        relatedCountries: ['KR', 'US'],
        entities: ['Samsung', 'Qualcomm'],
        imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
        tags: ['삼성', '갤럭시', '스마트폰', 'AI'],
        priority: 70,
        contentMarkdown: `
### AI 스마트폰 경쟁 본격화
삼성전자는 2025년 2월 언팩 이벤트에서 갤럭시 S25 시리즈를 공개할 예정이다. 이번 모델의 핵심은 '온디바이스 AI'다.

예상 사양:
* AP: 스냅드래곤 8 Gen 4 / 엑시노스 2500
* RAM: 12GB / 16GB
* AI 기능: 실시간 통역, 사진 편집, 문서 요약

업계에서는 "애플 인텔리전스에 대응하기 위한 전략"이라고 분석한다. 가격은 S24 대비 10만원 인상될 전망이다.
    `
    },
    {
        id: '20',
        slug: 'korea-carbon-tax-2025',
        title: "탄소세 도입 확정... 톤당 3만원부터 시작",
        summary: "2025년부터 탄소 배출에 세금을 부과하는 '탄소세법'이 시행된다. 철강, 시멘트 등 고탄소 산업의 부담이 커질 전망이다.",
        category: ArticleCategory.ENVIRONMENT,
        source: "Environment Today",
        bias: 32,
        timestamp: "2024-03-09T16:00:00Z",
        readingTime: 7,
        relatedCountries: ['KR'],
        entities: ['Ministry of Environment', 'POSCO'],
        imageUrl: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1000&auto=format&fit=crop",
        tags: ['탄소세', '환경', '정책', '경제'],
        priority: 75,
        contentMarkdown: `
### 탄소중립 vs 산업 경쟁력
정부는 2050 탄소중립 목표 달성을 위해 탄소세를 도입한다. 초기 세율은 톤당 3만원이며, 2030년까지 10만원으로 인상될 예정이다.

영향받는 산업:
* 철강: 연간 2조원 추가 부담
* 시멘트: 연간 5000억원
* 석유화학: 연간 1조원

환경단체는 환영하지만, 산업계는 "글로벌 경쟁력 약화"를 우려한다. 정부는 친환경 전환 기업에 세액 공제 혜택을 제공할 계획이다.
    `
    },
];

export const TREND_KEYWORDS: TrendKeyword[] = [
    { rank: 1, text: "AI 법안 통과", change: "up", changeAmount: 3, count: 15234 },
    { rank: 2, text: "엔비디아 실적", change: "same", changeAmount: 0, count: 12890 },
    { rank: 3, text: "총선 여론조사", change: "up", changeAmount: 2, count: 11456 },
    { rank: 4, text: "비트코인 반감기", change: "down", changeAmount: -1, count: 9823 },
    { rank: 5, text: "의대 증원", change: "up", changeAmount: 4, count: 8765 },
    { rank: 6, text: "테슬라 리콜", change: "down", changeAmount: -2, count: 7654 },
    { rank: 7, text: "출산율 위기", change: "up", changeAmount: 1, count: 6543 },
    { rank: 8, text: "최저임금 인상", change: "same", changeAmount: 0, count: 5432 },
];

// Category metadata for UI
export const CATEGORY_META = {
    [ArticleCategory.POLITICS]: {
        label: { ko: '정치', en: 'Politics' },
        color: '#3b82f6',
        icon: 'vote',
    },
    [ArticleCategory.ECONOMY]: {
        label: { ko: '경제', en: 'Economy' },
        color: '#10b981',
        icon: 'trending-up',
    },
    [ArticleCategory.TECH]: {
        label: { ko: '기술', en: 'Tech' },
        color: '#8b5cf6',
        icon: 'cpu',
    },
    [ArticleCategory.WORLD]: {
        label: { ko: '세계', en: 'World' },
        color: '#f59e0b',
        icon: 'globe',
    },
    [ArticleCategory.OPINION]: {
        label: { ko: '오피니언', en: 'Opinion' },
        color: '#ef4444',
        icon: 'message-circle',
    },
    [ArticleCategory.SCIENCE]: {
        label: { ko: '과학', en: 'Science' },
        color: '#06b6d4',
        icon: 'flask',
    },
    [ArticleCategory.CULTURE]: {
        label: { ko: '문화', en: 'Culture' },
        color: '#ec4899',
        icon: 'palette',
    },
    [ArticleCategory.ENVIRONMENT]: {
        label: { ko: '환경', en: 'Environment' },
        color: '#22c55e',
        icon: 'leaf',
    },
};
