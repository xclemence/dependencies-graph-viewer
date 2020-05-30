import { CoreState, BusyState } from './models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const coreFeatureKey = 'core';

export const coreStateSelector = createFeatureSelector<CoreState>(coreFeatureKey);

export const busyStateSelector = createSelector(coreStateSelector, (state: CoreState) => state.busy);
