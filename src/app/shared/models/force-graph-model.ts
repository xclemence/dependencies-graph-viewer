export class Node {
  id: string;
  label: string;
  color: string;

  public constructor(init?: Partial<Node>) {
    Object.assign(this, init);
  }
}

export class Link {
  source: string;
  target: string;
  value = 10;

  public constructor(init?: Partial<Link>) {
    Object.assign(this, init);
  }
}

export class Graph {
  nodes: Node[];
  links: Link[];
}
