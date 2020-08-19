import { createReducer, on } from '@ngrx/store';

import { SnowState } from '../models';
import { snowActivation } from './../actions/snow.actions';

const initialState: SnowState = {
  activated: true
};

export const snowReducer = createReducer(
  initialState,

  on(snowActivation, (state, _) => {
    return { ...state,  activated: true };
  }),
);
