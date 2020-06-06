import { AssemblyStat } from '@app/core/models/assembly';
import { Action, createAction, props } from '@ngrx/store';

export const loadAssemblies = createAction(
  '[Assemblies] Load Assemblies'
);

export const loadAssembliesSuccess = createAction(
  '[Assemblies] Load Assemblies Success',
  props<{ data: AssemblyStat[], origin: Action }>()
);

export const loadAssembliesFailure = createAction(
  '[Assemblies] Load Assemblies Failure',
  props<{ error: any, origin: Action }>()
);
