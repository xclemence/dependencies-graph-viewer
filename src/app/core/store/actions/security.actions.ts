import { createAction, props } from '@ngrx/store';

export const addFeatureConfigurationAction = createAction(
  '[Core - Security] Add feature configuration',
    props<{ feature: string, rights: string[] }>()
);

export const setCurrentUserAction = createAction(
  '[Core - Security] Set current user',
  props<{ name: string, rights: string[] }>()
);


export const setNoRightPathAction = createAction(
  '[Core - Security] Set no right path',
  props<{ path: string }>()
);
