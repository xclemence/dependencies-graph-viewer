import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { createAction, props } from '@ngrx/store';

export const loadSoftwareAssemblies = createAction(
  '[Software Assemblies] Load Software Assemblies',
  props<{ assemblyName: AssemblyBase }>()
);

export const loadSoftwareAssembliesSuccess = createAction(
  '[Software Assemblies] Load Software Assemblies Success',
  props<{ data: Assembly }>()
);

export const loadSoftwareAssembliesFailure = createAction(
  '[Software Assemblies] Load Software Assemblies Failure',
  props<{ error: any }>()
);
