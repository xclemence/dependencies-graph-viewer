import { SoftwareNameState } from './software-name.state';
import { SoftwareAssembliesState } from './software-assemblies.state';

export interface SoftwareState {
    assemblies: SoftwareAssembliesState;
    name: SoftwareNameState;
  }