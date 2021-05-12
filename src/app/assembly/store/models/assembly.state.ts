import { Assembly, AssemblyStat } from '@app/core/models/assembly';

export interface AssemblyState {
  assemblies: AssemblyFiltered | undefined;
  assemblyDepth: Assembly | undefined;
  assemblyDepthMax: {
    assemblyId: string,
    value: number
  } | undefined;
}

export interface AssemblyFiltered {
  filtered: AssemblyStat[];
  count: number;
}
