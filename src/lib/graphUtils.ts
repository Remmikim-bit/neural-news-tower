import type { Entity, GraphData, GraphNode, GraphLink } from '../types';

/**
 * Transforms a list of entities and their relationships into GraphData format
 * suitable for react-force-graph.
 */
export const transformToGraphData = (
    entities: Entity[],
    relationships: { source: string; target: string; weight: number }[]
): GraphData => {
    const nodes: GraphNode[] = entities.map((ent) => ({
        id: ent.id,
        name: ent.name,
        val: Math.sqrt(ent.frequency) * 2, // Node size mapping
        type: ent.type,
        color: getNodeColor(ent.type)
    }));

    const links: GraphLink[] = relationships.map((rel) => ({
        source: rel.source,
        target: rel.target,
        width: rel.weight // Line thickness mapping
    }));

    return { nodes, links };
};

/**
 * Returns a color based on the entity type for visualization.
 */
const getNodeColor = (type: string): string => {
    switch (type) {
        case 'PERSON':
            return '#3B82F6'; // Blue
        case 'ORGANIZATION':
            return '#EF4444'; // Red
        case 'LOCATION':
            return '#10B981'; // Green
        case 'EVENT':
            return '#F59E0B'; // Amber
        default:
            return '#9CA3AF'; // Gray
    }
};
