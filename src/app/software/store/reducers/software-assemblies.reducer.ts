import { createReducer, on } from '@ngrx/store';

import { loadSoftwareAssemblies, loadSoftwareAssembliesFailure, loadSoftwareAssembliesSuccess } from '../actions';
import { SoftwareAssembliesState } from '../models';
import { clearSoftwareAssemblies } from './../actions/software-assemblies.actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(loadSoftwareAssemblies, state => state),
  on(loadSoftwareAssembliesSuccess, (state, action) => {
    return {...state, software: action.data};
  }),
  on(loadSoftwareAssembliesFailure, (state, action) => state),

  on(clearSoftwareAssemblies, (state, action) => {
    return { ...state, software: undefined };
  })
);
