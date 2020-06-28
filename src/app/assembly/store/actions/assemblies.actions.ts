import { AssemblyStat } from '@app/core/models/assembly';
import { Action, createAction, props } from '@ngrx/store';

export const loadAssemblies = createAction(
  '[Assemblies] Load Assemblies',
  props<{
    take: number,
    page: number,
    filter: string,
    order: string
  }>()
);

export const loadAssembliesSuccess = createAction(
  '[Assemblies] Load Assemblies Success',
  props<{ data: AssemblyStat[], assembliesCount: number, origin: Action }>()
);
