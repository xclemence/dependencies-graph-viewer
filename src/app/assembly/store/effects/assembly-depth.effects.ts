import { Injectable } from '@angular/core';
import { AssemblyService } from '@app/core/services/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadAssemblyDepth, loadAssemblyDepthFailure, loadAssemblyDepthSuccess } from '../actions';

@Injectable()
export class AssemblyDepthEffects {

  constructor(private actions: Actions, private assemblyService: AssemblyService) {}

  loadSoftwareNames = createEffect(() => {
    return this.actions.pipe(
      ofType(loadAssemblyDepth),
      switchMap(action => this.assemblyService.references(action.assemblyId, action.depth).pipe(
        map(data => loadAssemblyDepthSuccess( { data: data, origin: action} )),
        catchError(error => of(loadAssemblyDepthFailure( { error: error, origin: action })))
      )),
    );
  });
}
