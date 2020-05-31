import { createReducer, on } from '@ngrx/store';

import { SoftwareAssembliesState } from '../models';
import { loadSoftwareAssemblies, loadSoftwareAssembliesSuccess, loadSoftwareAssembliesFailure } from '../actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(loadSoftwareAssemblies, state => state),
  on(loadSoftwareAssembliesSuccess, (state, action) => {
    return {...state, software: action.data};
  }),
  on(loadSoftwareAssembliesFailure, (state, action) => state)
);

