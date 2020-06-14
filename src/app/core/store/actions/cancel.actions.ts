import { Action, createAction, props } from '@ngrx/store';

export const operationCanceled = createAction(
  '[Cancel] Operation Canceled',
  props<{ origin: Action }>()
);
