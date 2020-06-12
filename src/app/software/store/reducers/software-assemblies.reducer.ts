import { createReducer, on } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareAssembliesState } from '../models';
import { clearSoftwareAssemblies, updateFilteredAssemblies } from './../actions/software-assemblies.actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
  filteredAssemblies: []
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(loadSoftwareAssemblies, state => state),
  on(loadSoftwareAssembliesSuccess, (state, action) => ({...state, software: action.data})),

  on(clearSoftwareAssemblies, (state, _) => ({ ...state, software: undefined })),

  on(updateFilteredAssemblies, (state, action) => ({...state, filteredAssemblies: action.assemblyIds}))
);
