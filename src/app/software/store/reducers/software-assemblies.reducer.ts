import { createReducer, on } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareAssembliesState } from '../models';
import { clearSoftwareAssemblies } from './../actions/software-assemblies.actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(loadSoftwareAssemblies, state => state),
  on(loadSoftwareAssembliesSuccess, (state, action) => ({...state, software: action.data})),

  on(clearSoftwareAssemblies, (state, action) => ({ ...state, software: undefined }))
);
