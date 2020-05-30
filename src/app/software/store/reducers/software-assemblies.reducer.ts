import { createReducer, on } from '@ngrx/store';

import { SoftwareAssembliesState } from '../models';
import { SoftwareAssembliesActions } from '../actions';

const initialState: SoftwareAssembliesState = {
  software: undefined,
};

export const softwareAssembliesReducer = createReducer(
  initialState,

  on(SoftwareAssembliesActions.loadSoftwareAssemblies, state => state),
  on(SoftwareAssembliesActions.loadSoftwareAssembliesSuccess, (state, action) => {
    return {...state, software: action.data};
  }),
  on(SoftwareAssembliesActions.loadSoftwareAssembliesFailure, (state, action) => state)
);

