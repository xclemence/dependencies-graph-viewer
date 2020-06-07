import { Action, createAction, props } from '@ngrx/store';

export const operationFailure = createAction(
  '[Error] An Error Occured',
  props<{ error: any, origin: Action }>()
);
