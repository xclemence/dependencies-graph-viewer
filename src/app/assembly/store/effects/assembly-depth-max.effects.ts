import { Injectable } from '@angular/core';
import { AssemblyService } from '@app/assembly/services/assembly.service';
import { operationFailure as operationFailure } from '@app/core/store/actions/error.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadAssemblyDepthMax, loadAssemblyDepthMaxSuccess } from './../actions/assembly-depth-max.actions';


@Injectable()
export class AssemblyDepthMaxEffects {

  constructor(private actions: Actions, private assemblyService: AssemblyService) {}

  loadAssemblyDepthMax = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblyDepthMax),
      switchMap(action => this.assemblyService.assemblyDepthMax(action.assemblyId).pipe(
        map(data => loadAssemblyDepthMaxSuccess( { assemblyId: data.id, depthMax: data.value,  origin: action} )),
        catchError(error => of(operationFailure({ error: error.message, origin: action })))
      )),
    );
  });
}
