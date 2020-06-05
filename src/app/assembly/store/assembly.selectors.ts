import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AssemblyState } from './models/assembly.state';

export const assemblyFeatureKey = 'assembly';

export const assemblyStateSelector = createFeatureSelector<AssemblyState>(assemblyFeatureKey);

export const assembliesStateSelector = createSelector(assemblyStateSelector, (state: AssemblyState) => state.assemblies);
export const assemblyDepthStateSelector = createSelector(assemblyStateSelector, (state: AssemblyState) => state.assemblyDepth);
