import { Action, createAction, props } from '@ngrx/store';

export const operationFailure = createAction(
  '[Error] An Error Occurred',
  props<{ error: any, origin: Action }>()
);
