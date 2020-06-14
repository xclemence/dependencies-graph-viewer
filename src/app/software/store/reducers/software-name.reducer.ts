import { createReducer, on } from '@ngrx/store';

import * as SoftwareNameActions from '../actions/software-name.actions';
import { SoftwareNameState } from '../models/software-name.state';

const initialState: SoftwareNameState = {
  softwareNames: [],
};

export const softwareNameReducer = createReducer(
  initialState,

  on(SoftwareNameActions.loadSoftwareNames, state => state),
  on(SoftwareNameActions.loadSoftwareNamesSuccess, (state, action) => ({...state, softwareNames: action.data })),
);
