import { AssemblyStat, Assembly } from '@app/core/models/assembly';

export interface AssemblyState {
  assemblies: AssemblyStat[];
  assemblyDepth: Assembly;
}
