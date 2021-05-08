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

export class DefaultGraphLink implements GraphLink {
  source: GraphNode;
  target: GraphNode;
  value = 10;

  public constructor(init?: Partial<GraphLink>) {
    Object.assign(this, init);
  }
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}
