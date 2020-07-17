import { createReducer, on } from '@ngrx/store';

import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../actions/busy-indicator.actions';
import { BusyState } from '../models';

const initialState: BusyState = {
  actionsInProgress: []
};

export const busyIndicatorReducer = createReducer(
  initialState,

  on(addBusyIndicatorAction, (state, action) => {
    if (state.actionsInProgress.includes(action.key)) {
      return state;
    }
    return {
      ...state,
      actionsInProgress: [
        ...state.actionsInProgress,
        action.key
      ]
    };
  }),

  on(removeBusyIndicatorAction, (state, action) => {
    const index = state.actionsInProgress.indexOf(action.key);
    if (index === -1) {
      return state;
    }

    return {
      ...state,
      actionsInProgress: [
        ...state.actionsInProgress.slice(0, index),
        ...state.actionsInProgress.slice(index + 1)
      ]
    };
  })
);
