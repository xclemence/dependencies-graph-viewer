import { createReducer, on } from '@ngrx/store';

import { SnowState } from '../models';
import { snowActivation } from './../actions/snow.actions';

const initialState: SnowState = {
  activated: false
};

export const snowReducer = createReducer(
  initialState,

  on(snowActivation, (state, _) => {
    return { ...state,  activated: true };
  }),
);
