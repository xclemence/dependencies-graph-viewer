import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from './models';

export const coreFeatureKey = 'core';

export const coreStateSelector = createFeatureSelector<CoreState>(coreFeatureKey);

export const busyStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.busy);
