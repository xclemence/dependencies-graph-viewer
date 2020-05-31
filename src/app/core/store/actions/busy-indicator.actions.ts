import { TypedAction } from '@ngrx/store/src/models';
import { createAction, props, Action } from '@ngrx/store';

export const addBusyIndicatorAction = createAction(
  '[Shared - Busy] Add Busy',
    props<{ key: String }>()
);

export const removeBusyIndicatorAction = createAction(
  '[Shared - Busy] Remove Busy',
    props<{ key: String }>()
);
