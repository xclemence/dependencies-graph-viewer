import { AssemblyBase } from '@app/core/models/assembly';
import { createAction, props, Action } from '@ngrx/store';

export const loadSoftwareNames = createAction(
  '[Software] Load Softwares'
);

export const loadSoftwareNamesSuccess = createAction(
  '[Software] Load Softwares Success',
  props<{ data: AssemblyBase[], origin: Action }>()
);

export const loadSoftwareNamesFailure = createAction(
  '[Software] Load Softwares Failure',
  props<{ error: any, origin: Action }>()
);
