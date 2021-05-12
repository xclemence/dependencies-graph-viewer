export interface GraphNode {
  id: string;
  label: string;
  color: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: GraphNode;
  target: GraphNode;
  value: number;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}
