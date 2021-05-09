import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SecurityState } from './models';

export const securityFeatureKey = 'security';

export const securityStateSelector = createFeatureSelector<SecurityState>(securityFeatureKey);

export const currentUserSelector = createSelector(securityStateSelector, (state: SecurityState) => state.currentUser);
export const featuresRightsSelector = createSelector(securityStateSelector, (state: SecurityState) => state.featuresConfiguration);
