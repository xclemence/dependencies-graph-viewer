import { AssemblyBase, AssemblyColors, AssemblyLink } from '@app/core/models';
import { GraphLink } from '@app/shared/models';

import { Graph, GraphNode } from '../models/force-graph-model';

export function toGraphNode(assembly: AssemblyBase, forceColor?: string): GraphNode {
  let color = forceColor;
  if (!color) {
    color = assembly.isNative ? AssemblyColors.native : AssemblyColors.managed;
  }

  return new GraphNode({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color });
}

export function toGraphLink(link: AssemblyLink): GraphLink {
  return new GraphLink({ source: link.sourceId, target: link.targetId });
}

export function consolidateGraphPosition(newGraph: Graph, oldGraph: Graph): Graph {

  if (!oldGraph) {
    return newGraph;
  }

  for (const node of newGraph.nodes) {
    const oldNode = oldGraph.nodes.find(x => x.id === node.id);

    node.x = oldNode?.x;
    node.y = oldNode?.y;
  }

  return newGraph;
}
