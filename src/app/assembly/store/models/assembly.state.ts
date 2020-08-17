import { Assembly, AssemblyStat } from '@app/core/models/assembly';

export interface AssemblyState {
  assemblies: AssemblyFiltered;
  assemblyDepth: Assembly;
  assemblyDepthMax: {
    assemblyId: string,
    value: number
  };
}

export interface AssemblyFiltered {
  filtered: AssemblyStat[];
  count: number;
}
