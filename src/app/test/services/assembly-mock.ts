import { Assembly, AssemblyBase } from '@app/core/models';

import { assemblyData } from './assembly-data';

export const defaultDelay = 10;

export function appendAssemblyReference(assembly: Assembly, parentId: string, depth: number): void {

  if (depth === 0) {
    return;
  }

  const parentAssembly = assemblyData.find(x => x.id === parentId);

  parentAssembly?.referenceNames.forEach(id => {

    const referencedAssembly = assemblyData.find(x => x.id === id);

    if (!assembly.referencedAssemblies.some(x => x.id === id)) {
      assembly.referencedAssemblies.push(({ ...referencedAssembly }) as AssemblyBase);
    }

    assembly.links.push({ sourceId: parentId, targetId: id });

    appendAssemblyReference(assembly, id, depth - 1);
  });
}
