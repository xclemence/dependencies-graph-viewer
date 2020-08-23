import { Assembly } from '@app/core/models/assembly';
import { Action, createAction, props } from '@ngrx/store';

export const loadSoftwareAssemblies = createAction(
  '[Software Assemblies] Load Software Assemblies',
  props<{ assemblyId: string }>()
);

export const loadSoftwareAssembliesSuccess = createAction(
  '[Software Assemblies] Load Software Assemblies Success',
  props<{ data: Assembly, origin: Action }>()
);

export const clearSoftwareAssemblies = createAction(
  '[Software Assemblies] CLear Software Assemblies'
);

export const updateFilteredAssemblies = createAction(
  '[Software Assemblies] Update Filtered Assemblies',
  props<{ assemblyIds: string[] }>()
);

export const displayLabel = createAction(
  '[Software Assemblies] Display Label',
  props<{ value: boolean }>()
);

