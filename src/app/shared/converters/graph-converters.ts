import { Assembly, AssemblyBase, AssemblyColors, AssemblyLink } from '@app/core/models';
import { GraphLink } from '@app/shared/models';

import { Graph, GraphNode } from '../models/force-graph';

export function toGraphNode(assembly: AssemblyBase, forceColor?: string): GraphNode {
  let color = forceColor;
  if (!color) {
    color = assembly.isNative ? AssemblyColors.native : AssemblyColors.managed;
  }

  return { id: assembly.id, label: `${assembly.name} (${assembly.version})`, color };
}

export function toGraphLink(link: AssemblyLink, nodes: GraphNode[]): {source?: GraphNode, target?: GraphNode} {

  const source = nodes.find(x => x.id === link.sourceId);
  const target = nodes.find(x => x.id === link.targetId);

  return { source, target };
}

export function toGraph(assembly: Assembly): Graph {

  const nodes = assembly.referencedAssemblies.map(x => toGraphNode(x));

  nodes.push(toGraphNode(assembly, AssemblyColors.main));

  const links = assembly.links.map(x => toGraphLink(x, nodes));
  const filteredLinks = links.filter((x): x is {source: GraphNode, target: GraphNode } => !!x.source && !!x.target)
                             .map(({source, target })  => ({ source, target, value: 10}));

  return { nodes, links: filteredLinks };
}

export function consolidateGraphPosition(newGraph: Graph, oldGraph: Graph | undefined): Graph {

  if (oldGraph) {
    for (const node of newGraph.nodes) {
      const oldNode = oldGraph.nodes.find(x => x.id === node.id);

      node.x = oldNode?.x;
      node.y = oldNode?.y;
    }
  }

  return newGraph;
}
