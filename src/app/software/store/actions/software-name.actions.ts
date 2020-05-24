import { AssemblyBase } from '@app/core/models/assembly';
import { createAction, props } from '@ngrx/store';

export const loadSoftwareNames = createAction(
  '[Software] Load Softwares'
);

export const loadSoftwareNamesSuccess = createAction(
  '[Software] Load Softwares Success',
  props<{ data: AssemblyBase[] }>()
);

export const loadSoftwareNamesFailure = createAction(
  '[Software] Load Softwares Failure',
  props<{ error: any }>()
);
