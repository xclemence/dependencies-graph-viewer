import { softwareNameReducer } from './software-name.reducer';
import { softwareAssembliesReducer } from './software-assemblies.reducer';

export const reducers = {
  name: softwareNameReducer,
  assemblies: softwareAssembliesReducer,
};
