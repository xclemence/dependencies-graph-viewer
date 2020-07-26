export class GraphNode {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;

  public constructor(init?: Partial<GraphNode>) {
    Object.assign(this, init);
  }
}

export class GraphLink {
  source: string;
  target: string;
  value = 10;

  public constructor(init?: Partial<GraphLink>) {
    Object.assign(this, init);
  }
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}
