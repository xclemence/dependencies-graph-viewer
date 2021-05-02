import { createReducer, on } from '@ngrx/store';
import { setCurrentUserAction, addFeatureConfigurationAction } from '../actions';

import { SecurityState } from '../models';

const initialState: SecurityState = {
  currentUser: undefined,
  featuresConfiguration: []
};

export const securityReducer = createReducer(
  initialState,

  on(addFeatureConfigurationAction, (state, action) => {
    return {
      ...state,
      featuresConfiguration: [
        ...state.featuresConfiguration,
        {
          name : action.feature,
          rights: [...action.rights]
        }
      ]
    };
  }),

  on(setCurrentUserAction, (state, action) => {
    return {
      ...state,
      currentUser: {
        name: action.name,
        rights: [...action.rights]
      }
    };
  }),
);
