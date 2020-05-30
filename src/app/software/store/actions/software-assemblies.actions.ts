import { Assembly, AssemblyBase } from '@app/core/models/assembly';
import { createAction, props, Action } from '@ngrx/store';

export class SoftwareAssembliesActions {

  static loadSoftwareAssemblies =  createAction(
    '[Software Assemblies] Load Software Assemblies',
    props<{ assemblyName: AssemblyBase }>()
  );

  static loadSoftwareAssembliesSuccess = createAction(
    '[Software Assemblies] Load Software Assemblies Success',
    props<{ data: Assembly, origin: Action }>()
  );

  static loadSoftwareAssembliesFailure = createAction(
    '[Software Assemblies] Load Software Assemblies Failure',
    props<{ error: any, origin: Action }>()
  );
}
