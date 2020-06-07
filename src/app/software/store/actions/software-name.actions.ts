import { AssemblyBase } from '@app/core/models/assembly';
import { Action, createAction, props } from '@ngrx/store';

export const loadSoftwareNames = createAction(
  '[Software] Load Softwares'
);

export const loadSoftwareNamesSuccess = createAction(
  '[Software] Load Softwares Success',
  props<{ data: AssemblyBase[], origin: Action }>()
);
