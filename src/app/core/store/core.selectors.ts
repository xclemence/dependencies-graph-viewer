import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from './models';

export const coreFeatureKey = 'core';

export const coreStateSelector = createFeatureSelector<CoreState>(coreFeatureKey);

export const busyStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.busy);
export const errorStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.error);
export const snowStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.snow);
export const securityStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.security);

export const currentUserSelector = createSelector(securityStateSelector, (state) => state.currentUser);
export const featuresRightsSelector = createSelector(securityStateSelector, (state) => state.featuresConfiguration);
