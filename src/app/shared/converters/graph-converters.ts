import { Assembly, AssemblyBase, AssemblyColors, AssemblyLink } from '@app/core/models';
import { DefaultGraphLink, GraphLink } from '@app/shared/models';

import { Graph, GraphNode } from '../models/force-graph-model';

export function toGraphNode(assembly: AssemblyBase, forceColor?: string): GraphNode {
  let color = forceColor;
  if (!color) {
    color = assembly.isNative ? AssemblyColors.native : AssemblyColors.managed;
  }

  return { id: assembly.id, label: `${assembly.name} (${assembly.version})`, color };
}

export function toGraphLink(link: AssemblyLink): GraphLink {
  return new DefaultGraphLink({ source: link.sourceId, target: link.targetId });
}

export function toGraph(assembly: Assembly): Graph {
  if (!assembly) {
    return null;
  }

  const nodes = assembly.referencedAssemblies.map(x => toGraphNode(x));

  nodes.push(toGraphNode(assembly, AssemblyColors.main));

  const links = assembly.links.map(x => toGraphLink(x));

  return { nodes, links };
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
