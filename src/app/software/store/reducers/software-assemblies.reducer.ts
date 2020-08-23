import { createReducer, on } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareAssembliesState } from '../models';
import { clearSoftwareAssemblies, displayLabel, updateFilteredAssemblies } from './../actions/software-assemblies.actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
  filteredAssemblies: [],
  displayLabel: true
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(loadSoftwareAssemblies, state => state),
  on(loadSoftwareAssembliesSuccess, (state, action) => ({...state, software: action.data, filteredAssemblies: []})),

  on(clearSoftwareAssemblies, (state, _) => ({ ...state, software: undefined, filteredAssemblies: [] })),

  on(updateFilteredAssemblies, (state, action) => ({...state, filteredAssemblies: action.assemblyIds})),

  on(displayLabel, (state, action) => ({...state, displayLabel : action.value}))
);
