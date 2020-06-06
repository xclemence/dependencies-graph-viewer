import { createAction, props } from '@ngrx/store';

export const addBusyIndicatorAction = createAction(
  '[Shared - Busy] Add Busy',
    props<{ key: string }>()
);

export const removeBusyIndicatorAction = createAction(
  '[Shared - Busy] Remove Busy',
    props<{ key: string }>()
);
