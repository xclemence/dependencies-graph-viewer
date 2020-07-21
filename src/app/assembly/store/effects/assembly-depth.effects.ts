import { Injectable } from '@angular/core';
import { AssemblyService } from '@app/assembly/services/assembly.service';
import { operationFailure as operationFailure } from '@app/core/store/actions/error.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadAssemblyDepth, loadAssemblyDepthSuccess } from '../actions';

@Injectable()
export class AssemblyDepthEffects {

  constructor(private actions: Actions, private assemblyService: AssemblyService) {}

  loadAssemblyDepth = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblyDepth),
      switchMap(action => this.assemblyService.references(action.assemblyId, action.depth).pipe(
        map(data => loadAssemblyDepthSuccess( { data, origin: action} )),
        catchError(error => of(operationFailure({ error: error.message, origin: action })))
      )),
    );
  });
}
