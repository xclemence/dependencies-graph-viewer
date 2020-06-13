import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SoftwareState } from './models/software.state';

export const softwareFeatureKey = 'software';

export const softwareStateSelector = createFeatureSelector<SoftwareState>(softwareFeatureKey);

export const softwareNameStateSelector = createSelector(softwareStateSelector, (state: SoftwareState) => state.name);
export const softwareAssembliesStateSelector = createSelector(softwareStateSelector, (state: SoftwareState) => state.assemblies);

export const filteredAssembliesStateSelector = createSelector(softwareAssembliesStateSelector, (state) => state.filteredAssemblies);
export const softwareSelector = createSelector(softwareAssembliesStateSelector, (state) => state.software);
