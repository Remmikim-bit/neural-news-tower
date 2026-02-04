export interface Entity {
    id: string;
    name: string;
    type: EntityType;
    description?: string;
    imageUrl?: string;
    frequency: number;
    sentiment?: number;
    recentArticleIds: string[];
}

export const EntityType = {
    PERSON: 'PERSON',
    ORGANIZATION: 'ORGANIZATION',
    LOCATION: 'LOCATION',
    EVENT: 'EVENT',
    PRODUCT: 'PRODUCT',
    CONCEPT: 'CONCEPT',
} as const;
export type EntityType = (typeof EntityType)[keyof typeof EntityType];

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

export interface GraphNode {
    id: string;
    name: string;
    val: number;
    type: EntityType;
    color?: string;
}

export interface GraphLink {
    source: string;
    target: string;
    width: number;
}
