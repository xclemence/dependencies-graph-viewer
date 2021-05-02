import { Assembly, AssemblyBase, AssemblyColors, AssemblyLink } from '@app/core/models';
import { DefaultGraphLink, GraphLink } from '@app/shared/models';

import { Graph, GraphNode } from '../models/force-graph';

export function toGraphNode(assembly: AssemblyBase, forceColor?: string): GraphNode {
  let color = forceColor;
  if (!color) {
    color = assembly.isNative ? AssemblyColors.native : AssemblyColors.managed;
  }

  return { id: assembly.id, label: `${assembly.name} (${assembly.version})`, color };
}

export function toGraphLink(link: AssemblyLink, nodes: GraphNode[]): GraphLink {

  const source = nodes.find(x => x.id === link.sourceId);
  const target = nodes.find(x => x.id === link.targetId);

  return new DefaultGraphLink({ source, target });
}

export function toGraph(assembly: Assembly): Graph {
  if (!assembly) {
    return undefined;
  }

  const nodes = assembly.referencedAssemblies.map(x => toGraphNode(x));

  nodes.push(toGraphNode(assembly, AssemblyColors.main));

  const links = assembly.links.map(x => toGraphLink(x, nodes));
  const filteredLinks = links.filter(l => nodes.some(n => l.source && l.target));

  return { nodes, links: filteredLinks };
}

export function consolidateGraphPosition(newGraph: Graph, oldGraph: Graph): Graph {

  console.log(newGraph);

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
