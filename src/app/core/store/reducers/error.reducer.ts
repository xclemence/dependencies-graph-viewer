import { createReducer, on } from '@ngrx/store';

import { operationFailure } from '../actions';
import { ErrorState } from '../models';

const initialState: ErrorState = {
  lastError: undefined
};

export const errorReducer = createReducer(
  initialState,

  on(operationFailure, (state, action) => {
    return { ...state, lastError: action.error };
  }),
);
