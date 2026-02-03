import { EntityType } from '../types';
import type { Entity } from '../types';

export const mockEntities: Entity[] = [
    {
        id: 'ent-gov',
        name: '대한민국 정부',
        type: EntityType.ORGANIZATION,
        description: '대한민국 중앙 행정 기관',
        frequency: 100,
        sentiment: -0.2,
        recentArticleIds: ['art-001', 'art-003']
    },
    {
        id: 'ent-cg',
        name: '해양경찰청',
        type: EntityType.ORGANIZATION,
        description: '해상 치안 및 구조 담당 기관',
        frequency: 85,
        sentiment: -0.5,
        recentArticleIds: ['art-001', 'art-002']
    },
    {
        id: 'ent-family',
        name: '세월호 유가족',
        type: EntityType.ORGANIZATION,
        description: '희생자 가족 협의체',
        frequency: 70,
        sentiment: 0.1,
        recentArticleIds: ['art-004', 'art-005']
    },
    {
        id: 'ent-dw',
        name: '단원고등학교',
        type: EntityType.ORGANIZATION,
        description: '참사 당시 학생들의 소속 학교',
        frequency: 60,
        sentiment: -0.1,
        recentArticleIds: ['art-001']
    },
    {
        id: 'ent-pres',
        name: '대통령',
        type: EntityType.PERSON,
        description: '당시 최고 통수권자',
        frequency: 95,
        sentiment: -0.3,
        recentArticleIds: ['art-005']
    },
    {
        id: 'ent-invest',
        name: '특조위',
        type: EntityType.ORGANIZATION,
        description: '세월호 참사 특별조사위원회',
        frequency: 50,
        sentiment: 0.0,
        recentArticleIds: ['art-005']
    }
];

// Relationship data (inferred or manual)
export const mockRelationships = [
    { source: 'ent-gov', target: 'ent-cg', weight: 5 },
    { source: 'ent-gov', target: 'ent-pres', weight: 8 },
    { source: 'ent-cg', target: 'ent-family', weight: 3 },
    { source: 'ent-family', target: 'ent-invest', weight: 6 },
    { source: 'ent-gov', target: 'ent-invest', weight: 4 },
    { source: 'ent-dw', target: 'ent-family', weight: 5 }
];
