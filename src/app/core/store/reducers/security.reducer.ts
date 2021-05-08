import { createReducer, on } from '@ngrx/store';
import { setCurrentUserAction, addFeatureConfigurationAction, setNoRightPathAction } from '../actions';

import { SecurityState } from '../models';

const initialState: SecurityState = {
  currentUser: undefined,
  featuresConfiguration: [],
  noRightPath: undefined
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

  on(setNoRightPathAction, (state, action) => {
    return {
      ...state,
      noRightPath: action.path
    };
  }),
);
