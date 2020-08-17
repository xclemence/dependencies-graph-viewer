import { Action, createAction, props } from '@ngrx/store';

export const loadAssemblyDepthMax = createAction(
  '[Assembly Depth Max] Load Assembly Depth Max',
  props<{ assemblyId: string }>()
);

export const loadAssemblyDepthMaxSuccess = createAction(
  '[Assembly Depth Max] Load Assembly Depth Max Success',
  props<{ assemblyId: string, depthMax: number, origin: Action }>()
);
