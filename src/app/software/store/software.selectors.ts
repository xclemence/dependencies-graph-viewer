import { createFeatureSelector, createSelector } from '@ngrx/store';
import {SoftwareState, softwareFeatureKey } from './software.reducer';

export const softwareStateSelector = createFeatureSelector<SoftwareState>(softwareFeatureKey);
