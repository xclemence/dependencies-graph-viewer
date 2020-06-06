import { SoftwareAssembliesState } from './software-assemblies.state';
import { SoftwareNameState } from './software-name.state';

export interface SoftwareState {
  assemblies: SoftwareAssembliesState;
  name: SoftwareNameState;
}
