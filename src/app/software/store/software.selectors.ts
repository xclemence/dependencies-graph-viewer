import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SoftwareState } from './models/software.state';

export const softwareFeatureKey = 'software';

export const softwareStateSelector = createFeatureSelector<SoftwareState>(softwareFeatureKey);

export const softwareNameStateSelector = createSelector(softwareStateSelector, (state: SoftwareState) => state.name);
export const softwareAssembliesStateSelector = createSelector(softwareStateSelector, (state: SoftwareState) => state.assemblies);
