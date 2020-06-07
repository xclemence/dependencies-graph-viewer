import { Assembly } from '@app/core/models/assembly';
import { Action, createAction, props } from '@ngrx/store';

export const loadAssemblyDepth = createAction(
  '[Assembly Depth] Load Assembly Depth',
  props<{ assemblyId: string, depth: number }>()
);

export const loadAssemblyDepthSuccess = createAction(
  '[Assembly Depth] Load Assembly Depth Success',
  props<{ data: Assembly, origin: Action }>()
);
