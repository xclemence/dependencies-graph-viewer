import { Action, createAction, props } from '@ngrx/store';

export const empty = createAction(
  '[Empty] No action',
  props<{ origin?: Action }>()
);
