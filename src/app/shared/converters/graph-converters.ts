import { GraphNode, Graph } from '../models/force-graph-model';
import { AssemblyBase, AssemblyColors } from '@app/core/models';

export function toGraphModel(assembly: AssemblyBase, forceColor?: string): GraphNode {
    let color = forceColor;
    if (!color) {
        color = assembly.isNative ? AssemblyColors.native : AssemblyColors.managed;
    }

    return new GraphNode({ id: assembly.id, label: `${assembly.name} (${assembly.version})`, color });
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