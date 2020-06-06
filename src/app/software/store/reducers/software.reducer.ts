import { softwareAssembliesReducer } from './software-assemblies.reducer';
import { softwareNameReducer } from './software-name.reducer';

export const reducers = {
  name: softwareNameReducer,
  assemblies: softwareAssembliesReducer,
};
